<script>
  import { writable } from 'svelte/store';

  export let onCancel;
  export let holdingToAdd;
  
  let results = writable([]);
  let searchText = writable("");
  let noResultsError = writable(false);
  let searchError = writable(false);

  async function getAsset() {
    reset();
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    fetch("https://api.coincap.io/v2/assets?search="+$searchText, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log("Search Results", result);
        if (result.data && result.data.length > 0){
          results.set(result.data);
        } else {
          noResultsError.set(true);
        }
      })
      .catch(error => {
        console.log('Error with Search', error);
        searchError.set(true);
      });  
  }
  function storeHoldingToAdd(result) {
    console.log("Updating holdingToAdd", result);
    holdingToAdd.set(result);
  }
  function cancel(){
    reset();
    onCancel();
  }
  function reset() {
    noResultsError.set(false);
    searchError.set(false);
  }
</script>

<form on:submit|preventDefault={getAsset}>
  <div class="add-holding-input-container">
    <div>
      <label class="add-holding-label" for="cryptoSearch">Cryptocurrency Name or Symbol</label>
      <input required class="add-holding-input" placeholder="BTC" type="text" name="cryptoSearch" bind:value={$searchText}/>
    </div>
  </div>
  <div class="button-container">
    <button class="form-button" type="submit">Search</button>
    <button class="form-button" type="button" on:click={cancel}>Cancel</button>
  </div>
</form>
<div>
  {#if $noResultsError}
    <p>Could not find currency or currency not supported.</p>
  {:else if $searchError}
    <p>Sorry, an error occurred. Please try again.</p>
  {:else}
    <ul>
    {#each $results as result}
      <li>{result.symbol} - {result.name}
        <button on:click={() => storeHoldingToAdd(result)}>Add</button>
      </li>
    {/each}
    </ul>
  {/if}
</div>

<style>
ul{
  list-style: none;
    padding: 0;
    margin: 0 auto;
    max-width: 600px;
}
li {
  padding: 1em;
    border: 1px solid;
    margin-bottom: .4em;
}
li > button {
  float: right;
}
p{
  text-align: center;
  margin: 1em;
}
</style>