<script>
  import RefreshButton from "./components/buttons/RefreshButton.svelte";
  import DataMenu from "./settings/DataMenu.svelte";
  import {activePane} from "./store";
</script>

<header>
  <div>
    <DataMenu />
  </div>
  <div>
    <h1>HODL Monitor</h1>
  </div>
  <div>
    <RefreshButton />
    <svelte:component this={$activePane.headerContent} />
  </div>
</header>

<style>
  header{
    color: var(--alt-text-color);
    background: var(--primary-color);
    box-sizing: border-box;
    width: 100%;
    flex: 0 1 auto;
    display: flex;
    padding: 8px;
  }
  div{
    flex: 0 1 auto;
  }
  div:nth-of-type(2){
    flex: 1 1 auto;
  }
  h1{
    display: block;
    margin: 0;
    padding: 8px;
    font-size: 16px;
    text-transform: uppercase;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    line-height: 24px;
  }
  @media(prefers-color-scheme: dark){
    header{
      color: var(--text-color);
      background: var(--body-color);
    }
  }
</style>