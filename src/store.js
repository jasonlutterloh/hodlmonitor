import {writable} from "svelte/store";
import Portfolio from "./portfolio/Portfolio.svelte";
import Watchlist from "./watchlist/Watchlist.svelte";
import PortfolioHeaderButtons from "./portfolio/PortfolioHeaderButtons.svelte";
import WatchlistHeaderButtons from "./watchlist/WatchlistHeaderButtons.svelte";

export const tabs = [
{
  id:"portfolio",
  name: "Portfolio",
  component: Portfolio,
  buttons: PortfolioHeaderButtons,
  icon: "account_balance_wallet"
},
{
  id:"watchlist",
  name: "Watchlist",
  component: Watchlist,
  buttons: WatchlistHeaderButtons,
  icon: "visibility"
}
];
// TODO: Definitely fix this - shouldnt have this copied in two places
export const activePane = writable(tabs[0]);
// export const lastUpdated = writable(localStorage.getItem("lastUpdated") || "");
export const isExpanded = writable(false);
export const infoMessages = createInfoMessageSystem();

function createInfoMessageSystem() {
  const { subscribe, update } = writable([]);

  return {
    subscribe,
    addMessage: (newMessage) => {
      update(messages => [...messages, newMessage]);
      setTimeout(()=>update(messages => messages.filter(message => message !== newMessage)), 8000);
    },
  };
}

export const cryptoList = writable(JSON.parse(localStorage.getItem("list")) || []);
cryptoList.subscribe((value) => {
  localStorage.setItem("list", JSON.stringify(value));
});

// export const updatePrices = (commaSeparatedHoldings) => {
//   fetch("https://api.coingecko.com/api/v3/simple/price?vs_currencies=usd&ids=" + commaSeparatedHoldings).then(result => {
//     return result.json();
//   }).then(json => {
//     const timestamp = new Date();

//     for (const cryptoId in json) {
//       if (json.hasOwnProperty(cryptoId)) {
//         const price = json[cryptoId].usd;
//         portfolio.updatePrice(cryptoId, price);
//         watchlist.updatePrice(cryptoId, price);
//       }
//     }
//     updateTimestamp(timestamp);
//   }).catch(error => {
//     infoMessages.addMessage("Error getting current prices.");
//     console.error("Error getting current prices.", error);
//     return [];
//   });
// };

// const updateTimestamp = (timestamp) => {
//   lastUpdated.set(timestamp.toLocaleDateString() + " " + timestamp.toLocaleTimeString());
// };

// lastUpdated.subscribe((value) => {
//   localStorage.setItem("lastUpdated", value);
// });

// export const commaSeparatedSymbols = derived([portfolio, watchlist], ([$portfolio, $watchlist]) => {
//   return $portfolio.map((holding)=> holding.id).toString() + "," + $watchlist.map(item => item.id).toString();
// });

// commaSeparatedSymbols.subscribe(value => {
//   updatePrices(value);
// });
