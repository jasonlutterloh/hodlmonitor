<script>
  import {getDollarDisplayValue} from "./utils";
import {fly} from "svelte/transition";
import HoldingDetails from "./HoldingDetails.svelte";
import ExpandCollapseButton from "../components/buttons/ExpandCollapseButton.svelte";

export let holding;
</script>

<li out:fly="{{x: -200}}">
  <div class="container">
    <div class="name-container">
      <h2>{holding.name}</h2>
    </div>
    {#if !holding.isActive}
    <!-- Doing it this way to make the animation nice. Not ideal from a code perspective-->
    <div class="value-container" transition:fly="{{x: 200, duration: 500}}">
      <span>${getDollarDisplayValue(holding.value)}</span>
    </div>
    {/if}
    <ExpandCollapseButton bind:trigger={holding.isActive} />
  </div>
  {#if holding.isActive}
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
		padding: 1em 1.4em;
		transition: all .5s;
		border-bottom: thin solid var(--border-color);
	}
	.container{
		display: flex;
		align-items: center;
		flex: 0 1 auto;
	}
	.name-container{
		flex: 1 1 auto;
		text-align: left;
	}
	.value-container{
		margin-right: 1em;
		text-align: center;
	}
	
</style>