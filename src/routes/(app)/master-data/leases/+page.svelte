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
    <h1 class="text-3xl font-bold tracking-tight text-white">Leases</h1>
    <p class="mt-2 text-sm text-zinc-400">
      Manage lease contracts between tenants and buildings.
    </p>
  </div>

  {#if form?.error}
    <div
      class="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200"
    >
      {form.error}
    </div>
  {/if}

  <div class="grid gap-6 lg:grid-cols-[400px,1fr]">
    <form
      method="POST"
      action="?/create"
      class="h-fit rounded-3xl border border-white/10 bg-white/5 p-6"
    >
      <h2 class="text-lg font-bold text-white">Create Lease</h2>

      <div class="mt-5 space-y-4">
        <label class="block">
          <span class={labelClass}>Tenant</span>
          <select name="tenant_id" required class={inputClass}>
            <option value="">Select tenant</option>
            {#each data.tenants as tenant}
              <option value={tenant.id}>{tenant.name}</option>
            {/each}
          </select>
        </label>

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
          <span class={labelClass}>Lease Number</span>
          <input
            name="lease_number"
            class={inputClass}
            placeholder="L-2025-001"
          />
        </label>

        <label class="block">
          <span class={labelClass}>Start Date</span>
          <input name="start_date" type="date" required class={inputClass} />
        </label>

        <label class="block">
          <span class={labelClass}>End Date</span>
          <input name="end_date" type="date" class={inputClass} />
        </label>

        <label class="block">
          <span class={labelClass}>Status</span>
          <select name="status" class={inputClass}>
            <option value="draft">Draft</option>
            <option value="active">Active</option>
            <option value="terminated">Terminated</option>
            <option value="expired">Expired</option>
          </select>
        </label>

        <label class="block">
          <span class={labelClass}>Pro-Rata Denominator Type</span>
          <select name="pro_rata_denominator_type" class={inputClass}>
            <option value="building_default">Building Default</option>
            <option value="gla">GLA</option>
            <option value="rentable_area">Rentable Area</option>
            <option value="lease_defined">Lease Defined</option>
          </select>
        </label>

        <label class="block">
          <span class={labelClass}>Estimated Annual CAM</span>
          <input
            name="estimated_annual_cam"
            type="number"
            step="0.01"
            min="0"
            class={inputClass}
          />
        </label>

        <label class="block">
          <span class={labelClass}>Notes</span>
          <textarea name="notes" rows="3" class={inputClass}></textarea>
        </label>

        <button type="submit" class={primaryButton}>Create Lease</button>
      </div>
    </form>

    <div class="rounded-3xl border border-white/10 bg-white/5 p-6">
      <h2 class="text-lg font-bold text-white">Lease List</h2>

      <div class="mt-4 overflow-x-auto">
        <table class="w-full min-w-[900px] border-separate border-spacing-y-2">
          <thead>
            <tr
              class="text-left text-xs uppercase tracking-[0.12em] text-zinc-500"
            >
              <th class="px-3 py-2">Lease #</th>
              <th class="px-3 py-2">Tenant</th>
              <th class="px-3 py-2">Building</th>
              <th class="px-3 py-2">Start</th>
              <th class="px-3 py-2">End</th>
              <th class="px-3 py-2">Status</th>
              <th class="px-3 py-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {#each data.leases as lease}
              <tr class="rounded-2xl bg-white/[0.03] text-sm text-zinc-200">
                <td class="px-3 py-3 font-semibold text-white">
                  <a
                    href={`/master-data/leases/${lease.id}`}
                    class="hover:text-orange-300"
                  >
                    {lease.lease_number ?? "No number"}
                  </a>
                </td>
                <td class="px-3 py-3">{lease.tenants?.name ?? "-"}</td>
                <td class="px-3 py-3">{lease.buildings?.name ?? "-"}</td>
                <td class="px-3 py-3">{lease.start_date}</td>
                <td class="px-3 py-3">{lease.end_date ?? "-"}</td>
                <td class="px-3 py-3">{lease.status}</td>
                <td class="px-3 py-3">
                  <form method="POST" action="?/delete">
                    <input type="hidden" name="id" value={lease.id} />
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
