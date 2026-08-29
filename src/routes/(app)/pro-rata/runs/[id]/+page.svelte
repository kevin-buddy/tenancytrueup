<script lang="ts">
  let { data }: any = $props();
</script>

<div class="space-y-6">
  <div>
    <a
      href="/pro-rata"
      class="text-sm font-bold text-orange-300 hover:text-orange-200"
    >
      ← Back to Pro-Rata Engine
    </a>

    <h1 class="mt-3 text-3xl font-bold tracking-tight text-white">
      Pro-Rata Run Detail
    </h1>

    <p class="mt-2 text-sm text-zinc-400">
      Building: {data.run.buildings?.name ?? "-"} • Period: {data.run
        .period_start_date} to {data.run.period_end_date}
    </p>
  </div>

  <div class="grid gap-4 md:grid-cols-4">
    <div class="rounded-3xl border border-white/10 bg-white/5 p-5">
      <p class="text-xs uppercase tracking-[0.12em] text-zinc-500">Status</p>
      <p class="mt-2 text-2xl font-bold text-white">{data.run.status}</p>
    </div>

    <div class="rounded-3xl border border-white/10 bg-white/5 p-5">
      <p class="text-xs uppercase tracking-[0.12em] text-zinc-500">
        Denominator Area
      </p>
      <p class="mt-2 text-2xl font-bold text-white">
        {data.run.total_denominator_area ?? "-"}
      </p>
    </div>

    <div class="rounded-3xl border border-white/10 bg-white/5 p-5">
      <p class="text-xs uppercase tracking-[0.12em] text-zinc-500">
        Leased Area End
      </p>
      <p class="mt-2 text-2xl font-bold text-white">
        {data.run.total_leased_area ?? "-"}
      </p>
    </div>

    <div class="rounded-3xl border border-white/10 bg-white/5 p-5">
      <p class="text-xs uppercase tracking-[0.12em] text-zinc-500">
        Vacancy Area
      </p>
      <p class="mt-2 text-2xl font-bold text-white">
        {data.run.vacancy_area ?? "-"}
      </p>
    </div>
  </div>

  <div class="rounded-3xl border border-white/10 bg-white/5 p-6">
    <h2 class="text-lg font-bold text-white">Saved Result Lines</h2>

    <div class="mt-4 overflow-x-auto">
      <table class="w-full min-w-[900px] border-separate border-spacing-y-2">
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
          {#each data.lines as line}
            <tr class="rounded-2xl bg-white/[0.03] text-sm text-zinc-200">
              <td class="px-3 py-3 font-semibold text-white"
                >{line.tenants?.name ?? "-"}</td
              >
              <td class="px-3 py-3">{line.leases?.lease_number ?? "-"}</td>
              <td class="px-3 py-3">{line.occupied_days}</td>
              <td class="px-3 py-3">{line.start_area}</td>
              <td class="px-3 py-3">{line.end_area}</td>
              <td class="px-3 py-3">{line.weighted_area_days}</td>
              <td class="px-3 py-3 font-bold text-orange-300">
                {(Number(line.share_percent) * 100).toFixed(6)}%
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</div>
