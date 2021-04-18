<script>
  import FormButton from "../components/buttons/FormButton.svelte";
  import {infoMessages} from "../applicationStateStore";
import Backup from "./Backup.svelte";
import Restore from "./Restore.svelte";
import {wallet} from "../store";


  // TODO: Handle any sort of error scenarios
  function clear() {
    infoMessages.addMessage("Data cleared.");
	  wallet.reset();
	}
</script>


<h2>Manage Your Data</h2>
<Backup />
<Restore/>
<FormButton type="button" on:click={clear}>Clear Data</FormButton>
<p>
  Reminder: Your data is not sent anywhere or stored remotely. This app runs
  in the browser and uses local storage on your device.
</p>
<style>
  h2{
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
  p{
    text-align: center;
  }
  @media(prefers-color-scheme: dark){
    h2{
      color: var(--text-color);
    }
    
  }
</style>