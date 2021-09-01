import { writable } from "svelte/store";
import Portfolio from "./portfolio/Portfolio.svelte";
import Watchlist from "./watchlist/Watchlist.svelte";
import PortfolioHeaderButtons from "./portfolio/PortfolioHeaderButtons.svelte";
import WatchlistHeaderButtons from "./watchlist/WatchlistHeaderButtons.svelte";

export const tabs = [
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

export const activePane = writable(tabs[0]);
export const infoMessages = createInfoMessageSystem();

function createInfoMessageSystem() {
  const { subscribe, update } = writable([]);

  return {
    subscribe,
    addMessage: (newMessage) => {
      update((messages) => [...messages, newMessage]);
      setTimeout(() =>
        update((messages) =>
          // eslint-disable-next-line comma-dangle
          messages.filter((message) => message !== newMessage)
        // eslint-disable-next-line comma-dangle
        ), 8000
      );
    },
  };
}

export const cryptoList = writable(JSON.parse(localStorage.getItem("list")) || []);

cryptoList.subscribe((value) => {
  localStorage.setItem("list", JSON.stringify(value));
});
