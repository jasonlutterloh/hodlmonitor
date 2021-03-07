<script>
  import { fly } from 'svelte/transition';
  import {writable} from 'svelte/store';
  import { wallet } from '../../store.js';
  import Overlay from '../Overlay.svelte';

  export let holding;

  let formActive = writable(false);
  let hasError = writable(false);

  const submit = (event) => {
    let newAmount = event.target.amount.value;
    let modifiedWallet = $wallet;
    modifiedWallet.forEach(walletHolding => {
      if (walletHolding.id === holding.id){

        walletHolding.amountHeld = newAmount;
      }
    });
    wallet.set(modifiedWallet);
    reset();
  }
  const cancel = () => {
    reset();
  }
  const reset = () => {
    formActive.set(false);
    hasError.set(false);
  }

</script>

<button class="edit-button" on:click={() => formActive.set(true)}>Edit</button>

<Overlay trigger={formActive}>
  <h2>Edit Holding</h2>

  <div in:fly="{{x:200, duration: 500}}" out:fly="{{x:-200, duration: 500}}">
    <form on:submit|preventDefault={submit}>
      <div class="add-holding-input-container">
        <div>
          <label class="add-holding-label" for="amount">What amount of {holding.name} do you hold?</label>
          <input required class="add-holding-input" id="amount" name="amount" type="number" min=.000000001 step=.000000001 placeholder="10" value={holding.amountHeld}/>
        </div>
      </div>
      <div class="button-container">
        <button class="form-button" type="submit">Save</button>
        <button class="form-button" type="button" on:click={cancel}>Cancel</button>
      </div>
    </form>
  </div>
</Overlay>

<style>
h2{
  font-size: 1.2em;
  margin: 1em;
}
</style>