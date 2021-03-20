<script>
	import Holding from "./Holding.svelte";

	export let displayData;

	// Initialize all as collapsed
	displayData.forEach((element) => {
	  element.isActive = false;
	});
</script>

<ul>
  {#each displayData as holding}
	<Holding holding={holding} />
  {/each}
</ul>

<style>
  ul{
		background: white;
		border-collapse: collapse;
		text-align: left;
		margin: 0 auto;
		padding: 0;
		list-style: none;
	}
</style>