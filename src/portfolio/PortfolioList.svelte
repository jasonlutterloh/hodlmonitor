<script>
	import PortfolioItem from "./PortfolioItem.svelte";
	import {displayData, lastUpdated} from "./store";
</script>

{#if $displayData.length > 0}
<ul>
  {#each $displayData as item}
	<PortfolioItem item={item} />
  {/each}
</ul>
<p class="last-updated">Last Updated: {$lastUpdated}</p>
{:else}
<p class="instruction">Tap the <span class="material-icons">add</span> button above to add a cryptocurrency to your portfolio.</p>
{/if}

<style>
  ul{
		background: var(--secondary-body-color);
		border-collapse: collapse;
		text-align: left;
		margin: 0 auto;
		padding: 0;
		list-style: none;
	}
	.last-updated{
		font-size: .8em;
		color: var(--text-color);
		text-align: center;
	}

	.instruction{
		text-align: center;
		margin: 4em 2em;
	}
	.material-icons{
		vertical-align: text-bottom;
	}
</style>