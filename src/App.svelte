<script>
	import {nomicsData, displayData, totalValue, wallet} from './store.js';
	import walletJson from './wallet.json';
	import nomicsKey from "./nomicsKey.json";
	import { onMount } from "svelte";
	import Table from "./components/Table.svelte";
	import { writable } from 'svelte/store';

	// Store wallet data
	wallet.set(walletJson.wallet);

	// Get comma separated list of holdings
	const commaSeparatedHoldings = $wallet.map((holding)=> holding.symbol).toString();

	// Get nomics API key
	const key = nomicsKey.key;

	// Initialize Error
	const hasError = writable(false);

	// Call Nomics to get data
	onMount(async () => {
		fetch("https://api.nomics.com/v1/currencies/ticker?key="+key+"&ids="+commaSeparatedHoldings)
		.then(response => response.json())
		.then(data => {
      nomicsData.set(data);
    }).catch(error => {
			console.log(error);
			hasError.set(true);
      return [];
    });
	});
</script>

<main>
	{#if $hasError}
		<p>Sorry, an error occurred.</p>
	{:else}
		<Table displayData = {$displayData} totalValue = {$totalValue} />
	{/if}
</main>

<style>
	main{
		padding-top: 5em;
	}
	p{
		display: block;
		margin: 0 auto;
		text-align: center;
	}
</style>