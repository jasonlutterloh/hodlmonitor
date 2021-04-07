<script>
  export let type;
</script>

<button type={type} on:click><slot></slot></button>

<style>
button {
  box-sizing: border-box;
  margin: 1em auto;
  display: block;
  background: var(--primary-color);
  color: var(--alt-text-color);
  cursor: pointer;
  text-transform: uppercase;
  font-weight: bold;
  border: 3px solid var(--alt-text-color);
  padding: 1em 0;
  transition: 0.2s all;
  width: 100%;
  max-width: 400px;
  font-size: .9em;
  text-decoration: none;
  text-align: center;
}
button:hover, button:focus {
  background: var(--alt-text-color);
  color:  var(--primary-color);
}
button:active {
  transform: scale(.95);
}

@media(prefers-color-scheme: dark){
  button {
    background: var(--secondary-body-color);
    color: var(--text-color);
    border: 3px solid var(--text-color);
  }
  button:hover, button:focus {
    background: var(--text-color);
    color:  var(--secondary-body-color);
  }

}

</style>