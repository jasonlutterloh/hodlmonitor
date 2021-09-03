<script>
import {portfolio} from "../portfolio/store.js";
import {watchlist} from "../watchlist/store";

const json = {
  portfolio: $portfolio,
  watchlist: $watchlist,
};

let backupHref = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(json));

portfolio.subscribe(value => {
  json.portfolio = value;
  backupHref = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(json));
});

watchlist.subscribe(value => {
  json.watchlist = value;
  backupHref = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(json));
});

</script>

<a type="button" href={backupHref} download="hodl-backup.json">
  <span class="material-icons">backup</span>Backup to Local File
</a>

<style>
a {
  box-sizing: border-box;
  margin: 0 auto;
  display: block;
  background: var(--primary-color);
  color: var(--alt-text-color);
  cursor: pointer;
  font-size: 18px;
  padding: 1em;
  transition: 0.2s all;
  width: 100%;
  max-width: 400px;
  text-decoration: none;
  text-align: left;
}
a:hover, a:focus {
  background: var(--alt-text-color);
  color:  var(--primary-color);
}
a:active {
  transform: scale(.95);
}
a > span{
  vertical-align: text-bottom;
  padding-right: .5em;
}

@media(prefers-color-scheme: dark){
  a {
    background: var(--secondary-body-color);
    color: var(--text-color);
  }
  a:hover, a:focus {
    background: var(--text-color);
    color:  var(--secondary-body-color);
  }

}
</style>