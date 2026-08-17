<script lang="ts">
  import type { PageData } from "./$types";

  let { data, form } = $props();
</script>

<h1>Buildings</h1>

{#if form?.error}
  <p style="color: red">{form.error}</p>
{/if}

<form method="POST" action="?/create">
  <div>
    <label>
      Building name
      <input name="name" required />
    </label>
  </div>

  <div>
    <label>
      Total denominator area
      <input
        name="rentableArea"
        type="number"
        step="0.0001"
        min="0.0001"
        required
      />
    </label>
  </div>

  <div>
    <label>
      Occupancy percent
      <input
        name="occupancyPercent"
        type="number"
        step="0.01"
        min="0"
        max="100"
        value="100"
        required
      />
    </label>
  </div>

  <div>
    <label>
      Gross-up percent
      <input
        name="grossUpPercent"
        type="number"
        step="0.01"
        min="0"
        max="100"
        value="95"
        required
      />
    </label>
  </div>

  <button type="submit">Create building</button>
</form>

<h2>Existing buildings</h2>

<ul>
  {#each data.buildings as building}
    <li>
      {building.name}
      — denominator area: {building.rentable_area}
      — occupancy: {building.occupancy_percent}% — gross-up: {building.gross_up_percent}%
    </li>
  {/each}
</ul>
