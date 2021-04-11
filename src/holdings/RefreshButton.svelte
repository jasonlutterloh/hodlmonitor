<script>
import HeaderButton from "../components/buttons/HeaderButton.svelte";
import { commaSeparatedHoldings, updatePrices } from "../store";

  const refresh = () => updatePrices($commaSeparatedHoldings);
</script>

<HeaderButton on:click={refresh}>
  <span class="material-icons">
    refresh
  </span>
</HeaderButton>