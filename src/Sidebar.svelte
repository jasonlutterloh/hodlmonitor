<script>
  import {fly} from "svelte/transition";
  import ActionButton from "./components/buttons/ActionButton.svelte";

  export let isSidebarOpen = false;
</script>

{#if isSidebarOpen}
<aside transition:fly="{{x: 200, duration: 500}}" class:open = {isSidebarOpen}>
  <div><ActionButton onClick={() => isSidebarOpen = false}>
    <span class="material-icons">
    close
    </span>
  </ActionButton>
</div>
  <div>
    <slot></slot>
  </div>
</aside>
<div class="overlay" on:click={() => isSidebarOpen = !isSidebarOpen}></div>
{/if}

<style>
  aside{
    top: 0;
    height: 100vh;
    width: 30vw;
    position: fixed;
    background: var(--body-color);
    color: var(--main-text-color);
    z-index: 99998;
    overflow: scroll;
  }
  .open{
    left: 70vw;
    box-shadow: var(--border-color);
  }
  aside > div{
    padding: 20px;
  }
  aside > div:first-of-type{
    padding: 0;
    position: absolute;
    right: 0;
    top: 0;
  }
  .overlay{
    position:fixed;
    top:0;    
    left:0;
    width:100%;
    height: 100vh;
    background:rgba(0,0,0,.5);
    z-index: 9997;
  }

  @media only screen and (max-width: 768px) {
    aside{
      width: 90vw;
    }
    .open{
      left: 10vw;
    }
  }
</style>