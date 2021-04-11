<script>
  import {writable} from "svelte/store";
  import TextInput from "../../../components/forms/TextInput.svelte";
  import ButtonContainer from "../../../components/buttons/ButtonContainer.svelte";
  import FormButton from "../../../components/buttons/FormButton.svelte";
  import {cryptoList} from "../../../store";

  export let results;
  
  const noResultsError = writable(false);
  const searchError = writable(false);

  export const filterCrypto = (searchTerm) => {
    let filteredList = $cryptoList.filter(crypto => {
      if (crypto.symbol.toUpperCase() == searchTerm.toUpperCase() || crypto.name.toUpperCase() == searchTerm.toUpperCase()){
        return true;
      }
    });
    return filteredList;
  };

  async function getAsset(event) {
    const searchText = event.target.search.value;

    reset();
    try {
      const currency = await filterCrypto(searchText);
  
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

  function reset() {
    noResultsError.set(false);
    searchError.set(false);
  }
</script>

<form on:submit|preventDefault={getAsset}>
  <TextInput name="search" placeholder="i.e. BTC, Bitcoin">Cryptocurrency Name or Symbol</TextInput>
  <ButtonContainer>
    <FormButton type="submit">Search</FormButton>
  </ButtonContainer>
</form>
<div class="results">
  {#if $noResultsError}
    <p>Could not find currency or currency not supported.</p>
  {:else if $searchError}
    <p>Sorry, an error occurred. Please try again.</p>
  {/if}
</div>

<style>

  form{
    padding: 1em;
    box-sizing: border-box;
  }

p{
  text-align: center;
  margin: 1em;
}
div{
  margin: 0 1em;
}

</style>