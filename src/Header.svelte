<script>
  import SettingsButton from "./components/buttons/SettingsButton.svelte";

  export let isSidebarOpen = false;
</script>

<header>
  <div>
    <h1>HODL Tracker (beta)</h1>
  </div>
  <div>
    <SettingsButton bind:isSidebarOpen />
  </div>
</header>

<style>
  header{
    color: var(--alt-text-color);
    background: var(--primary-color);
    width: 100%;
    flex: 0 1 auto;
    display: flex;
  }
  div{
    flex: 0 1 auto;
  }
  div:first-of-type{
    flex: 1 1 auto;
  }
  h1{
    display: block;
    margin: 0;
    line-height: 1em;
    padding: 1em;
    font-size: .8em;
    text-transform: uppercase;
  }
  @media(prefers-color-scheme: dark){
    header{
      color: var(--main-text-color);
      background: var(--body-color);
    }
  }
</style>