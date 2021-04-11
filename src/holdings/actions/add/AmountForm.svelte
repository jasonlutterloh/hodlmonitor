<script>
  import NumberInput from "../../../components/forms/NumberInput.svelte";
  import ButtonContainer from "../../../components/buttons/ButtonContainer.svelte";
  import FormButton from "../../../components/buttons/FormButton.svelte";

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