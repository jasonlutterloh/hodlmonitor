<script>
	import Holding from "./Holding.svelte";
	import {displayData} from "../store";

</script>

<ul>
  {#each $displayData as holding}
	<Holding holding={holding} />
  {/each}
</ul>

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