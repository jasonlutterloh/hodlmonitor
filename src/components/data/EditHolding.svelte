<script>
  import {fly} from "svelte/transition";
  import {writable} from "svelte/store";
  import {wallet} from "../../store.js";
  import Overlay from "../Overlay.svelte";
  import EditButton from "./buttons/EditButton.svelte";

  export let holding;

  const formActive = writable(false);
  const hasError = writable(false);

  const submit = (event) => {
    const newAmount = event.target.amount.value;
    const modifiedWallet = $wallet;
    modifiedWallet.forEach((walletHolding) => {
      if (walletHolding.id === holding.id) {
        walletHolding.amountHeld = newAmount;
      }
    });
    wallet.set(modifiedWallet);
    reset();
  };
  const cancel = () => {
    reset();
  };
  const reset = () => {
    formActive.set(false);
    hasError.set(false);
  };

</script>

<EditButton onClick={() => formActive.set(true)} />

<Overlay trigger={formActive} title="Edit Holding">
  <div in:fly="{{x: 200, duration: 500}}" out:fly="{{x: -200, duration: 500}}">
    <form on:submit|preventDefault={submit}>
      <div class="form-input-container">
        <div>
          <label class="form-label" for="amount">What amount of {holding.name} do you hold?</label>
          <input required class="form-input" id="amount" name="amount" type="number" min=.000000001 step=.000000001 placeholder="10" value={holding.amountHeld}/>
        </div>
      </div>
      <div class="button-container">
        <button class="form-button" type="submit">Save</button>
        <button class="form-button" type="button" on:click={cancel}>Cancel</button>
      </div>
    </form>
  </div>
</Overlay>