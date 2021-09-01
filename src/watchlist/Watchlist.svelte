<script>
  import AddItem from "./actions/AddItem.svelte";
  import { watchlist, displayData } from "./store";
  import ListItem from "../components/lists/ListItem.svelte";
  import { fly } from "svelte/transition";
  import { getDollarDisplayValue } from "../utils";
  import ListItemDetails from "../components/lists/ListItemDetails.svelte";
  import Bar from "../components/Bar.svelte";
  import HeaderButton from "../components/buttons/HeaderButton.svelte";
	import {infoMessages} from "../store";

  let selectedId;
  let screenWidth;

  const removeItem = () => {
    watchlist.removeItem(selectedId);
    selectedId = null;
		infoMessages.addMessage("Crypto removed.")
  };
  const handleClick = (id) => {
    if (selectedId === id) {
      selectedId = null;
    } else {
      selectedId = id;
    }
  };
</script>

<svelte:window bind:innerWidth={screenWidth} />

<div
  in:fly={{ x: screenWidth, delay: 500 }}
  out:fly={{ x: screenWidth, duration: 500 }}
>
  {#if $displayData.length > 0}
    <ul>
      {#each $displayData as item}
        <ListItem
          name={item.name}
          value={getDollarDisplayValue(item.currentPrice)}
          isSelected={selectedId === item.id}
          clickHandler={() => handleClick(item.id)}
        >
          <ListItemDetails details={item.details} />
        </ListItem>
      {/each}
    </ul>
  {:else}
    <p>
      Tap the <span class="material-icons">add</span> button above to add a cryptocurrency
      to your watchlist.
    </p>
  {/if}
</div>
{#if selectedId}
  <Bar closeCallback={() => (selectedId = null)}>
    <HeaderButton on:click={() => removeItem()}>
      <span class="material-icons"> delete </span>
    </HeaderButton>
  </Bar>
{/if}
<AddItem />

<style>
  ul {
    background: var(--secondary-body-color);
    border-collapse: collapse;
    text-align: left;
    margin: 0 auto;
    padding: 0;
    list-style: none;
  }
  p {
    text-align: center;
    margin: 4em 2em;
  }
  .material-icons {
    vertical-align: text-bottom;
  }
</style>
