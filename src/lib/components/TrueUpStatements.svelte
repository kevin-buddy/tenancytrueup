<script lang="ts">
  import { engine } from "$lib/engine.svelte";

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(val);
</script>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {#each engine.finalBills as stmt}
    <div
      class="bg-white rounded-xl border border-gray-200 overflow-hidden mock-dashboard-shadow flex flex-col hover:-translate-y-1 transition-transform duration-300"
    >
      <!-- Header -->
      <div
        class="p-5 border-b border-gray-100 bg-gray-900 text-white relative overflow-hidden"
      >
        <div
          class="absolute inset-0 bg-hero-pattern opacity-10 mix-blend-overlay"
        ></div>
        <h3 class="text-xl font-bold mb-1 relative z-10">{stmt.tenant}</h3>
        <div
          class="flex justify-between items-center text-xs text-gray-400 font-mono relative z-10 mt-3 pt-3 border-t border-gray-700"
        >
          <span>GLA: {stmt.area.toLocaleString()} sf</span>
          <span class="bg-brand-500 text-white px-1.5 py-0.5 rounded font-bold"
            >{stmt.fraction}</span
          >
        </div>
      </div>

      <!-- Line Items -->
      <div class="flex-1 p-0 overflow-y-auto" style="max-height: 320px;">
        <table class="w-full text-sm">
          <tbody class="divide-y divide-gray-100">
            {#each stmt.lineItems as item}
              <tr class="hover:bg-gray-50">
                <td class="px-5 py-3">
                  <div
                    class="font-medium {item.status === 'excluded'
                      ? 'text-gray-400 line-through'
                      : 'text-gray-900'}"
                  >
                    {item.category}
                  </div>
                  {#if item.status !== "default"}
                    <div
                      class="text-[10px] font-bold uppercase tracking-wider {item.status ===
                      'excluded'
                        ? 'text-red-500'
                        : 'text-brand-600'} mt-0.5"
                    >
                      {item.note}
                    </div>
                  {:else}
                    <div class="text-[10px] text-gray-400 mt-0.5">
                      Pro-Rata Share
                    </div>
                  {/if}
                </td>
                <td class="px-5 py-3 text-right">
                  <div
                    class="font-mono font-medium {item.share === 0
                      ? 'text-gray-400'
                      : 'text-gray-900'}"
                  >
                    {item.share === 0 ? "-" : formatCurrency(item.share)}
                  </div>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>

      <!-- Footer -->
      <div class="bg-gray-50 p-5 border-t border-gray-200">
        <div class="flex justify-between items-center mb-3">
          <span class="text-xs font-bold text-gray-500 uppercase tracking-wider"
            >Total True-Up Due</span
          >
          <span class="text-2xl font-bold text-gray-900"
            >{formatCurrency(stmt.totalBill)}</span
          >
        </div>
        <button
          class="w-full bg-white border border-gray-300 hover:border-brand-500 hover:text-brand-600 text-gray-700 font-semibold py-2 rounded text-sm shadow-sm transition-colors"
        >
          View Detail
        </button>
      </div>
    </div>
  {/each}
</div>
