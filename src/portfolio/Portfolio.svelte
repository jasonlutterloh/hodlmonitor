<script>
  import TotalValue from "../holdings/TotalValue.svelte";
	import AddHolding from "../holdings/actions/add/AddHolding.svelte";
	import EditHolding from "../holdings/actions/edit/EditHolding.svelte";
	import HoldingsList from "../holdings/HoldingsList.svelte";
  import HoldingTopBar from "../holdings/HoldingTopBar.svelte";
</script>

<TotalValue  />
<HoldingsList/>
<AddHolding />
<EditHolding />
<HoldingTopBar />