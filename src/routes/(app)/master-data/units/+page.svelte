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
    <h1 class="text-3xl font-bold tracking-tight text-white">Units</h1>
    <p class="mt-2 text-sm text-zinc-400">
      Manage units/spaces across all buildings.
    </p>
  </div>

  {#if form?.error}
    <div
      class="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200"
    >
      {form.error}
    </div>
  {/if}

  <div class="grid gap-6 lg:grid-cols-[360px,1fr]">
    <form
      method="POST"
      action="?/create"
      class="h-fit rounded-3xl border border-white/10 bg-white/5 p-6"
    >
      <h2 class="text-lg font-bold text-white">Create Unit</h2>

      <div class="mt-5 space-y-4">
        <label class="block">
          <span class={labelClass}>Building</span>
          <select name="building_id" required class={inputClass}>
            <option value="">Select building</option>
            {#each data.buildings as building}
              <option value={building.id}>{building.name}</option>
            {/each}
          </select>
        </label>

        <label class="block">
          <span class={labelClass}>Code</span>
          <input name="code" required class={inputClass} placeholder="101" />
        </label>

        <label class="block">
          <span class={labelClass}>Name</span>
          <input name="name" class={inputClass} placeholder="Suite 101" />
        </label>

        <label class="block">
          <span class={labelClass}>Floor</span>
          <input name="floor" class={inputClass} />
        </label>

        <label class="block">
          <span class={labelClass}>Unit Type</span>
          <input name="unit_type" class={inputClass} placeholder="Office" />
        </label>

        <label class="block">
          <span class={labelClass}>Usable Area</span>
          <input
            name="usable_area"
            type="number"
            step="0.0001"
            min="0"
            class={inputClass}
          />
        </label>

        <label class="block">
          <span class={labelClass}>Rentable Area</span>
          <input
            name="rentable_area"
            type="number"
            step="0.0001"
            min="0"
            class={inputClass}
          />
        </label>

        <button type="submit" class={primaryButton}>Create Unit</button>
      </div>
    </form>

    <div class="rounded-3xl border border-white/10 bg-white/5 p-6">
      <h2 class="text-lg font-bold text-white">Unit List</h2>

      <div class="mt-4 overflow-x-auto">
        <table class="w-full min-w-[800px] border-separate border-spacing-y-2">
          <thead>
            <tr
              class="text-left text-xs uppercase tracking-[0.12em] text-zinc-500"
            >
              <th class="px-3 py-2">Building</th>
              <th class="px-3 py-2">Suite Number</th>
              <th class="px-3 py-2">Name</th>
              <th class="px-3 py-2">Floor</th>
              <th class="px-3 py-2">Usable</th>
              <th class="px-3 py-2">Rentable</th>
              <th class="px-3 py-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {#each data.units as unit}
              <tr class="rounded-2xl bg-white/[0.03] text-sm text-zinc-200">
                <td class="px-3 py-3"
                  >{unit.personal_project_tenancytrueup_buildings?.name ??
                    "-"}</td
                >
                <td class="px-3 py-3 font-semibold text-white"
                  >{unit.suite_number}</td
                >
                <td class="px-3 py-3">{unit.name ?? "-"}</td>
                <td class="px-3 py-3">{unit.floor ?? "-"}</td>
                <td class="px-3 py-3">{unit.usable_area}</td>
                <td class="px-3 py-3">{unit.rentable_area}</td>
                <td class="px-3 py-3">
                  <form method="POST" action="?/delete">
                    <input type="hidden" name="id" value={unit.id} />
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
