<script>
  import {fly} from "svelte/transition";
  import {writable} from "svelte/store";
  import {portfolio } from "../store.js";
  import SearchForm from "../../components/forms/SearchForm.svelte";
  import AmountForm from "../../components/forms/AmountForm.svelte";
  import Overlay from "../../components/Overlay.svelte";
  import ResultsList from "../../components/forms/ResultsList.svelte";
  import HeaderButton from "../../components/buttons/HeaderButton.svelte";

  const hasError = writable(false);
  const step = writable(1);
  const isExpanded = writable(false);
  let results = writable([]);
  let itemToAdd = writable("");
  let amountToAdd = writable(0);
  let y;

  const reset = () => {
    isExpanded.set(false);
    hasError.set(false);
    itemToAdd.set("");
    amountToAdd.set(0);
    step.set(1);
  };

  isExpanded.subscribe(value => {
    if (value === true) {
      y = 0;
    }
  });

  results.subscribe((value) => {
    if (value.length !== 0) {
      step.set(2);
    }
  });
  itemToAdd.subscribe((value) => {
    if (value != "") {
      step.set(3);
    }
  });

  amountToAdd.subscribe((value) =>{
    if (value > 0) {
      hasError.set(false);

      try {
        portfolio.addHolding($itemToAdd, value);
        reset();
      } catch (e) {
        hasError.set(true);
      }
    }
  });

</script>

<svelte:window bind:scrollY={y}/>

<HeaderButton on:click={() => isExpanded.set(true)} >
  <span class="material-icons">
    add
  </span>
</HeaderButton>
{#if $isExpanded}
<Overlay title="Add Holding" onClose={reset}>
  {#if $step == 1}
    <div out:fly="{{x: -200, duration: 500}}">
      <SearchForm bind:results />
    </div>
  {:else if $step == 2}  
    <div in:fly="{{x: 200, duration: 500, delay: 500}}" out:fly="{{x: -200, duration: 500}}">
      <ResultsList bind:results bind:itemToAdd />
    </div> 
  {:else if $step == 3}
    <div in:fly="{{x: 200, duration: 500, delay: 500}}" out:fly="{{x: -200, duration: 500}}">
      <AmountForm bind:amountToAdd={amountToAdd} currencyName={$itemToAdd.name} />
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