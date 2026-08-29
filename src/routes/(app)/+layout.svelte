<script lang="ts">
  let { children } = $props();
</script>

<div class="min-h-screen bg-zinc-950 text-zinc-100">
  <header
    class="sticky top-0 z-30 border-b border-white/10 bg-zinc-950/80 backdrop-blur"
  >
    <div
      class="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4"
    >
      <a
        href="/dashboard"
        class="inline-flex items-center gap-2 font-extrabold tracking-tight"
      >
        <span
          class="h-3.5 w-3.5 rounded bg-gradient-to-r from-orange-500 to-amber-400"
        ></span>
        TenancyTrueup
      </a>

      <nav
        class="hidden items-center gap-5 text-sm font-semibold text-zinc-300 lg:flex"
      >
        <a href="/dashboard" class="transition hover:text-white">Dashboard</a>
        <a href="/master-data" class="transition hover:text-white"
          >Master Data</a
        >
        <a href="/master-data/buildings" class="transition hover:text-white"
          >Buildings</a
        >
        <a href="/master-data/units" class="transition hover:text-white"
          >Units</a
        >
        <a href="/master-data/tenants" class="transition hover:text-white"
          >Tenants</a
        >
        <a href="/master-data/leases" class="transition hover:text-white"
          >Leases</a
        >
        <a href="/master-data/unit-leases" class="transition hover:text-white"
          >Unit Leases</a
        >
        <a href="/pro-rata" class="transition hover:text-white"
          >Pro-Rata Engine</a
        >
      </nav>

      <form method="POST" action="/logout">
        <button
          type="submit"
          class="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-bold text-white transition hover:bg-white/10"
        >
          Logout
        </button>
      </form>
    </div>
  </header>

  <main class="mx-auto w-full max-w-7xl px-4 py-8">
    {@render children?.()}
  </main>
</div>
