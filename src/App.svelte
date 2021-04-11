<script>
	import {wallet, commaSeparatedHoldings, cryptoList, updatePrices} from "./store.js";
	import TotalValue from "./holdings/TotalValue.svelte";
	import AddHolding from "./holdings/actions/add/AddHolding.svelte";
	import EditHolding from "./holdings/actions/edit/EditHolding.svelte";
	import HoldingsList from "./holdings/HoldingsList.svelte";
	import HoldingTopBar from "./holdings/HoldingTopBar.svelte";
	import Header from "./Header.svelte";
	import Footer from "./Footer.svelte";
	import Sidebar from "./components/Sidebar.svelte";
	import Settings from "./settings/Settings.svelte";
	import {onMount} from "svelte";

	let isSidebarOpen = false;

	onMount(async () => {
	  if ($wallet.length > 0) {
			updatePrices($commaSeparatedHoldings);
	  }

		//TODO: Make this more efficient. Only get if we haven't retrieved in awhile.
		fetch("https://api.coingecko.com/api/v3/coins/list?include_platform=false").then(result => {
			return result.json();
		})
		.then(data => cryptoList.set(data))
		.catch(error => {
			console.error("Error getting prices", error);
		});
		
	});
</script>

<Header bind:isSidebarOpen/>
<main>
	<Sidebar bind:isSidebarOpen >
		<Settings />
	</Sidebar>
	<TotalValue  />
	<HoldingsList/>
	<!-- These are not shown by default -->
	<HoldingTopBar />
	<AddHolding />
	<EditHolding />
</main>
<Footer />

<style>
	main{
		padding-bottom: 4em;
	}
</style>