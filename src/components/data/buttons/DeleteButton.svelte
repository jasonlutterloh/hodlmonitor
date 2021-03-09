<script>
  import ActionButton from './ActionButton.svelte';
  export let onClick;
</script>

<ActionButton onClick={onClick}>
  <span class="material-icons">
  delete
  </span>
</ActionButton>