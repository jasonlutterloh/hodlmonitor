<script>
  import {fade} from "svelte/transition";
  import {wallet} from "../store";
  import HeaderButton from "../components/buttons/HeaderButton.svelte";
  import { isEditMode, selectedHolding } from "../applicationStateStore";

  export const removeCurrency = (currencyId) => {
    selectedHolding.set({});
    console.log(currencyId);
    console.log($wallet);
    wallet.set($wallet.filter((holding) => holding.id !== currencyId));

    console.log($wallet);
  };
</script>

<!-- If ID exists, we're in edit mode. -->
{#if $selectedHolding.id} 
<div class="bar" transition:fade>
  <div>
    <HeaderButton on:click={()=> selectedHolding.set({})}>
      <span class="material-icons">
        close
      </span>
    </HeaderButton>
  </div>
  <div>
    <HeaderButton on:click={() => isEditMode.set(true)} >
      <span class="material-icons">
        edit
      </span>
    </HeaderButton>
    <HeaderButton on:click={() => removeCurrency($selectedHolding.id)} >
      <span class="material-icons">
        delete
      </span>
    </HeaderButton>
  </div>
</div>
{/if}

<style>
  .bar{
    color: var(--alt-text-color);
    background: var(--primary-color);
    box-sizing: border-box;
    width: 100%;
    flex: 0 1 auto;
    display: flex;
    padding: 8px;
    position: absolute;
    top: 0;
    left: 0;
  }
  .bar > div{
    flex: 0 1 auto;
  }
  .bar > div:nth-of-type(1){
    flex: 1 1 auto;
  }

@media(prefers-color-scheme: dark){
  .bar{
    background-color: var(--body-color);
  }
}
</style>