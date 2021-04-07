<script>
  export let name;
  export let value;
</script>

<div>
  <span>{name}</span>
  <span>{value}</span>
</div>

<style>
  div{
    flex: 1 1 auto;
  }
  span{
		display: block;
		margin: 1em 1em 0 1em;
	}
  span:first-of-type{
		color: var(--text-color);
		opacity: .8;
		display: block;
		text-transform: uppercase;
		font-size: .6em;
	}
	span:last-of-type{
		font-size: 1.4em;
		margin: 0 1em 1em 1em;
	}
	@media(prefers-color-scheme: dark){
		span:last-of-type{
			color: var(--primary-color);
		}
	}
	@media only screen and (max-width: 568px) {
		div{
    flex: 1 1 50%;
  }
	}
</style>