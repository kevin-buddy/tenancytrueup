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
    <a
      href="/master-data/buildings"
      class="text-sm font-bold text-orange-300 hover:text-orange-200"
    >
      ← Back to Buildings
    </a>

    <h1 class="mt-3 text-3xl font-bold tracking-tight text-white">
      {data.building.name}
    </h1>

    <p class="mt-2 text-sm text-zinc-400">
      Manage units and building area snapshots for this building.
    </p>
  </div>

  {#if form?.error}
    <div
      class="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200"
    >
      {form.error}
    </div>
  {/if}

  <div
    class="grid gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 md:grid-cols-4"
  >
    <div>
      <p class="text-xs uppercase tracking-[0.12em] text-zinc-500">Total GLA</p>
      <p class="mt-2 text-xl font-bold text-white">
        {data.building.total_gla ?? "-"}
      </p>
    </div>

    <div>
      <p class="text-xs uppercase tracking-[0.12em] text-zinc-500">
        Total Rentable Area
      </p>
      <p class="mt-2 text-xl font-bold text-white">
        {data.building.total_rentable_area ?? "-"}
      </p>
    </div>

    <div>
      <p class="text-xs uppercase tracking-[0.12em] text-zinc-500">
        Default Denominator
      </p>
      <p class="mt-2 text-xl font-bold text-white">
        {data.building.default_denominator_type}
      </p>
    </div>

    <div>
      <p class="text-xs uppercase tracking-[0.12em] text-zinc-500">
        Measurement Standard
      </p>
      <p class="mt-2 text-xl font-bold text-white">
        {data.building.measurement_standard ?? "-"}
      </p>
    </div>
  </div>

  <div class="grid gap-6 xl:grid-cols-2">
    <div class="rounded-3xl border border-white/10 bg-white/5 p-6">
      <h2 class="text-lg font-bold text-white">Units</h2>

      <form
        method="POST"
        action="?/createUnit"
        class="mt-5 grid gap-4 md:grid-cols-2"
      >
        <label class="block">
          <span class={labelClass}>Suite Number</span>
          <input
            name="suite_number"
            required
            class={inputClass}
            placeholder="101"
          />
        </label>

        <label class="block">
          <span class={labelClass}>Name</span>
          <input name="name" class={inputClass} placeholder="Suite 101" />
        </label>

        <label class="block">
          <span class={labelClass}>Floor</span>
          <input name="floor" class={inputClass} placeholder="1" />
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

        <div class="md:col-span-2">
          <button type="submit" class={primaryButton}>Add Unit</button>
        </div>
      </form>

      <div class="mt-6 overflow-x-auto">
        <table class="w-full min-w-[650px] border-separate border-spacing-y-2">
          <thead>
            <tr
              class="text-left text-xs uppercase tracking-[0.12em] text-zinc-500"
            >
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
                <td class="px-3 py-3 font-semibold text-white"
                  >{unit.suite_number}</td
                >
                <td class="px-3 py-3">{unit.name ?? "-"}</td>
                <td class="px-3 py-3">{unit.floor ?? "-"}</td>
                <td class="px-3 py-3">{unit.usable_area}</td>
                <td class="px-3 py-3">{unit.rentable_area}</td>
                <td class="px-3 py-3">
                  <form method="POST" action="?/deleteUnit">
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

    <div class="rounded-3xl border border-white/10 bg-white/5 p-6">
      <h2 class="text-lg font-bold text-white">Building Area Snapshots</h2>

      <form
        method="POST"
        action="?/createSnapshot"
        class="mt-5 grid gap-4 md:grid-cols-2"
      >
        <label class="block">
          <span class={labelClass}>Effective Date</span>
          <input
            name="effective_date"
            type="date"
            required
            class={inputClass}
          />
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
          <span class={labelClass}>Measurement Standard</span>
          <input name="measurement_standard" class={inputClass} />
        </label>

        <label class="block">
          <span class={labelClass}>Measured By</span>
          <input name="measured_by" class={inputClass} />
        </label>

        <label class="block md:col-span-2">
          <span class={labelClass}>Notes</span>
          <input name="notes" class={inputClass} />
        </label>

        <div class="md:col-span-2">
          <button type="submit" class={primaryButton}>Add Snapshot</button>
        </div>
      </form>

      <div class="mt-6 overflow-x-auto">
        <table class="w-full min-w-[650px] border-separate border-spacing-y-2">
          <thead>
            <tr
              class="text-left text-xs uppercase tracking-[0.12em] text-zinc-500"
            >
              <th class="px-3 py-2">Effective Date</th>
              <th class="px-3 py-2">GLA</th>
              <th class="px-3 py-2">Rentable</th>
              <th class="px-3 py-2">Standard</th>
              <th class="px-3 py-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {#each data.snapshots as snapshot}
              <tr class="rounded-2xl bg-white/[0.03] text-sm text-zinc-200">
                <td class="px-3 py-3 font-semibold text-white"
                  >{snapshot.effective_date}</td
                >
                <td class="px-3 py-3">{snapshot.total_gla ?? "-"}</td>
                <td class="px-3 py-3">{snapshot.total_rentable_area ?? "-"}</td>
                <td class="px-3 py-3">{snapshot.measurement_standard ?? "-"}</td
                >
                <td class="px-3 py-3">
                  <form method="POST" action="?/deleteSnapshot">
                    <input type="hidden" name="id" value={snapshot.id} />
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
