<script>
  export let onClick;
</script>

<button on:click={onClick}>
  <slot></slot>
</button>

<style>
button{
  background: none;
  border: 0;
  color: var(--main-text-color);
  padding: 1em 2em;
  box-sizing: border-box;
  border: 1px solid transparent;
  transition: .5s;
  margin-top: .5em;
}
button:hover,
button:focus{
  background: #efefef;
  border: 1px solid #ccc;
  border-radius: 4px;
}

@media(prefers-color-scheme: dark){
  button:hover,
  button:focus{
    background: none;
    border: 0;
    border-radius: 0%;
    color: var(--primary-color);
  }
}
</style>