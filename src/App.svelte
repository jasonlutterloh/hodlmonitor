<script>
	import {wallet, commaSeparatedHoldings} from "./store.js";
	import TotalValue from "./holdings/TotalValue.svelte";
	import AddHolding from "./holdings/actions/add/AddHolding.svelte";
	import EditHolding from "./holdings/actions/edit/EditHolding.svelte";
	import HoldingsList from "./holdings/HoldingsList.svelte";
	import HoldingTopBar from "./holdings/HoldingTopBar.svelte";
	import Header from "./Header.svelte";
	import Footer from "./Footer.svelte";
	import Sidebar from "./Sidebar.svelte";
	import Settings from "./settings/Settings.svelte";
	import {onMount} from "svelte";

	let isSidebarOpen = false;
	let prices;

	const getPrices = (commaSeparatedHoldings) => {
		prices = new WebSocket("wss://ws.coincap.io/prices?assets=" + commaSeparatedHoldings);
		prices.onmessage = function(msg) {
			console.log(msg);
			const priceData = JSON.parse(msg.data);
			console.log(priceData);
			for (const currencyId in priceData) {
				if (priceData.hasOwnProperty(currencyId)) {
					const price = priceData[currencyId];
					const modifiedWallet = $wallet;
					modifiedWallet.forEach((walletHolding) => {
						if (walletHolding.id === currencyId) {
							walletHolding.priceUsd = price;
						}
					});
					wallet.set(modifiedWallet);
				}
			}
		};
	}
	commaSeparatedHoldings.subscribe(value => {
		if (prices){
			prices.close();
			getPrices(value);
		}
	})

	// Keep prices upated using CoinCap websocket
	onMount(async () => {
	  if ($wallet.length > 0) {
			getPrices($commaSeparatedHoldings);
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
</main>
<Footer />

<style>
	main{
		padding-bottom: 4em;
	}
</style>