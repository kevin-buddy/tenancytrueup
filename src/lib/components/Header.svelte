<script lang="ts">
  // Accept activeTab as a bindable prop from the parent (+page.svelte)
  let { activeTab = $bindable() } = $props();
</script>

<nav
  class="fixed w-full z-50 transition-all duration-300 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm"
  id="navbar"
>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between items-center h-20">
      <!-- Logo -->
      <div class="flex-shrink-0 flex items-center gap-2 cursor-pointer">
        <div
          class="w-8 h-8 rounded bg-brand-500 flex items-center justify-center shadow-md"
        >
          <svg
            class="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            ><path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
            ></path></svg
          >
        </div>
        <span class="text-xl font-bold text-gray-900 tracking-tight"
          >Tenancy<span class="text-brand-500">Trueup</span></span
        >
      </div>

      <!-- Internal App Navigation -->
      <div
        class="hidden md:flex items-center space-x-2 bg-gray-100/50 p-1 rounded-lg border border-gray-200"
      >
        <button
          class="px-4 py-2 text-sm font-semibold rounded-md transition-all {activeTab ===
          'engine'
            ? 'text-brand-700 bg-white shadow-sm border border-brand-200'
            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 border border-transparent'}"
          onclick={() => (activeTab = "engine")}>1. Engine Data</button
        >
        <button
          class="px-4 py-2 text-sm font-semibold rounded-md transition-all {activeTab ===
          'rules'
            ? 'text-brand-700 bg-white shadow-sm border border-brand-200'
            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 border border-transparent'}"
          onclick={() => (activeTab = "rules")}>2. Lease Rules</button
        >
        <button
          class="px-4 py-2 text-sm font-semibold rounded-md transition-all {activeTab ===
          'trueup'
            ? 'text-brand-700 bg-white shadow-sm border border-brand-200'
            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 border border-transparent'}"
          onclick={() => (activeTab = "trueup")}>3. True-Up Statements</button
        >
      </div>
    </div>
  </div>
</nav>
