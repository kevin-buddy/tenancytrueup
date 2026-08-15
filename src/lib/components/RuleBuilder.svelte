<script lang="ts">
  import { engine } from "$lib/engine.svelte";
  import type { RuleType } from "$lib/engine.svelte";

  let selectedTenantId = $state(1);
  let newRuleCategory = $state("Security");
  let newRuleType = $state<RuleType>("Cap");
  let newRuleValue = $state(50000);

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(val);
</script>

<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
  <!-- Rule Creator -->
  <div
    class="bg-white p-6 rounded-xl border border-gray-200 mock-dashboard-shadow h-fit sticky top-24"
  >
    <h3
      class="text-sm font-bold text-gray-800 uppercase tracking-wider mb-6 flex items-center gap-2"
    >
      <svg
        class="w-4 h-4 text-brand-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        ><path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
        ></path></svg
      >
      Add Exception Rule
    </h3>

    <div class="space-y-5">
      <div>
        <label
          class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5"
          >Tenant</label
        >
        <select
          bind:value={selectedTenantId}
          class="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none text-sm font-medium"
        >
          {#each engine.tenants as tenant}
            <option value={tenant.id}>{tenant.name}</option>
          {/each}
        </select>
      </div>
      <div>
        <label
          class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5"
          >Expense Pool</label
        >
        <select
          bind:value={newRuleCategory}
          class="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none text-sm font-medium"
        >
          {#each engine.availableCategories as cat}
            <option value={cat}>{cat}</option>
          {/each}
        </select>
      </div>
      <div>
        <label
          class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5"
          >Constraint Type</label
        >
        <select
          bind:value={newRuleType}
          class="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none text-sm font-medium"
        >
          <option value="Cap">Expense Pool Cap</option>
          <option value="Exclude">Strict Exclusion</option>
        </select>
      </div>

      {#if newRuleType === "Cap"}
        <div>
          <label
            class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5"
            >Cap Amount ($)</label
          >
          <input
            type="number"
            bind:value={newRuleValue}
            class="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none text-sm font-medium"
          />
        </div>
      {/if}

      <button
        onclick={() =>
          engine.addRule(
            selectedTenantId,
            newRuleCategory,
            newRuleType,
            newRuleValue,
          )}
        class="w-full bg-brand-500 hover:bg-brand-600 text-white font-bold py-3 rounded-lg shadow-sm transition-transform active:scale-[0.98] mt-2"
      >
        Inject Rule to Engine
      </button>
    </div>
  </div>

  <!-- Active Rules Viewer -->
  <div class="md:col-span-2 space-y-6">
    {#each engine.tenants as tenant}
      <div
        class="bg-white rounded-xl border border-gray-200 overflow-hidden mock-dashboard-shadow transition-all hover:border-gray-300"
      >
        <div
          class="bg-gray-50 px-5 py-3 border-b border-gray-100 flex justify-between items-center"
        >
          <span class="font-bold text-gray-900">{tenant.name}</span>
          <span
            class="text-[10px] font-bold bg-white text-gray-600 px-2 py-1 rounded border shadow-sm"
            >{tenant.rules.length} Active Rules</span
          >
        </div>
        <div class="p-5">
          {#if tenant.rules.length === 0}
            <div
              class="text-sm text-gray-400 italic text-center py-4 border border-dashed border-gray-200 rounded"
            >
              Standard Pro-Rata allocation applies to all pools.
            </div>
          {:else}
            <div class="space-y-3">
              {#each tenant.rules as rule}
                <div
                  class="flex justify-between items-center p-3 rounded-lg border {rule.type ===
                  'Exclude'
                    ? 'bg-red-50/50 border-red-100'
                    : 'bg-brand-50/50 border-brand-100'} group"
                >
                  <div class="flex items-center gap-3">
                    <span
                      class="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded {rule.type ===
                      'Exclude'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-brand-100 text-brand-700'}"
                    >
                      {rule.type}
                    </span>
                    <span class="text-sm text-gray-800">
                      <span class="font-semibold">{rule.category}</span>
                      {#if rule.type === "Cap" && rule.value !== null}
                        <span class="text-gray-500"> limited to </span><span
                          class="font-bold text-gray-900"
                          >{formatCurrency(rule.value)}</span
                        >
                      {:else}
                        <span class="text-gray-500">
                          is completely removed.</span
                        >
                      {/if}
                    </span>
                  </div>
                  <button
                    onclick={() => engine.removeRule(tenant.id, rule.category)}
                    class="text-gray-400 hover:text-red-500 transition-colors p-1"
                  >
                    <svg
                      class="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      ><path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      ></path></svg
                    >
                  </button>
                </div>
              {/each}
            </div>
          {/if}
        </div>
      </div>
    {/each}
  </div>
</div>
