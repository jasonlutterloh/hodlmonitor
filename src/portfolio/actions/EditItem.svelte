<script>
  import {writable} from "svelte/store";
  import {portfolio } from "../store.js";

  import {selectedItem} from "../store";
  import Overlay from "../../components/Overlay.svelte";
  import NumberInput from "../../components/forms/NumberInput.svelte";
  import ButtonContainer from "../../components/buttons/ButtonContainer.svelte";
  import FormButton from "../../components/buttons/FormButton.svelte";
  import HeaderButton from "../../components/buttons/HeaderButton.svelte";


  let y;
  const isExpanded = writable(false);
  const hasError = writable(false);
  
  isExpanded.subscribe(value => {
    if (value == true) {
      y = 0;
    }
  });
  const submit = (event) => {
    const newAmount = parseFloat(event.target.amount.value);
    portfolio.updateAmount($selectedItem.id, newAmount);
    reset();
  };

  const reset = () => {
    isExpanded.set(false);
    hasError.set(false);
  };

</script>

<svelte:window bind:scrollY={y}/>

<HeaderButton on:click={() => isExpanded.set(true)}>
  <span class="material-icons"> edit </span>
</HeaderButton>
{#if $isExpanded}
<Overlay title="Edit Holding" onClose={reset}>
  <div>
    <form on:submit|preventDefault={submit}>
      <NumberInput name="amount" value={$selectedItem.amountHeld}>What amount of {$selectedItem.name} do you hold?</NumberInput>
    
      <ButtonContainer>
        <FormButton type="submit">Edit</FormButton>
        <FormButton type="button" on:click={reset}>Cancel</FormButton>
      </ButtonContainer>
    </form>
  </div>
</Overlay>
{/if}

<style>
  form{
    padding: 1em;
  }
</style>