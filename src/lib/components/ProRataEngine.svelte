<script lang="ts">
  import { engine } from "$lib/engine.svelte";

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(val);
</script>

<div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
  <!-- Left Col: Building & Tenants -->
  <div class="lg:col-span-7 space-y-6">
    <div
      class="bg-white rounded-xl border border-gray-200 mock-dashboard-shadow overflow-hidden"
    >
      <div
        class="px-6 py-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between"
      >
        <h3 class="font-bold text-gray-800 flex items-center gap-2">
          <div class="w-2 h-2 rounded-full bg-brand-500"></div>
          Building Parameters
        </h3>
      </div>
      <div class="p-6">
        <div class="mb-6">
          <label
            class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2"
            >Total Gross Leasable Area (GLA)</label
          >
          <div class="relative">
            <input
              type="number"
              bind:value={engine.buildingGLA}
              class="w-full text-xl font-medium p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 bg-gray-50 transition-all outline-none"
            />
            <div
              class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400 font-medium"
            >
              sq ft
            </div>
          </div>
        </div>

        <h4
          class="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4"
        >
          Tenant Allocations (Drag to adjust)
        </h4>
        <div class="space-y-4">
          {#each engine.tenants as tenant}
            <div
              class="flex flex-col sm:flex-row items-start sm:items-center gap-4 group"
            >
              <div class="w-32 font-semibold text-gray-900 truncate">
                {tenant.name}
              </div>
              <input
                type="range"
                min="1000"
                max="80000"
                step="500"
                bind:value={tenant.area}
                class="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-500"
              />
              <div class="w-32 text-right">
                <div class="text-sm font-bold text-gray-900">
                  {tenant.area.toLocaleString()} sq ft
                </div>
                <div
                  class="text-[10px] font-bold text-brand-600 bg-brand-50 inline-block px-1.5 py-0.5 rounded border border-brand-100 mt-0.5"
                >
                  {((tenant.area / engine.effectiveGLA) * 100).toFixed(2)}%
                  Share
                </div>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>

  <!-- Right Col: Gross Up Logic -->
  <div class="lg:col-span-5 space-y-6">
    <div
      class="bg-white rounded-xl border border-gray-200 mock-dashboard-shadow overflow-hidden flex flex-col h-full"
    >
      <div
        class="px-6 py-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between"
      >
        <h3 class="font-bold text-gray-800 flex items-center gap-2">
          <div class="w-2 h-2 rounded-full bg-brand-500"></div>
          Vacancy Gross-Up
        </h3>
        <span
          class="text-[10px] font-bold bg-brand-100 text-brand-700 px-2 py-1 rounded uppercase tracking-wider"
          >Active</span
        >
      </div>
      <div class="p-6 flex-1 flex flex-col">
        <div class="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label
              class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1"
              >Current Occ.</label
            >
            <div class="relative">
              <input
                type="number"
                bind:value={engine.currentOccupancy}
                class="w-full text-lg font-medium p-2 border border-gray-300 rounded focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
              />
              <div
                class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400"
              >
                %
              </div>
            </div>
          </div>
          <div>
            <label
              class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1"
              >Target Occ.</label
            >
            <div class="relative">
              <input
                type="number"
                bind:value={engine.targetOccupancy}
                class="w-full text-lg font-medium p-2 border border-gray-300 rounded focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
              />
              <div
                class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400"
              >
                %
              </div>
            </div>
          </div>
        </div>

        <div
          class="bg-gray-800 text-white p-4 rounded-lg flex justify-between items-center mb-6 shadow-inner"
        >
          <span class="text-sm text-gray-300 font-medium"
            >Applied Multiplier</span
          >
          <span class="text-2xl font-bold text-brand-400"
            >{engine.grossUpFactor.toFixed(3)}x</span
          >
        </div>

        <div
          class="overflow-hidden border border-gray-200 rounded-lg flex-1 flex flex-col"
        >
          <div class="overflow-y-auto flex-1 p-0">
            <table class="w-full text-sm">
              <thead class="bg-gray-50 sticky top-0">
                <tr>
                  <th
                    class="px-4 py-2 text-left font-semibold text-gray-600 text-xs uppercase tracking-wider"
                    >Pool</th
                  >
                  <th
                    class="px-4 py-2 text-right font-semibold text-gray-600 text-xs uppercase tracking-wider"
                    >Adjusted</th
                  >
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                {#each engine.calculatedExpenses as exp}
                  <tr class={exp.type === "Variable" ? "bg-brand-50/30" : ""}>
                    <td class="px-4 py-3">
                      <div class="font-medium text-gray-900">
                        {exp.category}
                      </div>
                      <div class="text-[10px] text-gray-500 mt-0.5">
                        {exp.type}
                      </div>
                    </td>
                    <td class="px-4 py-3 text-right">
                      <div
                        class="font-medium {exp.variance > 0
                          ? 'text-brand-600'
                          : 'text-gray-900'}"
                      >
                        {formatCurrency(exp.adjustedAmount)}
                      </div>
                      {#if exp.variance > 0}
                        <div class="text-[10px] text-brand-500 font-semibold">
                          +{formatCurrency(exp.variance)}
                        </div>
                      {/if}
                    </td>
                  </tr>
                {/each}
              </tbody>
            </table>
          </div>
          <div
            class="bg-gray-50 p-3 border-t border-gray-200 flex justify-between items-center text-sm font-bold"
          >
            <span class="text-gray-600">Total Allocable Pool:</span>
            <span class="text-gray-900 text-lg"
              >{formatCurrency(engine.totalPool)}</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
