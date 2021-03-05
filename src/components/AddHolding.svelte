<script>
  import {writable} from 'svelte/store';
  import {wallet} from '../store.js';

  let formActive = writable(false);

  const activateForm = () => {
    formActive.set(true);
  }
  const cancelForm = () => {
    formActive.set(false);
  }
  const addCrypto = (event) => {
    //TODO: do validation
    let symbol = event.target.symbol.value;
    let amount = event.target.amount.value;
    console.log("symbol", event.target.symbol.value);
    console.log("amount", event.target.amount.value);
    // TODO: Add to wallet
    const walletHolding = {
      "symbol": symbol.toUpperCase(),
      "amountHeld": amount
    };
    console.log(walletHolding);
    let updatedWallet = $wallet;
    updatedWallet.push(walletHolding);
    console.log("new", updatedWallet);
    wallet.set(updatedWallet);
  }
</script>

{#if $formActive}
<form on:submit|preventDefault={addCrypto}>
  <label>Symbol
    <input id="symbol" name="symbol" type="text"/>
  </label>
  <label>Amount
    <input id="amount" name="amount" type="number" min=0 step=.000000001 />
  </label>
  <button type="submit">Add</button>
</form>
<button on:click={cancelForm}>Cancel</button>
{:else}
<button class="add-button" on:click={activateForm}>Add Holding</button>
{/if}

<style>
.add-button{
  background: none;
  border: 0;
  color: rgb(40, 151, 85);
  cursor: pointer;
  padding: 1em;
  display: block;
  margin: 0 auto;
  text-align: center;
  font-weight: bold;
  font-size: 1.1em;
}
.add-button:hover,
.add-button:focus{
  text-decoration: underline;
}
</style>