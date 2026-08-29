<script lang="ts">
  let { data }: any = $props();

  const cards = [
    {
      title: "Buildings",
      description:
        "Manage buildings, total GLA, rentable area, and default denominator.",
      href: "/master-data/buildings",
      count: data.counts.buildings,
    },
    {
      title: "Units",
      description: "Manage units/spaces inside buildings.",
      href: "/master-data/units",
      count: data.counts.units,
    },
    {
      title: "Tenants",
      description: "Manage tenant master data.",
      href: "/master-data/tenants",
      count: data.counts.tenants,
    },
    {
      title: "Leases",
      description: "Manage lease contracts between tenants and buildings.",
      href: "/master-data/leases",
      count: data.counts.leases,
    },
    {
      title: "Unit Leases",
      description:
        "Manage dated occupancy assignments between leases and units.",
      href: "/master-data/unit-leases",
      count: data.counts.leaseUnits,
    },
    {
      title: "Pro-Rata Runs",
      description: "View saved pro-rata calculation runs.",
      href: "/pro-rata",
      count: data.counts.proRataRuns,
    },
  ];
</script>

<div class="space-y-6">
  <div>
    <span
      class="inline-flex rounded-full border border-orange-500/20 bg-orange-500/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-orange-300"
    >
      Master Data
    </span>

    <h1 class="mt-4 text-3xl font-bold tracking-tight text-white">
      Master Data Management
    </h1>

    <p class="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">
      These master data tables are the foundation for the BOMA Pro-Rata Share
      Engine. Buildings, units, tenants, leases, and dated unit assignments must
      be correct before running pro-rata calculations.
    </p>
  </div>

  <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
    {#each cards as card}
      <a
        href={card.href}
        class="rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:border-orange-500/30 hover:bg-white/[0.07]"
      >
        <div class="flex items-center justify-between gap-4">
          <h2 class="text-lg font-bold text-white">{card.title}</h2>
          <span
            class="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold text-orange-300"
          >
            {card.count}
          </span>
        </div>

        <p class="mt-3 text-sm leading-6 text-zinc-400">
          {card.description}
        </p>
      </a>
    {/each}
  </div>
</div>
