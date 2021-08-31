<script>
  import { infoMessages } from "../store";
  import { portfolio } from "../portfolio/store";
import { watchlist } from "../watchlist/store";
  // TODO: Handle any sort of error scenarios
  function clear() {
    infoMessages.addMessage("Data cleared.");
    portfolio.reset();
    watchlist.reset();
  }
</script>

<button type="button" on:click={clear}>
  <span class="material-icons">delete</span>Clear Data
</button>

<style>
  button {
    box-sizing: border-box;
    margin: 0 auto;
    display: block;
    background: var(--primary-color);
    border: 0;
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
  button:hover,
  button:focus {
    background: var(--alt-text-color);
    color: var(--primary-color);
  }
  button:active {
    transform: scale(0.95);
  }
  button > span:nth-of-type(1){
    vertical-align: text-bottom;
    padding-right: .5em;
  }

  @media (prefers-color-scheme: dark) {
    button {
      background: var(--secondary-body-color);
      color: var(--text-color);
    }
    button:hover,
    button:focus {
      background: var(--text-color);
      color: var(--secondary-body-color);
    }
  }
</style>
