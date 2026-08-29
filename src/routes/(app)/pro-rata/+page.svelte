<script lang="ts">
  let { data, form }: any = $props();

  const inputClass =
    "w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none transition focus:border-orange-400";
  const labelClass = "mb-2 block text-sm font-semibold text-zinc-400";
  const primaryButton =
    "rounded-xl bg-gradient-to-r from-orange-500 to-amber-400 px-4 py-2 text-sm font-bold text-zinc-950 transition hover:opacity-95";
  const ghostButton =
    "rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-bold text-white transition hover:bg-white/10";

  const preview = form?.preview;
  const params = form?.params ?? {};
</script>

<div class="space-y-6">
  <div>
    <span
      class="inline-flex rounded-full border border-orange-500/20 bg-orange-500/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-orange-300"
    >
      BOMA Pro-Rata Share Engine
    </span>

    <h1 class="mt-4 text-3xl font-bold tracking-tight text-white">
      Pro-Rata Calculation Engine
    </h1>

    <p class="mt-2 max-w-3xl text-sm leading-6 text-zinc-400">
      Select a building and period, preview the weighted pro-rata calculation,
      then commit the result to create an audit-ready snapshot.
    </p>
  </div>

  {#if form?.error}
    <div
      class="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200"
    >
      {form.error}
    </div>
  {/if}

  <form
    method="POST"
    action="?/preview"
    class="rounded-3xl border border-white/10 bg-white/5 p-6"
  >
    <div class="grid gap-4 md:grid-cols-5">
      <label class="block md:col-span-2">
        <span class={labelClass}>Building</span>
        <select name="building_id" required class={inputClass}>
          <option value="">Select building</option>
          {#each data.buildings as building}
            <option value={building.id}>{building.name}</option>
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
        <span class={labelClass}>Denominator</span>
        <select name="denominator_choice" class={inputClass}>
          <option value="building_default">Building Default</option>
          <option value="gla">GLA</option>
          <option value="rentable_area">Rentable Area</option>
        </select>
      </label>
    </div>

    <div class="mt-5 flex flex-wrap gap-3">
      <button type="submit" class={primaryButton}> Preview Calculation </button>
    </div>
  </form>

  {#if preview}
    <div class="space-y-4">
      <div class="grid gap-4 md:grid-cols-4">
        <div class="rounded-3xl border border-white/10 bg-white/5 p-5">
          <p class="text-xs uppercase tracking-[0.12em] text-zinc-500">
            Denominator Area
          </p>
          <p class="mt-2 text-2xl font-bold text-white">
            {preview.summary.denominatorArea}
          </p>
        </div>

        <div class="rounded-3xl border border-white/10 bg-white/5 p-5">
          <p class="text-xs uppercase tracking-[0.12em] text-zinc-500">
            Leased Area End
          </p>
          <p class="mt-2 text-2xl font-bold text-white">
            {preview.summary.leasedAreaEnd}
          </p>
        </div>

        <div class="rounded-3xl border border-white/10 bg-white/5 p-5">
          <p class="text-xs uppercase tracking-[0.12em] text-zinc-500">
            Vacancy Area
          </p>
          <p class="mt-2 text-2xl font-bold text-white">
            {preview.summary.vacancyArea}
          </p>
        </div>

        <div class="rounded-3xl border border-white/10 bg-white/5 p-5">
          <p class="text-xs uppercase tracking-[0.12em] text-zinc-500">
            Total Share
          </p>
          <p class="mt-2 text-2xl font-bold text-white">
            {(preview.summary.totalSharePercent * 100).toFixed(4)}%
          </p>
        </div>
      </div>

      {#if preview.errors.length > 0}
        <div
          class="rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200"
        >
          {#each preview.errors as error}
            <p>{error}</p>
          {/each}
        </div>
      {/if}

      {#if preview.warnings.length > 0}
        <div
          class="rounded-2xl border border-yellow-500/20 bg-yellow-500/10 p-4 text-sm text-yellow-200"
        >
          {#each preview.warnings as warning}
            <p>{warning}</p>
          {/each}
        </div>
      {/if}

      <div class="rounded-3xl border border-white/10 bg-white/5 p-6">
        <div class="flex flex-wrap items-center justify-between gap-4">
          <h2 class="text-lg font-bold text-white">Preview Results</h2>

          <form method="POST" action="?/commit">
            <input
              type="hidden"
              name="building_id"
              value={params.buildingId ?? ""}
            />
            <input
              type="hidden"
              name="start_date"
              value={params.startDate ?? ""}
            />
            <input type="hidden" name="end_date" value={params.endDate ?? ""} />
            <input
              type="hidden"
              name="denominator_choice"
              value={params.denominatorChoice ?? ""}
            />

            <button type="submit" class={primaryButton} disabled={!preview.ok}>
              Commit Calculation
            </button>
          </form>
        </div>

        <div class="mt-4 overflow-x-auto">
          <table
            class="w-full min-w-[900px] border-separate border-spacing-y-2"
          >
            <thead>
              <tr
                class="text-left text-xs uppercase tracking-[0.12em] text-zinc-500"
              >
                <th class="px-3 py-2">Tenant</th>
                <th class="px-3 py-2">Lease</th>
                <th class="px-3 py-2">Occupied Days</th>
                <th class="px-3 py-2">Start Area</th>
                <th class="px-3 py-2">End Area</th>
                <th class="px-3 py-2">Weighted Area Days</th>
                <th class="px-3 py-2">Share</th>
              </tr>
            </thead>

            <tbody>
              {#each preview.lines as line}
                <tr class="rounded-2xl bg-white/[0.03] text-sm text-zinc-200">
                  <td class="px-3 py-3 font-semibold text-white"
                    >{line.tenantName}</td
                  >
                  <td class="px-3 py-3">{line.leaseNumber ?? "-"}</td>
                  <td class="px-3 py-3">{line.occupiedDays}</td>
                  <td class="px-3 py-3">{line.startArea}</td>
                  <td class="px-3 py-3">{line.endArea}</td>
                  <td class="px-3 py-3">{line.weightedAreaDays}</td>
                  <td class="px-3 py-3 font-bold text-orange-300">
                    {(line.sharePercent * 100).toFixed(6)}%
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  {/if}

  <div class="rounded-3xl border border-white/10 bg-white/5 p-6">
    <h2 class="text-lg font-bold text-white">Recent Runs</h2>

    <div class="mt-4 overflow-x-auto">
      <table class="w-full min-w-[800px] border-separate border-spacing-y-2">
        <thead>
          <tr
            class="text-left text-xs uppercase tracking-[0.12em] text-zinc-500"
          >
            <th class="px-3 py-2">Building</th>
            <th class="px-3 py-2">Period</th>
            <th class="px-3 py-2">Status</th>
            <th class="px-3 py-2">Created</th>
            <th class="px-3 py-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {#each data.runs as run}
            <tr class="rounded-2xl bg-white/[0.03] text-sm text-zinc-200">
              <td class="px-3 py-3 font-semibold text-white"
                >{run.buildings?.name ?? "-"}</td
              >
              <td class="px-3 py-3"
                >{run.period_start_date} → {run.period_end_date}</td
              >
              <td class="px-3 py-3">{run.status}</td>
              <td class="px-3 py-3"
                >{new Date(run.created_at).toLocaleString()}</td
              >
              <td class="px-3 py-3">
                <a
                  href={`/pro-rata/runs/${run.id}`}
                  class="rounded-lg border border-white/15 bg-white/5 px-3 py-1 text-xs font-bold text-white"
                >
                  View
                </a>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</div>
