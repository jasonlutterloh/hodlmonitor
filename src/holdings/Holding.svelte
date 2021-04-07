<script>
  import {getDollarDisplayValue} from "./utils";
import {fly} from "svelte/transition";
import HoldingDetails from "./HoldingDetails.svelte";
import HoldingTopBar from "./HoldingTopBar.svelte";
import { selectedHolding } from "../applicationStateStore";

export let holding;

const handleKeyboard = (event) => {
    if(event.keyCode == 13) {
      event.target.click();
    }
  }

	const handleExpandCollapse = () => {
		if ($selectedHolding.id === holding.id){
			selectedHolding.set({});
		} else {
			selectedHolding.set(holding);
		}
	}
</script>

<li out:fly="{{x: -200}}">
  <div class="container" on:click={handleExpandCollapse} tabindex="0" on:keypress={handleKeyboard}>
    <div class="name-container">
      <h2>{holding.name}</h2>
    </div>
    {#if $selectedHolding.id != holding.id}
    <!-- Doing it this way to make the animation nice. Not ideal from a code perspective-->
    <div class="value-container" transition:fly="{{x: 200, duration: 500}}">
      <span>${getDollarDisplayValue(holding.value)}</span>
    </div>
    {/if}
    <span class="material-icons">
			{#if $selectedHolding.id === holding.id} 
				keyboard_arrow_up
			{:else}
				keyboard_arrow_down
			{/if}
			</span>
  </div>
  {#if $selectedHolding.id === holding.id}
		<HoldingDetails holding={holding}/>
  {/if}
</li>

<style>
  h2{
		font-size: 1.2em;
    font-weight: normal;
    margin: 0;
	}
  li{
		transition: all .5s;
		border-bottom: thin solid var(--border-color);
	}
	.container{
		display: flex;
		align-items: center;
		flex: 0 1 auto;
		padding: 1em .8em 1em 1.4em;
		cursor: pointer;
		outline: 0;
	}
	.name-container{
		flex: 1 1 auto;
		text-align: left;
	}
	.value-container{
		margin-right: 1em;
		text-align: center;
	}
	.top-bar{
		background: var(--text-color);
		color: var(--alt-text-color);
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
	}
	@media(prefers-color-scheme: dark){
		.value-container{
			color: var(--primary-color);
		}
	}
	
</style>