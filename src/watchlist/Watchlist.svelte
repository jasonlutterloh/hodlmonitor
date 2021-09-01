<script>
	import AddItem from "./AddItem.svelte";
	import {watchlist} from "./store";
	import ListItem from "../components/lists/ListItem.svelte";
	import {fly} from "svelte/transition";
	import {getDollarDisplayValue} from "../utils";
	import ListItemDetails from "../components/lists/ListItemDetails.svelte";

	let selectedId = "";

	const handleClick = (id) => {
		if (selectedId === id){
			selectedId = ""; 
		} else {
			selectedId = id;
		}
	};
</script>

<div in:fly="{{x:2000, delay:500}}" out:fly="{{x:2000, duration: 500}}">
	{#if $watchlist.length > 0}
	<ul>
		{#each $watchlist as item}
			<ListItem name={item.name} value={getDollarDisplayValue(item.currentPrice)} isSelected={selectedId === item.id} clickHandler={() => handleClick(item.id)}>
				<ListItemDetails details={item.details} />
			</ListItem>
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