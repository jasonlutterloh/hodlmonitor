<script>
	import {activePane, cryptoList, snackbar} from "./store.js";
	import {portfolioSymbols, updatePortfolioPrices} from "./portfolio/store";
	import {watchlistSymbols, updateWatchlistPrices} from "./watchlist/store";
	import Portfolio from "./portfolio/Portfolio.svelte";
	import Watchlist from "./watchlist/Watchlist.svelte";
	import Header from "./Header.svelte";
	import Footer from "./Footer.svelte";
	import Snackbar from "./components/Snackbar.svelte";
	import Tabs from "./Tabs.svelte";
	import {onMount} from "svelte";
	
	onMount(async () => {
		let interval = setInterval(()=> {
			updatePortfolioPrices($portfolioSymbols);
			updateWatchlistPrices($watchlistSymbols);
		}, 60000);
	  
		fetch("https://api.coingecko.com/api/v3/coins/list?include_platform=false").then(result => {
			return result.json();
		})
      .then(data => cryptoList.set(data))
      .catch(error => {
        snackbar.addMessage("Error fetching available cryptocurrencies.");
        console.error("Error getting list of available cryptocurrencies", error);
      });

		return () => {clearInterval(interval)};
	});
</script>

<Header />
<main>
	<Tabs />
	{#if $activePane.id === "watchlist"}
	<Watchlist />
	{:else if $activePane.id === "portfolio"} 
		<Portfolio />
	{/if}
	<Snackbar />
</main>
<Footer />

<style>
	main{
		padding-bottom: 4em;
	}
</style>