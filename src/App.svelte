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
	import InfoMessages from "./components/InfoMessages.svelte";
	import Settings from "./settings/Settings.svelte";
	import {onMount} from "svelte";

	let isSidebarOpen = false;

	onMount(async () => {
	  if ($wallet.length > 0) {
			setInterval(()=>updatePrices($commaSeparatedHoldings), 60000);
	  }
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
	<InfoMessages />
</main>
<Footer />

<style>
	main{
		padding-bottom: 4em;
	}
</style>