<script>
  import Sidebar from "../components/Sidebar.svelte";
  import HeaderButton from "../components/buttons/HeaderButton.svelte";
  import Backup from "./Backup.svelte";
  import Restore from "./Restore.svelte";
  import ClearData from "./ClearData.svelte";

  let isSidebarOpen = false;
</script>

<HeaderButton on:click={() => (isSidebarOpen = !isSidebarOpen)}>
  <span class="material-icons" aria-hidden="true"> menu </span>
  <span class="sr-only">Data Menu</span>
</HeaderButton>
<Sidebar bind:isSidebarOpen>
  <h2>Manage Your Data</h2>
  <div class="container">
    <div class="top-menu">
      <Backup />
      <Restore />
    </div>
    <div class="bottom-menu">
      <ClearData />
      <p>
        Reminder: Your data is not sent anywhere or stored remotely. This app
        runs in the browser and uses local storage on your device.
      </p>
    </div>
  </div>
</Sidebar>


<style>
  .container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    height: calc(100vh - 72px);
    padding: 8px;
  }
  .top-menu {
    flex: 1 1 auto;
  }
  .bottom-menu {
    flex: 0 1 auto;
  }
  h2 {
    display: block;
    margin: 0;
    padding: 16px;
    font-size: 16px;
    text-transform: uppercase;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    line-height: 24px;
  }
  p {
    text-align: center;
  }
  @media (prefers-color-scheme: dark) {
    h2 {
      color: var(--text-color);
    }
  }
</style>
