<script>
  import {slide} from "svelte/transition";
  import ListItemDetail from "./ListItemDetail.svelte";

  export let details = [];
</script>

<div transition:slide class="container">
  <div class="details">
    {#each details as detail}
      <ListItemDetail name={detail.name} value={detail.value} textColor={detail.color}/>
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