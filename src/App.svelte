<script>
	import {nomicsData, displayData, totalValue, wallet, nomicsKey} from './store.js';
	import walletJson from './wallet.json';
	// import nomicsKey from "./nomicsKey.json";
	import { onMount } from "svelte";
	import TotalValue from './components/TotalValue.svelte';
	import AddHolding from './components/AddHolding.svelte';
	import Table from "./components/Table.svelte";
	import { writable } from 'svelte/store';
	import Header from './components/Header.svelte';
	import Setup from './components/Setup.svelte';
	// // Store wallet data
	// wallet.set(walletJson.wallet);

	// Get comma separated list of holdings
	const commaSeparatedHoldings = $wallet.map((holding)=> holding.symbol).toString();

	// Initialize Error
	const hasError = writable(false);

	// Call Nomics to get data
	onMount(async () => {
		fetch("https://api.nomics.com/v1/currencies/ticker?key="+$nomicsKey+"&ids="+commaSeparatedHoldings)
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
<Header />
<main>
	{#if $hasError}
		<p>Sorry, an error occurred.</p>
	{:else}
		<TotalValue />
		<Table displayData = {$displayData}/>
		<AddHolding />
		<Setup />
	{/if}
</main>
<footer>
	<a href="https://nomics.com" target="_blank">Crypto Market Cap &amp; Pricing Data Provided By Nomics</a>
</footer>
<style>
	main{
		padding-top: 4em;
	}
	p{
		display: block;
		margin: 0 auto;
		text-align: center;
	}
	a {
		display: block;
		margin: 20px auto 0;
		text-align: center;
		font-size: .8em;
		padding-bottom: .5em;
	}
	footer{
		position: absolute;
		bottom: 0;
		text-align: center;
		width: 100%;
	}
</style>