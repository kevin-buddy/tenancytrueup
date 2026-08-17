<script lang="ts">
  import type { PageData } from "./$types";

  let { data } = $props();

  let selectedLeaseId = "";
  let year = new Date().getFullYear();
  let loading = false;
  let message = "";

  async function run() {
    if (!selectedLeaseId) {
      message = "Select a lease first.";
      return;
    }

    loading = true;
    message = "";

    try {
      const response = await fetch("/reconciliations/run", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          leaseId: selectedLeaseId,
          year,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        message = result.message ?? "Failed to run reconciliation";
      } else {
        message = `Reconciliation created: ${result.reconciliation.id}`;
      }
    } catch (err) {
      message = err instanceof Error ? err.message : "Unknown error";
    } finally {
      loading = false;
    }
  }
</script>

<h1>Reconciliations</h1>

{#if message}
  <p>{message}</p>
{/if}

<div>
  <label>
    Lease
    <select bind:value={selectedLeaseId}>
      <option value="">Select a lease</option>
      {#each data.leases as lease}
        <option value={lease.id}>
          {lease.tenant_name}
        </option>
      {/each}
    </select>
  </label>
</div>

<div>
  <label>
    Year
    <input bind:value={year} type="number" min="2000" max="2100" />
  </label>
</div>

<button onclick={run} disabled={loading}>
  {loading ? "Running..." : "Run reconciliation"}
</button>

<h2>Existing reconciliations</h2>

<ul>
  {#each data.reconciliations as reconciliation}
    <li>
      Year: {reconciliation.year}
      — true-up: {reconciliation.true_up_amount}
      — status: {reconciliation.status}
      —
      <a href={`/reconciliations/${reconciliation.id}/pdf`} target="_blank">
        PDF
      </a>
    </li>
  {/each}
</ul>
