<script>
  import TotalValue from "../holdings/TotalValue.svelte";
	import AddHolding from "../holdings/actions/add/AddHolding.svelte";
	import EditHolding from "../holdings/actions/edit/EditHolding.svelte";
	import HoldingsList from "../holdings/HoldingsList.svelte";
  import HoldingTopBar from "../holdings/HoldingTopBar.svelte";
	import {fly} from "svelte/transition";
</script>

<div in:fly="{{x:-2000, delay: 500}}" out:fly="{{x:-2000, duration: 500}}">
<TotalValue  />
<HoldingsList/>
<AddHolding />
<EditHolding />
<HoldingTopBar />
</div>