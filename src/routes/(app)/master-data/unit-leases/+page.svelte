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
    <h1 class="text-3xl font-bold tracking-tight text-white">Unit Leases</h1>
    <p class="mt-2 text-sm text-zinc-400">
      Dated assignments connecting leases to units.
    </p>
  </div>

  {#if form?.error}
    <div
      class="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200"
    >
      {form.error}
    </div>
  {/if}

  <div class="grid gap-6 lg:grid-cols-[420px,1fr]">
    <form
      method="POST"
      action="?/create"
      class="h-fit rounded-3xl border border-white/10 bg-white/5 p-6"
    >
      <h2 class="text-lg font-bold text-white">Create Unit Lease</h2>

      <div class="mt-5 space-y-4">
        <label class="block">
          <span class={labelClass}>Lease</span>
          <select name="lease_id" required class={inputClass}>
            <option value="">Select lease</option>
            {#each data.leases as lease}
              <option value={lease.id}>
                {lease.lease_number ?? lease.id} — {lease.tenants?.name ??
                  "Unknown tenant"}
              </option>
            {/each}
          </select>
        </label>

        <label class="block">
          <span class={labelClass}>Unit</span>
          <select name="unit_id" required class={inputClass}>
            <option value="">Select unit</option>
            {#each data.units as unit}
              <option value={unit.id}>
                {unit.code} — {unit.buildings?.name ?? "Unknown building"}
              </option>
            {/each}
          </select>
        </label>

        <label class="block">
          <span class={labelClass}>Start Date</span>
          <input name="start_date" type="date" required class={inputClass} />
        </label>

        <label class="block">
          <span class={labelClass}>End Date</span>
          <input name="end_date" type="date" required class={inputClass} />
        </label>

        <label class="block">
          <span class={labelClass}>Usable Area Override</span>
          <input
            name="usable_area_override"
            type="number"
            step="0.0001"
            min="0"
            class={inputClass}
          />
        </label>

        <label class="block">
          <span class={labelClass}>Rentable Area Override</span>
          <input
            name="rentable_area_override"
            type="number"
            step="0.0001"
            min="0"
            class={inputClass}
          />
        </label>

        <label class="block">
          <span class={labelClass}>Notes</span>
          <input name="notes" class={inputClass} />
        </label>

        <button type="submit" class={primaryButton}>Create Unit Lease</button>
      </div>
    </form>

    <div class="rounded-3xl border border-white/10 bg-white/5 p-6">
      <h2 class="text-lg font-bold text-white">Unit Lease List</h2>

      <div class="mt-4 overflow-x-auto">
        <table class="w-full min-w-[900px] border-separate border-spacing-y-2">
          <thead>
            <tr
              class="text-left text-xs uppercase tracking-[0.12em] text-zinc-500"
            >
              <th class="px-3 py-2">Lease</th>
              <th class="px-3 py-2">Tenant</th>
              <th class="px-3 py-2">Unit</th>
              <th class="px-3 py-2">Building</th>
              <th class="px-3 py-2">Start</th>
              <th class="px-3 py-2">End</th>
              <th class="px-3 py-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {#each data.leaseUnits as leaseUnit}
              <tr class="rounded-2xl bg-white/[0.03] text-sm text-zinc-200">
                <td class="px-3 py-3 font-semibold text-white">
                  {leaseUnit.leases?.lease_number ?? "No number"}
                </td>
                <td class="px-3 py-3"
                  >{leaseUnit.leases?.tenants?.name ?? "-"}</td
                >
                <td class="px-3 py-3">{leaseUnit.units?.suite_number ?? "-"}</td
                >
                <td class="px-3 py-3"
                  >{leaseUnit.units?.buildings?.name ?? "-"}</td
                >
                <td class="px-3 py-3">{leaseUnit.start_date}</td>
                <td class="px-3 py-3">{leaseUnit.end_date}</td>
                <td class="px-3 py-3">
                  <form method="POST" action="?/delete">
                    <input type="hidden" name="id" value={leaseUnit.id} />
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
