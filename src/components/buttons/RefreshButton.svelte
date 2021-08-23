<script>
import HeaderButton from "./HeaderButton.svelte";
import { commaSeparatedSymbols, updatePrices, infoMessages } from "../../store";

  const refresh = () => {
    updatePrices($commaSeparatedSymbols);
    infoMessages.addMessage("Prices refreshing.")
  };
</script>

<HeaderButton on:click={refresh}>
  <span class="material-icons">
    refresh
  </span>
</HeaderButton>