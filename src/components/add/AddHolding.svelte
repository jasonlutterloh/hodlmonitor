<script>
  import {fly} from "svelte/transition";
  import {writable} from "svelte/store";
  import {wallet} from "../../store.js";
import SearchForm from "./SearchForm.svelte";
  import AmountForm from "./AmountForm.svelte";
  import Overlay from "../Overlay.svelte";
  import AddButton from "./AddButton.svelte";

  const formActive = writable(false);
  const hasError = writable(false);
  const step = writable(1);

  let holdingToAdd = writable("");
  let amountToAdd = writable(0);

  const cancelForm = () => {
    reset();
  };
  const reset = () => {
    formActive.set(false);
    hasError.set(false);
    holdingToAdd.set("");
    amountToAdd.set(0);
    step.set(1);
  };

  holdingToAdd.subscribe((value) => {
    if (value != "") {
      step.set(2);
    }
  });

  amountToAdd.subscribe((value) =>{
    if (value > 0) {
      hasError.set(false);

      const doesExist = $wallet.some((holding) => holding.id === $holdingToAdd.id);

      if (!doesExist && $holdingToAdd != null) {
        const walletHolding = {
          "id": $holdingToAdd.id,
          "name": $holdingToAdd.name,
          "symbol": $holdingToAdd.symbol,
          "priceUsd": $holdingToAdd.priceUsd,
          "amountHeld": value,
        };

        const updatedWallet = $wallet;
        updatedWallet.push(walletHolding);
        wallet.set(updatedWallet);
        reset();
      } else {
        hasError.set(true);
      }
    }
  });
</script>

<AddButton onClick={() => formActive.set(true)} />

<Overlay trigger={formActive} title="Add Holding">
  {#if $step == 1}
    <div in:fly="{{x: 200, duration: 500}}" out:fly="{{x: -200, duration: 500}}">
      <SearchForm onCancel={cancelForm} bind:holdingToAdd={holdingToAdd} />
    </div>
  {:else if $step == 2}
    <div in:fly="{{x: 200, duration: 500, delay: 500}}" out:fly="{{x: -200, duration: 500}}">
      <AmountForm onCancel={cancelForm} bind:amountToAdd={amountToAdd} currencyName={$holdingToAdd.name} />
    </div>
  {/if}
  {#if $hasError}
    <p>Error: Currency already added.</p>
  {/if}
</Overlay>
<style>
p{
  text-align: center;
}
</style>