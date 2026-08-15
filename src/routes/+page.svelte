<script lang="ts">
  import Header from "$lib/components/Header.svelte";
  import ProRataEngine from "$lib/components/ProRataEngine.svelte";
  import RuleBuilder from "$lib/components/RuleBuilder.svelte";
  import TrueUpStatements from "$lib/components/TrueUpStatements.svelte";

  // Define the state here. It defaults to 'engine'
  let activeTab = $state("engine");
</script>

<Header bind:activeTab />

<main class="flex-grow pt-28 pb-12 bg-hero-pattern relative z-10 min-h-screen">
  <!-- Background Gradient overlay -->
  <div
    class="absolute inset-0 bg-gradient-to-b from-white/60 to-gray-50/90 pointer-events-none -z-10"
  ></div>

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {#if activeTab === "engine"}
      <ProRataEngine />
    {:else if activeTab === "rules"}
      <RuleBuilder />
    {:else if activeTab === "trueup"}
      <TrueUpStatements />
    {/if}
  </div>
</main>
