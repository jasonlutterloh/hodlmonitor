<script>
  import {nomicsKey} from '../store.js';
  nomicsKey.subscribe(key => {
    localStorage.setItem("nomicsKey", key);
  })
</script>
<form>
  <label>Nomics Key:
    <input bind:value={$nomicsKey} type="text" />
  </label>
</form>