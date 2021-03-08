<script>
	import { wallet, displayData} from './store.js';
	import TotalValue from './components/TotalValue.svelte';
	import AddHolding from './components/add/AddHolding.svelte';
	import Table from "./components/Table.svelte";
	import Header from './components/Header.svelte';
	import Footer from './components/Footer.svelte';
import { onMount } from 'svelte';

	// Get comma separated list of holdings
	const commaSeparatedHoldings = $wallet.map((holding)=> holding.id).toString();
	// const holdingsArray = $wallet.map((holding)=> holding.symbol);

	onMount(async () => {
		const pricesWs = new WebSocket('wss://ws.coincap.io/prices?assets=' + commaSeparatedHoldings)

    pricesWs.onmessage = function (msg) {
    	let priceData = JSON.parse(msg.data);
			for (const currencyId in priceData) {
				const price = priceData[currencyId];
				let modifiedWallet = $wallet;
				modifiedWallet.forEach(walletHolding => {
					if (walletHolding.id === currencyId){
						walletHolding.priceUsd = price;
					}
				});
				wallet.set(modifiedWallet);
			}
    }
	});
</script>

<Header />
<main>
	<TotalValue />
	<Table displayData = {$displayData}/>
	<AddHolding />
</main>
<Footer />

<style>
	main{
		padding-top: 4em;
	}
</style>