<script>
  export let type;
</script>

<button type={type} on:click><slot></slot></button>

<style>
  button {
  box-sizing: border-box;
  margin: 1em auto;
  display: block;
  background: var(--alt-text-color);
  color: var(--main-green);
  cursor: pointer;
  text-transform: uppercase;
  font-weight: bold;
  border: 3px solid var(--alt-text-color);
  padding: 1em 0;
  transition: 0.2s all;
  width: 100%;
  max-width: 400px;
}
button:hover, button:focus {
  background: transparent;
  color:  var(--alt-text-color);
}
button:active {
  background: var(--alt-text-color);
  color:  var(--main-green);
  transform: scale(.95);
}

</style>