<script>
  import HeaderButton from "./HeaderButton.svelte";
  import {infoMessages } from "../../store";
  import {portfolioSymbols, updatePortfolioPrices} from "../../portfolio/store";
	import {watchlistSymbols, updateWatchlistPrices} from "../../watchlist/store";

  const refresh = () => {
    if ($portfolioSymbols.length > 0) {
			updatePortfolioPrices($portfolioSymbols);
	  }
		if ($watchlistSymbols.length > 0) {
			updateWatchlistPrices($watchlistSymbols);
		}
    infoMessages.addMessage("Prices refreshing.")
  };
</script>

<HeaderButton on:click={refresh}>
  <span class="material-icons">
    refresh
  </span>
</HeaderButton>