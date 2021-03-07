<script>
	import {wallet} from '../store';
	import {getDollarDisplayValue} from './utils';
	import { fly } from 'svelte/transition';
	import EditHolding from './edit/EditHolding.svelte';
  export let displayData;

	export const editHolding = (currencyId) => {
		//TODO:
		console.log("Editing holding amount");
	}
	export const removeCurrency = (currencyId) => {
		wallet.set($wallet.filter(holding => holding.id !== currencyId));
	}
</script>
<table>
  <thead>
    <tr>
      <th>Currency</th>
      <th>Price</th>
      <th>Amount</th>
      <th>Value</th>
			<th>Actions</th>
    </tr>
  </thead>
  <tbody>
  {#each displayData as holding}
    <tr out:fly="{{x:-200, duration: 500}}">
      <td>{holding.name}</td>
      <td>${getDollarDisplayValue(holding.price)}</td>
      <td>{holding.amountHeld}</td>
      <td>${getDollarDisplayValue(holding.value)}</td>
			<td>
				<EditHolding holding={holding} />
				<button type="text" on:click={() => removeCurrency(holding.id)}>Delete</button>
			</td>
    </tr>
  {/each}
  </tbody>
</table>

<style>
  table{
		background: white;
		border-collapse: collapse;
		text-align: left;
		margin: 0 auto;
		box-shadow: 0 0 30px 10px #ccc;
	}
	thead{
		background:#666;
		color: white;
		font-weight: bold;
	}
	thead tr{
		border-radius: 100px 100px 0 0;
	}
	td,th{
		padding: 1em 1.4em;
	}
	tr{
		transition: all .5s
	}
	tbody tr:not(:last-of-type){
		border-bottom: thin solid #ccc;
	}
	tbody tr:hover{
		background: rgb(40, 151, 85);
		color: #fff;
		font-weight: bold;
  }
  tbody td:first-of-type{
    padding-right: 0;
  }
	tbody td:nth-of-type(2){
		font-weight: bold;
	}
</style>