<script>
  import NumberInput from "./NumberInput.svelte";
  import ButtonContainer from "../buttons/ButtonContainer.svelte";
  import FormButton from "../buttons/FormButton.svelte";

  export let amountToAdd;
  export let currencyName;

  function submit(event) {
    const amount = event.target.amount.value;
    amountToAdd.set(parseFloat(amount));
  }
</script>

<form on:submit|preventDefault={submit}>
  <NumberInput name="amount">What amount of {currencyName} do you hold?</NumberInput>
  <ButtonContainer>
    <FormButton type="submit">Add</FormButton>
  </ButtonContainer>
</form>

<style>
  form{
    padding: 1em;
    box-sizing: border-box;
  }
</style>