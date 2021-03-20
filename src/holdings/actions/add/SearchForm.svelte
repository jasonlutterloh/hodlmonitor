<script>
  import {writable} from "svelte/store";
  import TextInput from "../../../components/forms/TextInput.svelte";
  import ButtonContainer from "../../../components/buttons/ButtonContainer.svelte";
  import FormButton from "../../../components/buttons/FormButton.svelte";
  import {searchCurrency} from "../../../external/coincap";

  export let onCancel;
  export let holdingToAdd;
  
  const results = writable([]);
  const noResultsError = writable(false);
  const searchError = writable(false);

  async function getAsset(event) {
    const searchText = event.target.search.value;

    reset();
    try {
      const currency = await searchCurrency(searchText);
  
      if (currency && currency.length > 0) {
        results.set(currency);
      } else {
        noResultsError.set(true);
      }
    } catch (error) {
      console.log("Error with Search", error);
      searchError.set(true);
    }
  }
  function storeHoldingToAdd(result) {
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
  <TextInput name="search" placeholder="i.e. BTC, Bitcoin">Cryptocurrency Name or Symbol</TextInput>
  <ButtonContainer>
    <FormButton type="submit">Add</FormButton>
    <FormButton type="button" on:click={cancel}>Cancel</FormButton>
  </ButtonContainer>
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
  border: 3px solid;
  background: var(--primary-color);
  color: var(--alt-text-color);
  margin-bottom: .4em;
  transition: .5s all;
}
li:hover,
li:focus{
  background: var(--alt-text-color);
  color: var(--primary-color);
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