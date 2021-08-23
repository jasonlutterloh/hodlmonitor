<script>
import {portfolio} from "../portfolio/store.js";


let backupHref = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify($portfolio));

portfolio.subscribe(value => {
  backupHref = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(value));
});

</script>

<a type="button" href={backupHref} download="hodl-backup.json">Backup</a>

<style>
a {
  box-sizing: border-box;
  margin: 1em auto;
  display: block;
  background: var(--primary-color);
  color: var(--alt-text-color);
  cursor: pointer;
  text-transform: uppercase;
  font-weight: bold;
  border: 3px solid var(--alt-text-color);
  padding: 1em 0;
  transition: 0.2s all;
  width: 100%;
  max-width: 400px;
  font-size: .9em;
  text-decoration: none;
  text-align: center;
}
a:hover, a:focus {
  background: var(--alt-text-color);
  color:  var(--primary-color);
}
a:active {
  transform: scale(.95);
}

@media(prefers-color-scheme: dark){
  a {
    background: var(--secondary-body-color);
    color: var(--text-color);
    border: 3px solid var(--text-color);
  }
  a:hover, a:focus {
    background: var(--text-color);
    color:  var(--secondary-body-color);
  }

}
</style>