<script>
  import {nomicsKey} from '../store.js';

  const saveKey = (event) => {
    let key = event.target.key.value;
    nomicsKey.set(key);
  }
  nomicsKey.subscribe(key => {
    localStorage.setItem("nomicsKey", key);
  })
</script>


<form on:submit|preventDefault={saveKey}>
  <p>For this to work, the app needs a Nomics API key. You can get one for free at <a href="https://p.nomics.com/pricing#free-plan">Nomics</a>.</p>
  <label>Nomics Key:
    <input id="key" name="key" value={$nomicsKey} type="text" />
  </label>
  <button type="submit">Save</button>
</form>

<style>
  button{
    display: block;
  }
</style>