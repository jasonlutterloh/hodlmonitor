<script>
	import {slide} from "svelte/transition";

</script>

<footer>
	HODL Tracker is an open source project. <a href="https://github.com/jasonlutterloh/hodltracker">GitHub</a>
</footer>

<style>
	footer{
		font-size: .8em;
		text-align: center;
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