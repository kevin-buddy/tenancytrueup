<script lang="ts">
  let { data }: { data: any } = $props();
</script>

<svelte:head>
  <title>Dashboard | TenancyTrueup</title>
</svelte:head>

<div class="relative min-h-screen overflow-hidden bg-zinc-950 text-zinc-100">
  <!-- Orange decorative background -->
  <div
    class="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-orange-500/20 blur-3xl"
  ></div>
  <div
    class="pointer-events-none absolute -right-24 top-32 h-72 w-72 rounded-full bg-amber-400/10 blur-3xl"
  ></div>

  <header
    class="sticky top-0 z-20 border-b border-white/10 bg-zinc-950/80 backdrop-blur"
  >
    <div
      class="mx-auto flex h-[74px] w-full max-w-6xl items-center justify-between px-4"
    >
      <a
        href="/"
        class="inline-flex items-center gap-2 text-lg font-extrabold tracking-tight text-white"
      >
        <span
          class="h-3.5 w-3.5 rounded bg-gradient-to-r from-orange-500 to-amber-400 shadow-[0_0_0_5px_rgba(249,115,22,0.15)]"
        ></span>
        TenancyTrueup
      </a>

      <form method="POST" action="?/logout">
        <button
          type="submit"
          class="rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-white/10"
        >
          Log out
        </button>
      </form>
    </div>
  </header>

  <main class="relative z-10 mx-auto w-full max-w-6xl px-4 pb-16 pt-14">
    <div
      class="max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur"
    >
      <span
        class="inline-flex rounded-full border border-orange-500/20 bg-orange-500/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-orange-300"
      >
        Dashboard
      </span>

      <h1 class="mt-5 text-4xl font-bold tracking-tight text-white">
        Welcome, {data.user.username}
      </h1>

      <p class="mt-4 leading-7 text-zinc-400">
        You are logged in. This is the protected dashboard area. Later, this
        page can show buildings, leases, expenses, reconciliations, and true-up
        statements.
      </p>

      <div class="mt-8 flex flex-wrap gap-3">
        <a
          href="/buildings"
          class="rounded-2xl bg-gradient-to-r from-orange-500 via-orange-400 to-amber-400 px-5 py-3 text-sm font-bold text-zinc-950 shadow-lg shadow-orange-500/20 transition hover:opacity-95"
        >
          Go to Buildings
        </a>

        <a
          href="/reconciliations"
          class="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10"
        >
          Go to Reconciliations
        </a>
      </div>
    </div>

    <div class="mt-8 grid gap-4 md:grid-cols-3">
      <div class="rounded-3xl border border-white/10 bg-white/5 p-6">
        <h2
          class="text-sm font-bold uppercase tracking-[0.12em] text-orange-300"
        >
          CAM Engine
        </h2>

        <p class="mt-3 text-sm leading-6 text-zinc-400">
          Run reconciliation calculations for leases using expense pools,
          gross-ups, caps, exclusions, and pro-rata logic.
        </p>
      </div>

      <div class="rounded-3xl border border-white/10 bg-white/5 p-6">
        <h2
          class="text-sm font-bold uppercase tracking-[0.12em] text-orange-300"
        >
          Tenant Statements
        </h2>

        <p class="mt-3 text-sm leading-6 text-zinc-400">
          Generate auditor-ready true-up statements after reconciliation runs
          are completed and verified.
        </p>
      </div>

      <div class="rounded-3xl border border-white/10 bg-white/5 p-6">
        <h2
          class="text-sm font-bold uppercase tracking-[0.12em] text-orange-300"
        >
          Audit Trail
        </h2>

        <p class="mt-3 text-sm leading-6 text-zinc-400">
          Every reconciliation snapshot stores line-item results for review,
          approval, and tenant support.
        </p>
      </div>
    </div>
  </main>
</div>
