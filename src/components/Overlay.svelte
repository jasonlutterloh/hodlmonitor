<script>
  import { slide } from 'svelte/transition';
  import {writable} from 'svelte/store';

  export let trigger;

  let isActive = writable(false);

  trigger.subscribe(value => {
    if (value === true){
      isActive.set(true);
    } else {
      isActive.set(false);
    }
  })


</script>

{#if $isActive}
<div transition:slide>
  <slot></slot>
</div>
{/if}

<style>
div {
  background: rgb(40, 151, 85);
  color: #fff;
  position: absolute;
  top: 0;
  left: 0;
  margin: 0 auto;
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
}
</style>