<script>
  import {writable} from "svelte/store";
  import {portfolio, isEditMode } from "../store.js";

  import {selectedItem} from "../store";
  import Overlay from "../../components/Overlay.svelte";
  import NumberInput from "../../components/forms/NumberInput.svelte";
  import ButtonContainer from "../../components/buttons/ButtonContainer.svelte";
  import FormButton from "../../components/buttons/FormButton.svelte";

  let y;

  const hasError = writable(false);
  isEditMode.subscribe(value => {
    if (value == true){
      y = 0;
    }
  });
  const submit = (event) => {
    const newAmount = parseFloat(event.target.amount.value);
    portfolio.updateAmount($selectedItem.id, newAmount);
    reset();
  };

  const reset = () => {
    isEditMode.set(false);
    hasError.set(false);
  };

</script>

<svelte:window bind:scrollY={y}/>

{#if $isEditMode}
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