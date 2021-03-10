<script>
  export let onClick;
</script>

<button type="text" on:click={onClick}>
  <span class="material-icons">
  add_circle
  </span>
</button>

<style>
button{
  background: none;
  border: 0;
  color: #333;
  cursor: pointer;
  padding: 1em;
  display: block;
  margin: 0 auto;
  text-align: center;
  font-weight: bold;
  font-size: 1.1em;
  transition: all .5s;
}
button:hover,
button:focus{
  text-decoration: underline;
}
button:hover .material-icons,
button:focus .material-icons{
  color: rgb(40, 151, 85)
}
.material-icons{
  font-size: 30px;
}
</style>