<script>
  import {getDollarDisplayValue} from "../holdings/utils";
  export let name, currentPrice;
</script>
<li>
  <div class="container">
    <div class="name-container">
      <h2>{name}</h2>
    </div>
    <div class="value-container">
      <span>${getDollarDisplayValue(currentPrice)}</span>
    </div>
  </div>
</li>

<style>
  h2{
		font-size: 1.2em;
    font-weight: normal;
    margin: 0;
	}
  li{
		transition: all .5s;
		border-bottom: thin solid var(--border-color);
	}
	.container{
		display: flex;
		align-items: center;
		flex: 0 1 auto;
		padding: 1em .8em 1em 1.4em;
		outline: 0;
	}
	.name-container{
		flex: 1 1 auto;
		text-align: left;
	}
	.value-container{
		margin-right: 1em;
		text-align: center;
	}
	@media(prefers-color-scheme: dark){
		.value-container{
			color: var(--primary-color);
		}
	}
</style>