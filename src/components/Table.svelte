<script>
  export let displayData;
  export let totalValue;

  const getDisplayValue = (text) => {
		let displayValue = text.toFixed(2);
		displayValue = displayValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		return displayValue;
  }
</script>
<table>
  <thead>
    <tr>
      <th></th>
      <th>Currency</th>
      <th>Current Price</th>
      <th>Amount Held</th>
      <th>Value</th>
    </tr>
  </thead>
  <tbody>
  {#each displayData as holding}
    <tr>
      <td><img src={holding.logo} alt={holding.name} width="30px" height="30px"/></td>
      <td>{holding.name}</td>
      <td>${getDisplayValue(holding.price)}</td>
      <td>{holding.amountHeld}</td>
      <td>${getDisplayValue(holding.value)}</td>
    </tr>
  {/each}
    <tr>
      <td></td>
      <td>Total Value</td>
      <td></td>
      <td></td>
      <td>${getDisplayValue(totalValue)}</td>
    </tr>
  </tbody>
</table>

<style>
  table{
		background: white;
		border-collapse: collapse;
		text-align: left;
		margin: 0 auto;
		box-shadow: 0 0 30px 10px #ccc;
	}
	thead{
		background:rgb(40, 151, 85);
		color: white;
		font-weight: bold;
	}
	thead tr{
		border-radius: 100px 100px 0 0;
	}
	td,th{
		padding: 1em 1.4em;
	}
	tr{
		transition: all .5s
	}
	tbody tr:not(:last-of-type){
		border-bottom: thin solid #ccc;
	}
	tbody tr:hover:not(:last-of-type){
		background: rgb(108 108 108);
		color: #fff;
		font-weight: bold;
  }
  tbody td:first-of-type{
    padding-right: 0;
  }
	tbody td:nth-of-type(2){
		font-weight: bold;
	}
	tbody tr:last-of-type{
		background: rgba(40, 151, 85, 1);
		color: #fff;
		font-weight: bold;
	}
	img{
		width: 30px;
    height: 30px;
	}
</style>