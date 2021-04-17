<script>
	import Holding from "./Holding.svelte";
	import {displayData, lastUpdated} from "../store";

</script>

<ul>
  {#each $displayData as holding}
	<Holding holding={holding} />
  {/each}
</ul>
<p>Last Updated: {$lastUpdated}</p>

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
		font-size: .8em;
		color: var(--text-color);
		text-align: center;
	}
</style>