<script>
	import AddItem from "./AddItem.svelte";
import {watchlist} from "./store";
import WatchlistItem from "./WatchlistItem.svelte";
import {fly} from "svelte/transition";

</script>

<div in:fly="{{x:2000, delay:500}}" out:fly="{{x:2000, duration: 500}}">
	{#if $watchlist.length > 0}
	<ul>
		{#each $watchlist as listItem}
		<WatchlistItem name={listItem.name} currentPrice={listItem.currentPrice} />
		{/each}
	</ul>
	{:else}
		<p>Tap the <span class="material-icons">add</span> button above to add a cryptocurrency to your watchlist.</p>
	{/if}
</div>
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
	p{
		text-align: center;
		margin: 4em 2em;
	}
	.material-icons{
		vertical-align: text-bottom;
	}
</style>