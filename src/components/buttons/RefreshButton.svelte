<script>
  import HeaderButton from "./HeaderButton.svelte";
  import {infoMessages } from "../../store";
  import {portfolioSymbols, updatePortfolioPrices, portfolio} from "../../portfolio/store";
	import {watchlistSymbols, updateWatchlistPrices, watchlist} from "../../watchlist/store";

  const refresh = () => {
    if ($portfolio.length > 0) {
			setInterval(()=>updatePortfolioPrices($portfolioSymbols), 60000);
	  }
		if ($watchlist.length > 0) {
			setInterval(()=>updateWatchlistPrices($watchlistSymbols), 60000);
		}
    infoMessages.addMessage("Prices refreshing.")
  };
</script>

<HeaderButton on:click={refresh}>
  <span class="material-icons">
    refresh
  </span>
</HeaderButton>