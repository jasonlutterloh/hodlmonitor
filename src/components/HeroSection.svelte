<script>
  export let title;
  export let value;
</script>

<div>
  <h2>{title}</h2> 
  <p>{value}</p>
</div>

<style>
  div{
    background:var(--total-value-color);
    color: var(--alt-text-color);
    margin: 0 auto;
    padding: 2em 1em;
    text-align: center;
  }
  h2{
    font-size: 1.4em;
    font-weight: 100;
    margin: 0;
  }
  p{
    font-family: 'Roboto Condensed', sans-serif;
    color:var(--alt-text-color);
    font-size: 2em;
    font-weight: bold;
    margin: 0;
  }
  @media(prefers-color-scheme: dark){
    div{
      background:var(--total-value-color);
      color: var(--primary-color);
      border-bottom: 1px solid var(--border-color);
    }
    h2{
      color: var(--text-color);
    }
    p{
      color: var(--primary-color);
    }
  }
</style>