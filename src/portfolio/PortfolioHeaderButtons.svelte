<script>
  import HeaderButton from "../components/buttons/HeaderButton.svelte";
  import {isAddMode} from "./store";
</script>
<HeaderButton on:click={() => isAddMode.set(true)} >
  <span class="material-icons">
    add
  </span>
</HeaderButton>