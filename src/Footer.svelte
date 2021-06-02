<script>
		import {slide} from "svelte/transition";

let isExpanded = false;
</script>

<footer>
	<button on:click={()=> isExpanded = !isExpanded}>App Info</button>
	{#if isExpanded}
	<div transition:slide>
	<p>HODL Monitor is an open source project. <a href="https://github.com/jasonlutterloh/hodltracker">GitHub</a></p>
	<p>The app was built as a hobby and no support, liability, or warranty is provided. Accuracy is not guaranteed.</p>
	<p>Privacy Promise: This app does not collect/store any data remotely, show ads, or use any analytics software. The app is <a target="_blank" href="https://coingecko.com/en/api">Powered by CoinGecko API</a> (to which it will pass a list of symbols) for pricing data and uses Google Fonts for, well, fonts.</p>
</div>
{/if}
</footer>

<style>
	footer{
		font-size: .8em;
		text-align: center;
	}
	button{
		background: none;
		border: 0;
		cursor: pointer;
		text-align: center;
		padding: 1em;
		text-transform: uppercase;
		color: var(--text-color);
		opacity: .6;
	}
	div{
		margin: 1em;
		flex: 1 1 100%;
	}
	a{
		color: var(--text-color);
	}
	@media only screen and (max-width: 568px) {
		footer {
			flex-direction: column;
		}
	}
</style>