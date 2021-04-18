<script>
import { infoMessages } from "../applicationStateStore";

import HeaderButton from "../components/buttons/HeaderButton.svelte";
import { commaSeparatedHoldings, updatePrices } from "../store";

  const refresh = () => {
    updatePrices($commaSeparatedHoldings);
    infoMessages.addMessage("Prices refreshing.")
  };
</script>

<HeaderButton on:click={refresh}>
  <span class="material-icons">
    refresh
  </span>
</HeaderButton>