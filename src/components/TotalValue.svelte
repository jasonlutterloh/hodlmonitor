<script>
	import {totalValue} from '../store.js';
  import {getDisplayValue} from './utils.js';
</script>

<div>
  <h2>Total Value</h2> 
  <p>${getDisplayValue($totalValue)}</p>
</div>

<style>
  div{
    margin: 0 auto 1em;
    text-align: center;
  }
  h2{
    font-size: 1.4em;
    font-weight: 100;
    margin: 0;
  }
  p{
    color:rgb(40, 151, 85);
    font-size: 2em;
    font-weight: bold;
    margin: 0;
  }
</style>