<script>
  import HeaderButton from "./HeaderButton.svelte";
  import { snackbar } from "../../store";
  import {
    portfolioSymbols,
    updatePortfolioPrices,
  } from "../../portfolio/store";
  import {
    watchlistSymbols,
    updateWatchlistPrices,
  } from "../../watchlist/store";

  const refresh = () => {
    updatePortfolioPrices($portfolioSymbols);
    updateWatchlistPrices($watchlistSymbols);
  };
</script>

<HeaderButton on:click={refresh}>
  <span class="material-icons"> refresh </span>
</HeaderButton>
