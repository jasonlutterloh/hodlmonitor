<script>
  import HeroSection from "../components/HeroSection.svelte";
	import AddItem from "./actions/AddItem.svelte";
	import EditItem from "./actions/EditItem.svelte";
	import {fly} from "svelte/transition";
	import ListItem from "../components/lists/ListItem.svelte";
	import ListItemDetails from "../components/lists/ListItemDetails.svelte";
	import Bar from "../components/Bar.svelte";
	import HeaderButton from "../components/buttons/HeaderButton.svelte";
	import {totalValue, displayData, lastUpdated, portfolio, selectedItem, isEditMode} from "../portfolio/store.js";
	import {infoMessages} from "../store";
  import {getDollarDisplayValue} from "../utils.js";

let screenWidth;

const removeItem = () => {
    portfolio.removeItem($selectedItem.id);
    selectedItem.set({});
    infoMessages.addMessage("Crypto removed.");
  };

const handleClick = (item) => {
    if ($selectedItem.id === item.id) {
      selectedItem.set({});
    } else {
      selectedItem.set(item);
    }
  };
</script>

<svelte:window bind:innerWidth={screenWidth} />

<div in:fly="{{x: screenWidth*(-1), delay: 500}}" out:fly="{{x: screenWidth*(-1), duration: 500}}">
	<HeroSection title="Total Value" value={getDollarDisplayValue($totalValue)} />
	{#if $displayData.length > 0}
	<ul>
		{#each $displayData as item}
		<ListItem
			name={item.name}
			value={getDollarDisplayValue(item.value)}
			isSelected={$selectedItem.id === item.id}
			clickHandler={() => handleClick(item)}
		>
			<ListItemDetails details={item.details} />
		</ListItem>
		{/each}
	</ul>
	<p class="last-updated">Last Updated: {$lastUpdated}</p>
	{:else}
	<p class="instruction">Tap the <span class="material-icons">add</span> button above to add a cryptocurrency to your portfolio.</p>
	{/if}
	{#if $selectedItem.id}
		<Bar closeCallback = {() => selectedItem.set({})}>
			<HeaderButton on:click={() => isEditMode.set(true)} >
				<span class="material-icons">
					edit
				</span>
			</HeaderButton>
			<HeaderButton on:click={() => removeItem()} >
				<span class="material-icons">
					delete
				</span>
			</HeaderButton>
		</Bar>
	{/if}
	<AddItem />
	<EditItem />
</div>

<style>
	  ul{
		background: var(--secondary-body-color);
		border-collapse: collapse;
		text-align: left;
		margin: 0 auto;
		padding: 0;
		list-style: none;
	}
	.last-updated{
		font-size: .8em;
		color: var(--text-color);
		text-align: center;
	}

	.instruction{
		text-align: center;
		margin: 4em 2em;
	}
	.material-icons{
		vertical-align: text-bottom;
	}
</style>