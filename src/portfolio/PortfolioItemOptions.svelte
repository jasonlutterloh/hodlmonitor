<script>
  import {slide} from "svelte/transition";
  import {portfolio,isEditMode,selectedItem} from "../portfolio/store";
  import HeaderButton from "../components/buttons/HeaderButton.svelte";
  import { infoMessages } from "../store";

  export const removeCurrency = (currencyId) => {
    selectedItem.set({});

    portfolio.removeHolding(currencyId);
    infoMessages.addMessage("Crypto removed.")
  };
</script>

<!-- If ID exists, we're in edit mode. -->
{#if $selectedItem.id} 
<div class="bar" transition:slide>
  <div>
    <HeaderButton on:click={()=> selectedItem.set({})}>
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
    <HeaderButton on:click={() => removeCurrency($selectedItem.id)} >
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
    background: var(--top-bar-color);
    box-sizing: border-box;
    width: 100%;
    flex: 0 1 auto;
    display: flex;
    padding: 8px;
    position: fixed;
    top: 0;
    left: 0;
    box-shadow: 0 1px 4px var(--text-color);
  }
  .bar > div{
    flex: 0 1 auto;
  }
  .bar > div:nth-of-type(1){
    flex: 1 1 auto;
  }

@media(prefers-color-scheme: dark){
  .bar{
    box-shadow: 0 1px 4px #000000;
  }
}
</style>