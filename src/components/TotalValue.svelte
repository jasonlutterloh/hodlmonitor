<script>
	import {totalValue} from '../store.js';
  import {getDollarDisplayValue} from './utils.js';
</script>

<div>
  <h2>Total Value</h2> 
  <p>${getDollarDisplayValue($totalValue)}</p>
</div>

<style>
  div{
    background:rgb(40, 151, 85);
    color: #fff;
    margin: 0 auto;
    padding: 4em 1em;
    text-align: center;
  }
  h2{
    font-size: 1.4em;
    font-weight: 100;
    margin: 0;
  }
  p{
    color:white;
    font-size: 2em;
    font-weight: bold;
    margin: 0;
  }
</style>