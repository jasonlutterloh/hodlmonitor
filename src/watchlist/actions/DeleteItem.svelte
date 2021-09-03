<script>
  import HeaderButton from "../../components/buttons/HeaderButton.svelte";
  import { selectedId, watchlist } from "../store";
  import { snackbar } from "../../store";

  const removeItem = () => {
    watchlist.removeItem($selectedId);
    selectedId.set(null);
    snackbar.addMessage("Crypto removed.");
  };
</script>

<HeaderButton on:click={() => removeItem()}>
  <span class="material-icons"> delete </span>
</HeaderButton>
