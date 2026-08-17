<script lang="ts">
  let { form }: { form: any } = $props();
</script>

<svelte:head>
  <title>Login | TenancyTrueup</title>
</svelte:head>

<div class="relative min-h-screen overflow-hidden bg-zinc-950 text-zinc-100">
  <!-- Orange decorative background -->
  <div
    class="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-orange-500/25 blur-3xl"
  ></div>
  <div
    class="pointer-events-none absolute -right-24 top-32 h-72 w-72 rounded-full bg-amber-400/15 blur-3xl"
  ></div>

  <div class="relative z-10 flex min-h-screen items-center justify-center p-6">
    <div
      class="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur"
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

      <h1 class="mt-6 text-3xl font-bold tracking-tight text-white">
        Welcome back
      </h1>

      <p class="mt-2 text-sm text-zinc-400">
        Log in to continue to your dashboard.
      </p>

      {#if form?.error}
        <div
          class="mt-6 rounded-2xl border border-orange-500/25 bg-orange-500/10 px-4 py-3 text-sm text-orange-100"
        >
          {form.error}
        </div>
      {/if}

      <form method="POST" class="mt-6 space-y-5">
        <label class="block">
          <span class="mb-2 block text-sm font-semibold text-zinc-400">
            Username
          </span>

          <input
            name="username"
            value={form?.username ?? ""}
            autocomplete="username"
            required
            class="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-zinc-500 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-500/15"
          />
        </label>

        <label class="block">
          <span class="mb-2 block text-sm font-semibold text-zinc-400">
            Password
          </span>

          <input
            type="password"
            name="password"
            autocomplete="current-password"
            required
            class="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-500/15"
          />
        </label>

        <label
          class="flex items-center gap-3 text-sm font-semibold text-zinc-200"
        >
          <input
            type="checkbox"
            name="rememberMe"
            checked={form?.rememberMe ?? false}
            class="h-4 w-4 rounded border-white/20 bg-white/5 accent-orange-500"
          />

          Remember me
        </label>

        <button
          type="submit"
          class="w-full rounded-2xl bg-gradient-to-r from-orange-500 via-orange-400 to-amber-400 px-4 py-3 text-base font-bold text-zinc-950 shadow-lg shadow-orange-500/20 transition hover:opacity-95"
        >
          Log in
        </button>
      </form>

      <p class="mt-6 text-sm text-zinc-400">
        Don&apos;t have an account?
        <a
          href="/register"
          class="font-bold text-orange-300 transition hover:text-orange-200"
        >
          Register
        </a>
      </p>
    </div>
  </div>
</div>
