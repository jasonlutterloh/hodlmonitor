<script>
	import { wallet } from '../store.js';
</script>

<footer>
	<div>
		<strong>HODL Tracker is an open source project. <a href="#">GitHub Link</a></strong>
		<p>This app relies on your browser's LocalStorage for storing your holdings. The app does not trasmit holding amounts to any backend or services. The only service calls that are made are to an API provided by CoinCap in order to get pricing information.</p>
	</div>
	<div>
		<button on:click={()=>{wallet.set([])}}>Reset Everything</button>
	</div>
</footer>

<style>
	footer{
		display: flex;
		background: #444;
		color: white;
	}
	div{
		margin: 1em;
		flex: 0 1 auto;
	}
	@media only screen and (max-width: 568px) {
		footer {
			flex-direction: column;
		}
	}
</style>