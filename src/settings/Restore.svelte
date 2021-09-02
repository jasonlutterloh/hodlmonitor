<script>
  import { portfolio } from "../portfolio/store";
  import {infoMessages} from "../store";
import { watchlist } from "../watchlist/store";
  let files;

  const updatePortfolio = (data) => {
    try {
      const json = JSON.parse(data);
      json.portfolio ? portfolio.restoreFromFile(json.portfolio) : console.error("No portfolio backup");
      json.watchlist ? watchlist.restoreFromFile(json.watchlist) : console.error("No watchlist backup");
      // watchlist.restoreFromFile(json.watchlist);
      infoMessages.addMessage("Restored data successfully.");
    } catch (error) {
      infoMessages.addMessage("Could not restore data.");
      console.error("An error occurred uploading the data", error);
    }
  };

  const upload = () => {
    if (files && files.length > 0) {
      const reader = new FileReader();
      reader.onload = function(e) {
        updatePortfolio(e.target.result);
      };
      reader.readAsText(files[0]);
    }
  };

  const handleKeyboard = (event) => {
    if (event.keyCode == 13) {
      event.target.click();
    }
  };
</script>

<form on:submit|preventDefault={upload}>
  <label tabindex="0" for="file" on:keypress={handleKeyboard}><span class="material-icons">restore</span>Restore from Local Backup</label>
  <input required type="file" bind:files name="file" id="file" on:change={upload}/>
</form>

<style>
label {
  box-sizing: border-box;
  margin: 0 auto;
  display: block;
  background: var(--primary-color);
  color: var(--alt-text-color);
  cursor: pointer;
  /* text-transform: uppercase;
  font-weight: bold;
  border: 3px solid var(--alt-text-color); */
  padding: 1em;
  transition: 0.2s all;
  width: 100%;
  max-width: 400px;
  font-size: 18px;
  text-decoration: none;
  text-align: left;
}
label:hover, label:focus {
  background: var(--alt-text-color);
  color:  var(--primary-color);
}
label:active {
  transform: scale(.95);
}
label > span{
  vertical-align: text-bottom;
  padding-right: .5em;
}

@media(prefers-color-scheme: dark){
  label {
    background: var(--secondary-body-color);
    color: var(--text-color);
    /* border: 3px solid var(--text-color); */
  }
  label:hover, label:focus {
    background: var(--text-color);
    color:  var(--secondary-body-color);
  }

}
  input[type="file"] {
    display: none;
  }

</style>