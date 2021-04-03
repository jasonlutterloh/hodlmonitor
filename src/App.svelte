<script>
	import {wallet, displayData, commaSeparatedHoldings} from "./store.js";
	import TotalValue from "./holdings/TotalValue.svelte";
	import AddHolding from "./holdings/actions/add/AddHolding.svelte";
	import HoldingsList from "./holdings/HoldingsList.svelte";
	import Header from "./Header.svelte";
	import Footer from "./Footer.svelte";
	import Sidebar from "./Sidebar.svelte";
	import Settings from "./settings/Settings.svelte";
	import {onMount} from "svelte";

	let isSidebarOpen = false;

	// Keep prices upated using CoinCap websocket
	onMount(async () => {
	  if ($wallet.length > 0) {
	    const prices = new WebSocket("wss://ws.coincap.io/prices?assets=" + $commaSeparatedHoldings);
	    prices.onmessage = function(msg) {
				console.log(msg);
	      const priceData = JSON.parse(msg.data);
				console.log(priceData);
	      for (const currencyId in priceData) {
	        if (priceData.hasOwnProperty(currencyId)) {
	          const price = priceData[currencyId];
	          const modifiedWallet = $wallet;
	          modifiedWallet.forEach((walletHolding) => {
	            if (walletHolding.id === currencyId) {
	              walletHolding.priceUsd = price;
	            }
	          });
	          wallet.set(modifiedWallet);
	        }
	      }
	    };
	  }
	});
</script>

<Header bind:isSidebarOpen/>
<Sidebar bind:isSidebarOpen >
	<Settings />
</Sidebar>
<main>
	<TotalValue  />
	<HoldingsList  displayData = {$displayData}/>
	<AddHolding />
	
</main>
<Footer />

<style>
	main{
		padding-bottom: 4em;
	}
</style>