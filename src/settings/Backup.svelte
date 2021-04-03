<script>
import {wallet} from "../store.js";


let backupHref = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify($wallet));

wallet.subscribe(value => {
  backupHref = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(value));
});

</script>

<a type="button" href={backupHref} download="hodl-backup.json">Backup</a>

<style>
a{
  box-sizing: border-box;
  margin: 1em auto;
  display: block;
  background: var(--body-color);
  color: var(--primary-color);
  cursor: pointer;
  text-transform: uppercase;
  font-weight: bold;
  border: 3px solid var(--primary-color);
  padding: 1em 0;
  transition: 0.2s all;
  width: 100%;
  max-width: 400px;
  font-family: 'Open Sans', sans-serif;
  font-size: .9em;
  text-decoration: none;
  text-align: center;
}
a:hover, a:focus {
  background: var(--primary-color);
  color:  var(--alt-text-color);
}
a:active {
  transform: scale(.95);
}
</style>