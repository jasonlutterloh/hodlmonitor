<script>
  export let trigger;
</script>

<!-- TODO: Make Accessible -->
<button type="button" on:click={()=> trigger = !trigger}>
  <span class="material-icons">
    {#if trigger} 
      keyboard_arrow_up
    {:else}
      keyboard_arrow_down
    {/if}
    </span>
</button>

<style>	
button{
  background: none;
  border: 0;
}
button span{
  color: var(--main-text-color);
}
</style>
