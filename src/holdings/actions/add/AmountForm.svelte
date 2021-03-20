<script>
  import NumberInput from "../../../components/forms/NumberInput.svelte";
  import ButtonContainer from "../../../components/buttons/ButtonContainer.svelte";
  import FormButton from "../../../components/buttons/FormButton.svelte";

  export let amountToAdd;
  export let onCancel;
  export let currencyName;

  function submit(event) {
    const amount = event.target.amount.value;
    console.log(amount);
    amountToAdd.set(amount);
  }
  function cancel() {
    onCancel();
  }
</script>

<form on:submit|preventDefault={submit}>
  <NumberInput name="amount">What amount of {currencyName} do you hold?</NumberInput>
  <ButtonContainer>
    <FormButton type="submit">Add</FormButton>
    <FormButton type="button" on:click={cancel}>Cancel</FormButton>
  </ButtonContainer>
</form>