<script>
  import {slide} from "svelte/transition";
  import {writable} from "svelte/store";

  export let trigger;
  export let title;

  const isActive = writable(false);

  trigger.subscribe((value) => {
    if (value === true) {
      isActive.set(true);
    } else {
      isActive.set(false);
    }
  });
</script>

{#if $isActive}
<div transition:slide>
  <h2>{title}</h2>
  <slot></slot>
</div>
{/if}

<style>
div {
  background: var(--body-color);
  color: var(--main-text-color);
  position: absolute;
  top: 0;
  left: 0;
  margin: 0 auto;
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
}
h2{
  font-size: 1.3em;
    font-weight: bold;
    text-align: center;
    color: var(--alt-text-color);
    margin: 0;
    background: var(--primary-color);
    padding: 1em;
    margin-bottom: 1em;
}
</style>