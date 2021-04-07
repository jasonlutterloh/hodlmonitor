<script>
  export let results;
  export let holdingToAdd;

  function storeHoldingToAdd(result) {
    holdingToAdd.set(result);
  }

</script>
<div class="results">
  <p>Select Crypto</p>
  <ul>
  {#each $results as result}
    <li role="button" on:click={() => storeHoldingToAdd(result)}>{result.symbol} - {result.name}
      <span class="material-icons">add</span>
    </li>
  {/each}
  </ul>
</div>

<style>
  p{
    display: block;
    font-weight: normal;
    font-size: 1.1em;
    text-align: center;
} 
  
ul{
  list-style: none;
    padding: 0;
    margin: 0 auto;
    max-width: 600px;
}
li {
  cursor: pointer;
  padding: 1em;
  border: 3px solid;
  color: var(--alt-text-color);
  margin-bottom: .4em;
  transition: .5s all;
}
li:hover,
li:focus{
  background: var(--alt-text-color);
  color: var(--primary-color);
}
li:active{
  transform: scale(.95)
}
li > span{
  float: right;
}
p{
  text-align: center;
  margin: 1em;
}
.results{
  margin: 0 1em;
}


@media(prefers-color-scheme: dark){
  li {
    cursor: pointer;
    padding: 1em;
    border: 3px solid;
    color: var(--primary-color);
    background: var(--secondary-body-color);
    margin-bottom: .4em;
    transition: .5s all;
  }
  li:hover,
  li:focus{
    background: var(--alt-text-color);
    color: var(--primary-color);
  }
}
</style>