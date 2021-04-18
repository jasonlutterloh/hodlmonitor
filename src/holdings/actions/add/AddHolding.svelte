<script>
  import {fly} from "svelte/transition";
  import {writable} from "svelte/store";
  import {wallet, cryptoList} from "../../../store.js";
  import {isAddMode} from "../../../applicationStateStore.js";
  import SearchForm from "./SearchForm.svelte";
  import AmountForm from "./AmountForm.svelte";
  import Overlay from "../../../components/Overlay.svelte";
  import ResultsList from "./ResultsList.svelte";
import { onMount } from "svelte";
import {infoMessages} from "../../../applicationStateStore";

  const hasError = writable(false);
  const step = writable(1);

  let results = writable([]);
  let holdingToAdd = writable("");
  let amountToAdd = writable(0);
  let y;

  const reset = () => {
    isAddMode.set(false);
    hasError.set(false);
    holdingToAdd.set("");
    amountToAdd.set(0);
    step.set(1);
  };

  isAddMode.subscribe(value => {
      if (value === true){
        y = 0;
      }
  });

  results.subscribe((value) => {
    if (value.length !== 0) {
      step.set(2);
    }
  })
  holdingToAdd.subscribe((value) => {
    if (value != "") {
      step.set(3);
    }
  });

  amountToAdd.subscribe((value) =>{
    if (value > 0) {
      hasError.set(false);

      const doesExist = $wallet.some((holding) => holding.id === $holdingToAdd.id);

      if (!doesExist && $holdingToAdd != null) {
        wallet.addHolding($holdingToAdd, value);
        reset();
      } else {
        hasError.set(true);
      }
    }
  });

  onMount(async () => {
    fetch("https://api.coingecko.com/api/v3/coins/list?include_platform=false").then(result => {
        return result.json();
      })
      .then(data => cryptoList.set(data))
      .catch(error => {
        infoMessages.addMessage("Error fetching available cryptocurrencies.");
        console.error("Error getting crypto list", error);
      });
  });
</script>

<svelte:window bind:scrollY={y}/>

{#if $isAddMode}
<Overlay title="Add Holding" onClose={reset}>
  {#if $step == 1}
    <div out:fly="{{x: -200, duration: 500}}">
      <SearchForm bind:results />
    </div>
  {:else if $step == 2}  
    <div in:fly="{{x: 200, duration: 500, delay: 500}}" out:fly="{{x: -200, duration: 500}}">
      <ResultsList bind:results bind:holdingToAdd />
    </div> 
  {:else if $step == 3}
    <div in:fly="{{x: 200, duration: 500, delay: 500}}" out:fly="{{x: -200, duration: 500}}">
      <AmountForm bind:amountToAdd={amountToAdd} currencyName={$holdingToAdd.name} />
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