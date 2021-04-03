<script>
  import FormButton from "../components/buttons/FormButton.svelte";
import Backup from "./Backup.svelte";
import Restore from "./Restore.svelte";
import {wallet} from "../store";

  let messaging = "";

  function clear() {
    messaging = "Data cleared."
	  wallet.set([]);
	}
</script>

<h2>Manage Your Data</h2>
{#if messaging.length > 0}
<p>{messaging}</p>
{/if}
<Backup />
<Restore bind:messaging/>
<FormButton type="button" on:click={clear}>Clear Data</FormButton>
<p>
  Reminder: Your data is not sent anywhere or stored remotely. This app runs
  in the browser and uses local storage on your device.
</p>
<style>
  h2{
    font-size: 1.3em;
    font-weight: bold;
    text-align: center;
    color: var(--primary-color);
    margin: 0;
    padding: 1em;
    margin-bottom: 1em;
  }
  p{
    text-align: center;
  }
</style>