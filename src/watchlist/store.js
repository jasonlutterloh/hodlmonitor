import {derived, writable} from "svelte/store";
import {getDollarDisplayValue, getPercentage} from "../utils";
import {infoMessages} from "../store";

export const watchlist = createWatchlist();
export const isAddMode = writable(false);
export const lastUpdated = writable(localStorage.getItem("watchlistLastUpdated") || "");

function getColor(value) {
  return value.includes("-") ? "rgba(255,73,73,1)" : "rgba(1,204,3,1)";
}
function createWatchlist() {
  const { subscribe, set, update } = writable(JSON.parse(localStorage.getItem("watchlist")) || []); // Not happy with this var but its already set so would break existing users if changed

  return {
    subscribe,
    addItem: (apiData) => {
      update(watchlistArray => {
        const doesExist = watchlistArray.some((item) => item.id === apiData.id);
        if (!doesExist) {
          const newItem = {
            "id": apiData.id,
            "name": apiData.name,
            "symbol": apiData.symbol.toUpperCase(),
            "currentPrice": 0,
            "details": {},
          };

          return [...watchlistArray, newItem];
        }
        return watchlistArray;
      });
    },
    updateItem: (id, apiData) => {
      update(watchlistArray => {
        const index = watchlistArray.findIndex((obj => obj.id == id));
        if (index >= 0){
          watchlistArray[index].currentPrice = apiData.current_price;
          const priceChangePercentage = getPercentage(apiData.price_change_percentage_24h, 100);
          const priceChange = getDollarDisplayValue(apiData.price_change_24h);

          watchlistArray[index].details = [
            {
              name: "Current Price",
              value: getDollarDisplayValue(apiData.current_price),
              color: "var(--text-color)"
            },
            {
              name: "24hr % Change",
              value: priceChangePercentage,
              color: getColor(priceChangePercentage)
            },
            {
              name: "All Time High",
              value: getDollarDisplayValue(apiData.ath),
              color: "var(--text-color)"
            },
            {
              name: "24hr Price Change",
              value: priceChange,
              color: getColor(priceChange)
            },
          ]

          return [...watchlistArray];
        }
        return watchlistArray;
      });
    },
    removeItem: (id) => {
      update(watchlistArray => watchlistArray.filter((item) => item.id !== id));
    },
    restoreFromFile: (fileData) => {
      let isArray = Array.isArray(fileData);
      let errorFlag = false;
      if (isArray){
        // This just checks if the property exists, not the type. Could got that far but probably not needed.
        fileData.forEach(item => {
          !(
            item.hasOwnProperty("id") &&
            item.hasOwnProperty("name") &&
            item.hasOwnProperty("symbol") &&
            item.hasOwnProperty("currentPrice")
          ) ? errorFlag = true : null;
        })
      }
      if (!errorFlag){
        set(fileData);
      } else {
        console.error("Portfolio could not be restored.")
        infoMessages.addMessage("Portfolio could not be restored.");
      }
    },
    reset: () => set([]),
  };
}

watchlist.subscribe((value) => {
  localStorage.setItem("watchlist", JSON.stringify(value));
});

export const updateWatchlistPrices = (symbols) => {
  if (symbols.length > 0){
    fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=" + symbols + "&order=market_cap_desc&per_page=250&page=1&sparkline=false&price_change_percentage=24h").then(result => {
      return result.json();
    }).then(json => {
      const timestamp = new Date();
      console.log(json);
      json.forEach(result => {
        console.log(result);
        watchlist.updateItem(result.id, result);
      });
      updateTimestamp(timestamp);
    }).catch(error => {
      infoMessages.addMessage("Error getting current prices.");
      console.error("Error getting current prices.", error);
      return [];
    });
  }
};

const updateTimestamp = (timestamp) => {
  lastUpdated.set(timestamp.toLocaleDateString() + " " + timestamp.toLocaleTimeString());
};

lastUpdated.subscribe((value) => {
  localStorage.setItem("watchlistLastUpdated", value);
});

export const watchlistSymbols = derived(watchlist, ($watchlist) => {
  return $watchlist.map(item => item.id).toString();
});

watchlistSymbols.subscribe(value => {
  console.log(value);
  updateWatchlistPrices(value);
});
