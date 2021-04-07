<script>
  import {getDollarDisplayValue} from "./utils";
  import {slide} from "svelte/transition";
  import HoldingDetail from "./HoldingDetail.svelte";

  export let holding;
</script>

<div transition:slide class="container">
  <div class="details">
      <HoldingDetail name="Portfolio Percentage" value="{holding.percentage}%" />
      <HoldingDetail name="Quantity" value={holding.amountHeld} />
      <HoldingDetail name="Current Price" value="${getDollarDisplayValue(holding.price)}" />
      <HoldingDetail name="Current Value" value="${getDollarDisplayValue(holding.value)}" />
  </div>
</div>

<style>
  .container{
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		align-items: center;
		text-align: center;
    margin-top: 1em;
	}
	.details{
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		text-align: center;
    flex: 1 0 100%;
	}
</style>