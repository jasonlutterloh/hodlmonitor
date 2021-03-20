<script>
  export let name;
</script>

<label for={name}>
  <slot></slot>
</label>

<style>
label{
  display: block;
  font-weight: normal;
  font-size: 1.1em;
  text-align: center;
}
</style>