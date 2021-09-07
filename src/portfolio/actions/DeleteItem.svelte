<script>
  import HeaderButton from "../../components/buttons/HeaderButton.svelte";
  import { selectedItem, portfolio } from "../store";
  import { snackbar } from "../../store";

  const removeItem = () => {
    portfolio.removeItem($selectedItem.id);
    selectedItem.set({});
    snackbar.addMessage("Crypto removed.");
  };
</script>

<HeaderButton on:click={() => removeItem()}>
  <span class="material-icons"> delete </span>
</HeaderButton>
