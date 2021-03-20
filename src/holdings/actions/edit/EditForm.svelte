<script>
  import NumberInput from "../../../components/forms/NumberInput.svelte";
  import ButtonContainer from "../../../components/buttons/ButtonContainer.svelte";
  import FormButton from "../../../components/buttons/FormButton.svelte";

  export let onSubmit;
  export let holding;
  export let onCancel;
</script>

<form on:submit|preventDefault={onSubmit}>
  <NumberInput name="amount" value={holding.amountHeld}>What amount of {holding.name} do you hold?</NumberInput>

  <ButtonContainer>
    <FormButton type="submit">Edit</FormButton>
    <FormButton type="button" on:click={onCancel}>Cancel</FormButton>
  </ButtonContainer>
</form>

<style>

</style>