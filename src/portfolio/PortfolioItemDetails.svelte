<script>
  import {slide} from "svelte/transition";
  import ListItemDetail from "../components/lists/ListItemDetail.svelte";

  export let details;
</script>

<div transition:slide class="container">
  <div class="details">
    {#each Object.keys(details) as detailKey}
      <ListItemDetail name={detailKey} value={details[detailKey]} />
    {/each}
  </div>
</div>

<style>
  .container{
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		align-items: center;
		text-align: center;
    margin-top: 1em;
	}
	.details{
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		text-align: center;
    flex: 1 0 100%;
	}
</style>