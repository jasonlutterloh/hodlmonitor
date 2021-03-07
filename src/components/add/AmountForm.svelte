<script>
  export let amountToAdd;
  export let onCancel;
  export let currencyName;

  function submit(event) {
    let amount = event.target.amount.value;
    console.log(amount);
    amountToAdd.set(amount);
  }
  function cancel() {
    onCancel();
  }
</script>

<form on:submit|preventDefault={submit}>
  <div class="add-holding-input-container">
    <div>
      <label class="add-holding-label" for="amount">What amount of {currencyName} do you hold?</label>
      <input required class="add-holding-input" id="amount" name="amount" type="number" min=0 step=.000000001 placeholder="10" />
    </div>
  </div>
  <div class="button-container">
    <button class="form-button" type="submit">Add</button>
    <button class="form-button" type="button" on:click={cancel}>Cancel</button>
  </div>
</form>

<style>

</style>