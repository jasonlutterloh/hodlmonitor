<script>
  import {writable} from "svelte/store";

  export let onCancel;
  export let holdingToAdd;
  
  const results = writable([]);
  const searchText = writable("");
  const noResultsError = writable(false);
  const searchError = writable(false);

  async function getAsset() {
    reset();
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    fetch("https://api.coincap.io/v2/assets?search="+$searchText, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log("Search Results", result);
          if (result.data && result.data.length > 0) {
            results.set(result.data);
          } else {
            noResultsError.set(true);
          }
        })
        .catch((error) => {
          console.log("Error with Search", error);
          searchError.set(true);
        });
  }
  function storeHoldingToAdd(result) {
    console.log("Updating holdingToAdd", result);
    holdingToAdd.set(result);
  }
  function cancel() {
    reset();
    onCancel();
  }
  function reset() {
    noResultsError.set(false);
    searchError.set(false);
  }
</script>

<form on:submit|preventDefault={getAsset}>
  <div class="form-input-container">
    <div>
      <label class="form-label" for="cryptoSearch">Cryptocurrency Name or Symbol</label>
      <input required class="form-input" placeholder="BTC" type="text" name="cryptoSearch" bind:value={$searchText}/>
    </div>
  </div>
  <div class="button-container">
    <button class="form-button" type="submit">Search</button>
    <button class="form-button" type="button" on:click={cancel}>Cancel</button>
  </div>
</form>
<div class="results">
  {#if $noResultsError}
    <p>Could not find currency or currency not supported.</p>
  {:else if $searchError}
    <p>Sorry, an error occurred. Please try again.</p>
  {:else}
    <ul>
    {#each $results as result}
      <li role="button" on:click={() => storeHoldingToAdd(result)}>{result.symbol} - {result.name}
        <span class="material-icons">add</span>
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
  cursor: pointer;
  padding: 1em;
  border: 1px solid;
  margin-bottom: .4em;
  transition: .5s all;
}
li:hover,
li:focus{
  background: white;
  color: rgb(40, 151, 85);
}
li:active{
  transform: scale(.95)
}
li > span{
  float: right;
}
p{
  text-align: center;
  margin: 1em;
}
.results{
  margin: 0 1em;
}
</style>