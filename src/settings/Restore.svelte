<script>
  import { wallet } from "../store";
  let files;
  export let messaging;

  const updateWallet = (data) => {
    try {
      let json = JSON.parse(data);
      wallet.set(json);
      messaging = "Restored data successfully."
    } catch (error) {
      messaging = "Unsuccessful restoration."
      console.error("An error occurred uploading the data", error);
    }
  };

  const upload = () => {
    if (files && files.length > 0) {
      const reader = new FileReader();
      reader.onload = function(e) {
        updateWallet(e.target.result);
      };
      reader.readAsText(files[0]);
    }
  };

  const handleKeyboard = (event) => {
    if(event.keyCode == 13) {
      event.target.click();
    }
  }
</script>

<form on:submit|preventDefault={upload}>
  <label tabindex="0" for="file" on:keypress={handleKeyboard}>Restore from Backup</label>
  <input required type="file" bind:files name="file" id="file" on:change={upload}/>
</form>

<style>
label {
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
label:hover, label:focus {
  background: var(--alt-text-color);
  color:  var(--primary-color);
}
label:active {
  transform: scale(.95);
}

@media(prefers-color-scheme: dark){
  label {
    background: var(--secondary-body-color);
    color: var(--text-color);
    border: 3px solid var(--text-color);
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