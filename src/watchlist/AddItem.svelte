<script>
  import {fly} from "svelte/transition";
  import {writable} from "svelte/store";
  import {cryptoList, infoMessages} from "../store.js";
  import {watchlist, isAddMode} from "./store.js";
  import SearchForm from "../components/forms/SearchForm.svelte";
  import Overlay from "../components/Overlay.svelte";
  import ResultsList from "../components/forms/ResultsList.svelte";
import { onMount } from "svelte";

  const hasError = writable(false);
  const step = writable(1);

  let results = writable([]);
  let itemToAdd = writable("");
  let y;

  const reset = () => {
    isAddMode.set(false);
    hasError.set(false);
    itemToAdd.set("");
    step.set(1);
  };

  isAddMode.subscribe(value => {
    console.log(value);
      if (value === true){
        y = 0;
      }
  });

  results.subscribe((value) => {
    if (value.length !== 0) {
      step.set(2);
    }
  })
  itemToAdd.subscribe((value) => {
    if (value != "") {
      console.log(value);
      hasError.set(false);

      const doesExist = $watchlist.some((item) => item.id === $itemToAdd.id);

      if (!doesExist && $itemToAdd != null) {
        watchlist.addItem(value);
        reset();
      } else {
        hasError.set(true);
      }
    }
  });
</script>

<svelte:window bind:scrollY={y}/>

{#if $isAddMode}
<Overlay title="Add Crypto" onClose={reset}>
  {#if $step == 1}
    <div out:fly="{{x: -200, duration: 500}}">
      <SearchForm bind:results />
    </div>
  {:else if $step == 2}  
    <div in:fly="{{x: 200, duration: 500, delay: 500}}" out:fly="{{x: -200, duration: 500}}">
      <ResultsList bind:results bind:itemToAdd />
    </div> 
  {/if}
  {#if $hasError}
    <p>Error: Currency already added.</p>
  {/if}
</Overlay>
{/if}
<style>
p{
  text-align: center;
}
</style>