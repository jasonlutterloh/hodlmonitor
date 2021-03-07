<script>
	import { wallet, displayData} from './store.js';
	import TotalValue from './components/TotalValue.svelte';
	import AddHolding from './components/add/AddHolding.svelte';
	import Table from "./components/Table.svelte";
	import Header from './components/Header.svelte';
	import Footer from './components/Footer.svelte';

	// Get comma separated list of holdings
	// const commaSeparatedHoldings = $wallet.map((holding)=> holding.id).toString();
	// const holdingsArray = $wallet.map((holding)=> holding.symbol);
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