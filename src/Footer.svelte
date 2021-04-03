<script>
	import {wallet} from "./store.js";
	import {slide} from "svelte/transition";

	let isExpanded = false;
</script>

<footer>
	<button on:click={()=> isExpanded = !isExpanded}>About</button>
	{#if isExpanded}
	<div transition:slide>
		<strong>HODL Tracker is an open source project. <a href="https://github.com/jasonlutterloh/hodltracker">GitHub Link</a></strong>
		<p>This app relies on your browser's LocalStorage for storing your holdings. The app does not trasmit holding amounts to any backend or services.</p>
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
		color: var(--secondary-text-color);
	}
	div{
		margin: 1em;
		flex: 1 1 100%;
	}
	a{
		color: var(--secondary-text-color);
	}
	@media only screen and (max-width: 568px) {
		footer {
			flex-direction: column;
		}
	}
</style>