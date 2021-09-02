<script>
	import {activePane, cryptoList, infoMessages} from "./store.js";
	import {portfolioSymbols, updatePortfolioPrices} from "./portfolio/store";
	import {watchlistSymbols, updateWatchlistPrices} from "./watchlist/store";
	import Header from "./Header.svelte";
	import Footer from "./Footer.svelte";
	import Sidebar from "./components/Sidebar.svelte";
	import InfoMessages from "./components/InfoMessages.svelte";
	import Settings from "./settings/Settings.svelte";
	import Tabs from "./Tabs.svelte";
	import {onMount} from "svelte";

	let isSidebarOpen = false;
	
	onMount(async () => {
	  if ($portfolioSymbols.length > 0) {
	    setInterval(()=>updatePortfolioPrices($portfolioSymbols), 60000);
	  }
	  if ($watchlistSymbols.length > 0) {
	    setInterval(()=>updateWatchlistPrices($watchlistSymbols), 60000);
	  }

  fetch("https://api.coingecko.com/api/v3/coins/list?include_platform=false").then(result => {
    return result.json();
  })
      .then(data => cryptoList.set(data))
      .catch(error => {
        infoMessages.addMessage("Error fetching available cryptocurrencies.");
        console.error("Error getting crypto list", error);
      });
	});
</script>

<Header bind:isSidebarOpen/>
<main>
	<Sidebar bind:isSidebarOpen >
		<Settings />
	</Sidebar>
	<Tabs />
	<svelte:component this={$activePane.component} />
	<InfoMessages />
</main>
<Footer />

<style>
	main{
		padding-bottom: 4em;
	}
</style>