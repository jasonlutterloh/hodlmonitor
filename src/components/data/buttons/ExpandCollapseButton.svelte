<script>
  export let trigger;
</script>

<!-- TODO: Make Accessible -->
<button class="expand-button" type="button" on:click={()=> trigger = !trigger}>
  <span class="material-icons">
    {#if trigger} 
      keyboard_arrow_up
    {:else}
      keyboard_arrow_down
    {/if}
    </span>
</button>

<style>	
.expand-button{
  background: none;
  border: 0;
}
.expand-button span{
  color: #222;
}
</style>
