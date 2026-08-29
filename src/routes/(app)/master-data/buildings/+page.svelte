<script lang="ts">
  let { data, form }: any = $props();

  const inputClass =
    "w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none transition focus:border-orange-400";
  const labelClass = "mb-2 block text-sm font-semibold text-zinc-400";
  const primaryButton =
    "rounded-xl bg-gradient-to-r from-orange-500 to-amber-400 px-4 py-2 text-sm font-bold text-zinc-950 transition hover:opacity-95";
</script>

<div class="space-y-6">
  <div>
    <h1 class="text-3xl font-bold tracking-tight text-white">Buildings</h1>
    <p class="mt-2 text-sm text-zinc-400">
      Manage building master data and default pro-rata denominator settings.
    </p>
  </div>

  {#if form?.error}
    <div
      class="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200"
    >
      {form.error}
    </div>
  {/if}

  {#if form?.success}
    <div
      class="rounded-2xl border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-200"
    >
      Action completed.
    </div>
  {/if}

  <div class="grid gap-6 lg:grid-cols-[380px,1fr]">
    <form
      method="POST"
      action="?/create"
      class="h-fit rounded-3xl border border-white/10 bg-white/5 p-6"
    >
      <h2 class="text-lg font-bold text-white">Create Building</h2>

      <div class="mt-5 space-y-4">
        <label class="block">
          <span class={labelClass}>Name</span>
          <input name="name" required class={inputClass} />
        </label>

        <label class="block">
          <span class={labelClass}>Address</span>
          <input name="address" class={inputClass} />
        </label>

        <label class="block">
          <span class={labelClass}>Total GLA</span>
          <input
            name="total_gla"
            type="number"
            step="0.0001"
            min="0"
            class={inputClass}
          />
        </label>

        <label class="block">
          <span class={labelClass}>Total Rentable Area</span>
          <input
            name="total_rentable_area"
            type="number"
            step="0.0001"
            min="0"
            class={inputClass}
          />
        </label>

        <label class="block">
          <span class={labelClass}>Default Denominator Type</span>
          <select name="default_denominator_type" class={inputClass}>
            <option value="rentable_area">Rentable Area</option>
            <option value="gla">GLA</option>
            <option value="lease_defined">Lease Defined</option>
          </select>
        </label>

        <label class="block">
          <span class={labelClass}>Measurement Standard</span>
          <input
            name="measurement_standard"
            class={inputClass}
            placeholder="BOMA 2017, local standard, etc."
          />
        </label>

        <button type="submit" class={primaryButton}> Create Building </button>
      </div>
    </form>

    <div class="rounded-3xl border border-white/10 bg-white/5 p-6">
      <h2 class="text-lg font-bold text-white">Building List</h2>

      <div class="mt-4 overflow-x-auto">
        <table class="w-full min-w-[800px] border-separate border-spacing-y-2">
          <thead>
            <tr
              class="text-left text-xs uppercase tracking-[0.12em] text-zinc-500"
            >
              <th class="px-3 py-2">Name</th>
              <th class="px-3 py-2">Address</th>
              <th class="px-3 py-2">GLA</th>
              <th class="px-3 py-2">Rentable Area</th>
              <th class="px-3 py-2">Denominator</th>
              <th class="px-3 py-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {#each data.buildings as building}
              <tr class="rounded-2xl bg-white/[0.03] text-sm text-zinc-200">
                <td class="px-3 py-3 font-semibold text-white">
                  <a
                    href={`/master-data/buildings/${building.id}`}
                    class="hover:text-orange-300"
                  >
                    {building.name}
                  </a>
                </td>
                <td class="px-3 py-3">{building.address ?? "-"}</td>
                <td class="px-3 py-3">{building.total_gla ?? "-"}</td>
                <td class="px-3 py-3">{building.total_rentable_area ?? "-"}</td>
                <td class="px-3 py-3">{building.default_denominator_type}</td>
                <td class="px-3 py-3">
                  <form method="POST" action="?/delete">
                    <input type="hidden" name="id" value={building.id} />
                    <button
                      type="submit"
                      class="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-1 text-xs font-bold text-red-200"
                    >
                      Delete
                    </button>
                  </form>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
