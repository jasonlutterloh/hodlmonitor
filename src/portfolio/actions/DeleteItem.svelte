<script>
  import HeaderButton from "../../components/buttons/HeaderButton.svelte";
  import { selectedItem, portfolio } from "../store";
  import { infoMessages } from "../../store";

  const removeItem = () => {
    portfolio.removeItem($selectedItem.id);
    selectedItem.set({});
    infoMessages.addMessage("Crypto removed.");
  };
</script>

<HeaderButton on:click={() => removeItem()}>
  <span class="material-icons"> delete </span>
</HeaderButton>
