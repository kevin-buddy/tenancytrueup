export type RuleType = 'Cap' | 'Exclude';

export interface Rule {
	category: string;
	type: RuleType;
	value: number | null;
}

export interface Tenant {
	id: number;
	name: string;
	area: number;
	rules: Rule[];
}

export interface Expense {
	id: number;
	category: string;
	amount: number;
	type: 'Fixed' | 'Variable';
}

export class CamEngine {
	// --- STATE ---
	buildingGLA = $state(100000);
	targetOccupancy = $state(95);
	currentOccupancy = $state(80);

	tenants = $state<Tenant[]>([
		{ id: 1, name: 'Acme Corp', area: 15000, rules: [] },
		{ id: 2, name: 'TechFlow Inc', area: 25000, rules: [] },
		{ id: 3, name: 'Meridian Group', area: 10000, rules: [] }
	]);

	expenses = $state<Expense[]>([
		{ id: 1, category: 'Property Taxes', amount: 150000, type: 'Fixed' },
		{ id: 2, category: 'Insurance', amount: 45000, type: 'Fixed' },
		{ id: 3, category: 'Utilities', amount: 120000, type: 'Variable' },
		{ id: 4, category: 'Janitorial', amount: 80000, type: 'Variable' },
		{ id: 5, category: 'Security', amount: 95000, type: 'Fixed' }
	]);

	// --- DERIVED CALCULATIONS ---

	availableCategories = $derived(this.expenses.map((e) => e.category));

	totalOccupiedArea = $derived(this.tenants.reduce((sum, t) => sum + t.area, 0));

	effectiveGLA = $derived(Math.max(this.buildingGLA, this.totalOccupiedArea));

	tenantShares = $derived(
		this.tenants.map((t) => ({
			...t,
			proRataFraction: t.area / this.effectiveGLA
		}))
	);

	grossUpFactor = $derived(
		this.currentOccupancy < this.targetOccupancy
			? (this.targetOccupancy / 100) / (this.currentOccupancy / 100)
			: 1
	);

	calculatedExpenses = $derived(
		this.expenses.map((exp) => {
			let adjustedAmount = exp.amount;
			if (exp.type === 'Variable') {
				adjustedAmount = exp.amount * this.grossUpFactor;
			}
			return {
				...exp,
				adjustedAmount: adjustedAmount,
				variance: exp.type === 'Variable' ? adjustedAmount - exp.amount : 0
			};
		})
	);

	totalPool = $derived(this.calculatedExpenses.reduce((sum, e) => sum + e.adjustedAmount, 0));

	finalBills = $derived(
		this.tenantShares.map((tenant) => {
			let tenantTotalBill = 0;
			let lineItems: any[] = [];

			this.calculatedExpenses.forEach((exp) => {
				let rule = tenant.rules.find((r) => r.category === exp.category);
				let potentialCharge = exp.adjustedAmount * tenant.proRataFraction;
				let finalCharge = potentialCharge;
				let note = 'Standard Pro-Rata';
				let status = 'default';

				if (rule) {
					if (rule.type === 'Exclude') {
						finalCharge = 0;
						note = 'Excluded by Lease';
						status = 'excluded';
					} else if (rule.type === 'Cap' && rule.value !== null) {
						let cappedExpensePool = Math.min(exp.adjustedAmount, rule.value);
						finalCharge = cappedExpensePool * tenant.proRataFraction;
						if (exp.adjustedAmount > rule.value) {
							note = `Capped at ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(rule.value)} (Pool)`;
							status = 'capped';
						}
					}
				}

				tenantTotalBill += finalCharge;
				lineItems.push({
					category: exp.category,
					share: finalCharge,
					note: note,
					status: status
				});
			});

			return {
				tenant: tenant.name,
				area: tenant.area,
				fraction: (tenant.proRataFraction * 100).toFixed(2) + '%',
				totalBill: tenantTotalBill,
				lineItems: lineItems
			};
		})
	);

	// --- ACTIONS ---

	addRule(tenantId: number, category: string, type: RuleType, value: number) {
		const tenantIndex = this.tenants.findIndex((t) => t.id === tenantId);
		if (tenantIndex !== -1) {
			let existingRules = this.tenants[tenantIndex].rules.filter((r) => r.category !== category);
			this.tenants[tenantIndex].rules = [
				...existingRules,
				{
					category: category,
					type: type,
					value: type === 'Cap' ? value : null
				}
			];
		}
	}

	removeRule(tenantId: number, category: string) {
		const tenantIndex = this.tenants.findIndex((t) => t.id === tenantId);
		if (tenantIndex !== -1) {
			this.tenants[tenantIndex].rules = this.tenants[tenantIndex].rules.filter(
				(r) => r.category !== category
			);
		}
	}
}

export const engine = new CamEngine();