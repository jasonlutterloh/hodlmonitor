<script>
	import {wallet, commaSeparatedHoldings, cryptoList} from "./store.js";
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
			getPrices($commaSeparatedHoldings);
	  }

		//TODO: Make this more efficient. Only get if we haven't retrieved in awhile.
		const list = await getCryptoList();
		cryptoList.set(list);
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