<script>
  import { activePane } from "./store.js";
  import Portfolio from "./portfolio/Portfolio.svelte";
  import PortfolioHeaderButtons from "./portfolio/PortfolioHeaderButtons.svelte";
  import Watchlist from "./watchlist/Watchlist.svelte";
  import WatchlistHeaderButtons from "./watchlist/WatchlistHeaderButtons.svelte";

  const tabs = [
    {
      id: "portfolio",
      name: "Portfolio",
      component: Portfolio,
      buttons: PortfolioHeaderButtons,
      icon: "account_balance_wallet",
    },
    {
      id: "watchlist",
      name: "Watchlist",
      component: Watchlist,
      buttons: WatchlistHeaderButtons,
      icon: "visibility",
    },
  ];

  activePane.set(tabs[0]);
</script>

<div role="tablist">
  {#each tabs as tab}
    <button
      class="tab"
      on:click={() => {
        activePane.set(tab);
      }}
      style="width: {100 / tabs.length}%"
      role="tab"
      aria-selected={$activePane.id == tab.id}
      tabindex={$activePane.id == tab.id ? "0" : "-1"}
    >
      {#if tab.icon}
        <span class="material-icons" aria-hidden="true">{tab.icon}</span>
      {/if}
      <span class="button-text">{tab.name}</span>
      {#if $activePane.id == tab.id}
        <span class="indicator" />
      {/if}
    </button>
  {/each}
</div>

<style>
  button {
    box-sizing: border-box;
    color: var(--alt-text-color);
    background: var(--primary-color);
    border: 0;
    text-transform: uppercase;
    padding: 0;
  }
  .material-icons {
    vertical-align: middle;
  }
  .button-text {
    display: inline-block;
    padding: 1em;
  }
  .indicator {
    display: block;
    height: 2px;
    background-color: #fff;
    width: 100%;
    margin-top: -2px;
  }
  @media (prefers-color-scheme: dark) {
    button {
      color: var(--text-color);
      background: var(--body-color);
    }
  }
</style>
