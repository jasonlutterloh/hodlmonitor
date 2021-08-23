<script>
	import AddItem from "./AddItem.svelte";
import {watchlist} from "./store";
import WatchlistItem from "./WatchlistItem.svelte";

</script>

<ul>
  {#each $watchlist as listItem}
	<WatchlistItem name={listItem.name} currentPrice={listItem.currentPrice} />
  {/each}
</ul>
<AddItem />

<style>
  ul{
		background: var(--secondary-body-color);
		border-collapse: collapse;
		text-align: left;
		margin: 0 auto;
		padding: 0;
		list-style: none;
	}
</style>