<script>
	import {activePane, cryptoList, infoMessages} from "./store.js";
	import {portfolioSymbols, updatePortfolioPrices} from "./portfolio/store";
	import {watchlistSymbols, updateWatchlistPrices} from "./watchlist/store";
	import Portfolio from "./portfolio/Portfolio.svelte";
	import Watchlist from "./watchlist/Watchlist.svelte";
	import Header from "./Header.svelte";
	import Footer from "./Footer.svelte";
	import InfoMessages from "./components/InfoMessages.svelte";
	import Tabs from "./Tabs.svelte";
	import {onMount} from "svelte";
	
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

<Header />
<main>
	<Tabs />
	<Portfolio isHidden = {!($activePane.id === "portfolio")} />
	<Watchlist isHidden = {!($activePane.id === "watchlist")} />
	<InfoMessages />
</main>
<Footer />

<style>
	main{
		padding-bottom: 4em;
	}
</style>