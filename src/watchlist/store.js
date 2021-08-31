import {derived, writable} from "svelte/store";

export const watchlist = createWatchlist();
export const isAddMode = writable(false);
export const lastUpdated = writable(localStorage.getItem("watchlistLastUpdated") || "");

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
          };

          return [...watchlistArray, newItem];
        }
        return watchlistArray;
      });
    },
    updatePrice: (id, price) => {
      update(watchlistArray => {
        const index = watchlistArray.findIndex((obj => obj.id == id));
        if (index >= 0){
          watchlistArray[index].currentPrice = price;
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
  fetch("https://api.coingecko.com/api/v3/simple/price?vs_currencies=usd&ids=" + symbols).then(result => {
    return result.json();
  }).then(json => {
    const timestamp = new Date();

    for (const cryptoId in json) {
      if (json.hasOwnProperty(cryptoId)) {
        const price = json[cryptoId].usd;
        watchlist.updatePrice(cryptoId, price);
      }
    }
    updateTimestamp(timestamp);
  }).catch(error => {
    infoMessages.addMessage("Error getting current prices.");
    console.error("Error getting current prices.", error);
    return [];
  });
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
  updateWatchlistPrices(value);
});
