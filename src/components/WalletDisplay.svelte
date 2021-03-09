<script>
	import {wallet} from '../store';
	import {getDollarDisplayValue} from './utils';
	import { fly, slide } from 'svelte/transition';
	import EditHolding from './edit/EditHolding.svelte';

  export let displayData;

	export const editHolding = (currencyId) => {
		//TODO:
		console.log("Editing holding amount");
	}
	export const removeCurrency = (currencyId) => {
		wallet.set($wallet.filter(holding => holding.id !== currencyId));
	}

	// Initialize all as collapsed
	displayData.forEach(element => {
		element.isActive = false;
	});
</script>
<!-- <table>
  <thead>
    <tr>
      <th>Currency</th>
      <th>Price</th>
      <th>Amount</th>
      <th>Value</th>
			<th>Actions</th>
    </tr>
  </thead>
  <tbody> -->
		<ul>
  {#each displayData as holding}
	<li>
		<div class="collapsed-container">
			<div class="name-container">
				<h2>{holding.name}</h2>
			</div>
			{#if !holding.isActive}
			<!-- Doing it this way to make the animation nice. Not ideal from a code perspective-->
			<div class="value-container" in:fly="{{x: 200, duration: 500, delay: 500}}" out:fly="{{x: 200, duration: 500}}">
				<span class="data-label">Current Value</span>
				<span>${getDollarDisplayValue(holding.value)}</span>
			</div>
			{/if}
			<button class="expand-button" type="button" on:click={()=> holding.isActive = !holding.isActive}>
				<span class="material-icons">
					{#if holding.isActive} 
						keyboard_arrow_up
					{:else}
						keyboard_arrow_down
					{/if}
					</span>
			</button>
		</div>
		{#if holding.isActive}
		<div transition:slide class="expanded-container">
			<div class="data-container">
				<div>
					<span class="data-label">Quantity</span>
					<span>{holding.amountHeld}</span>
				</div>
				<div>
					<span class="data-label">Current Price</span>
					<span>${getDollarDisplayValue(holding.price)}</span>
				</div>
				<div>
					<span class="data-label">Current Value</span>
					<span>${getDollarDisplayValue(holding.value)}</span>
				</div>
			</div>
			<div class="actions-container">
				<span class="data-label">Actions</span>
				<EditHolding holding={holding} />
				<button class="delete-button" type="text" on:click={() => removeCurrency(holding.id)}>
					<span class="material-icons">
					delete
					</span>
				</button>
			</div>
		</div>
		{/if}
		
		
	</li>
  {/each}
</ul>

<style>
	h2{
		font-size: 1.2em;
    font-weight: normal;
    margin: 0;
	}
  ul{
		background: white;
		border-collapse: collapse;
		text-align: left;
		margin: 0 auto;
		padding: 0;
		list-style: none;
		box-shadow: 0 0 30px 10px #ccc;
	}
	li{
		padding: 1em 1.4em;
		transition: all .5s;
	}
	li:not(:last-of-type){
		border-bottom: thin solid #ccc;
	}
	li > div{
		display: flex;
		align-items: center;
	}
	.collapsed-container{
		flex: 0 1 auto;
	}
	.name-container{
		flex: 1 1 auto;
		text-align: left;
	}
	.value-container{
		margin-right: 2em;
		text-align: center;
	}
	.expanded-container{
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		align-items: center;
		text-align: center;
	}
	.data-container,
	.actions-container{
		flex: 1 0 100%;
	}
	.data-container{
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		text-align: center;
	}
	.data-container span{
		display: block;
		margin: 1em 1em 0 1em;
	}
	.data-container span:last-of-type{
		font-size: 1.4em;
		margin: 0 1em 1em 1em;
	}
	.data-container{
		display: flex;
	}
	.data-container > div{
		flex: 1 1 auto;
	}
	.data-label{
		color: #666;
		display: block;
		text-transform: uppercase;
		font-size: .6em;
	}
	.expand-button{
		background: none;
    border: 0;
	}
	.expand-button span{
		color: #222;
	}
	.delete-button{
  background: none;
  border: 0;
  color: #222;
}
.delete-button:hover,
.delete-button:focus{
  background: #efefef;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>