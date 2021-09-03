import { derived, writable } from "svelte/store";
import { getDollarDisplayValue, getPercentage, getColor } from "../utils";
import { snackbar } from "../store";

export const watchlist = createWatchlist();
export const apiResponse = writable([]);
export const lastUpdated = writable("");
export const selectedId = writable(null);

function createWatchlist() {
  const { subscribe, set, update } = writable(JSON.parse(localStorage.getItem("watchlist")) || []);

  return {
    subscribe,
    addItem: (apiData) => {
      update((watchlistArray) => {
        const doesExist = watchlistArray.some((item) => item.id === apiData.id);
        if (!doesExist && apiData != null) {
          const newItem = {
            id: apiData.id,
            name: apiData.name,
            symbol: apiData.symbol.toUpperCase(),
          };

          return [...watchlistArray, newItem];
        } else {
          throw new Error("Cryptocurrency already already exists in watchlist.");
        }
      });
    },
    removeItem: (id) => {
      update((watchlistArray) =>
        watchlistArray.filter((item) => item.id !== id),
      );
    },
    restoreFromFile: (fileData) => {
      const isArray = Array.isArray(fileData);
      let errorFlag = false;
      if (isArray) {
        // This just checks if the property exists, not the type. Could go that far but probably not needed.
        fileData.forEach((item) => {
          !(
            item.hasOwnProperty("id") &&
            item.hasOwnProperty("name") &&
            item.hasOwnProperty("symbol")
          ) ? (errorFlag = true) : null;
        });
      }
      if (!errorFlag) {
        set(fileData);
      } else {
        console.error("Watchlist could not be restored.");
        snackbar.addMessage("Watchlist could not be restored.");
      }
    },
    reset: () => set([]),
  };
}

watchlist.subscribe((value) => {
  localStorage.setItem("watchlist", JSON.stringify(value));
});

export const displayData = derived([watchlist, apiResponse], ([$watchlist, $apiResponse]) => {
  const returnData = [];
  $watchlist.forEach((item) => {
    const displayItem = {...item};
    const index = $apiResponse.findIndex((obj) => obj.id === displayItem.id);
    if (index >= 0) {
      const apiItem = $apiResponse[index];
      const currentPrice = apiItem.current_price;
      const priceChangePercentage = getPercentage(apiItem.price_change_percentage_24h, 100);
      const priceChange = getDollarDisplayValue(apiItem.price_change_24h);

      displayItem.currentPrice = currentPrice;

      displayItem.details = [
        {
          name: "Current Price",
          value: getDollarDisplayValue(currentPrice),
          color: "var(--text-color)",
        },
        {
          name: "24hr % Change",
          value: priceChangePercentage,
          color: getColor(priceChangePercentage),
        },
        {
          name: "All Time High",
          value: getDollarDisplayValue(apiItem.ath),
          color: "var(--text-color)",
        },
        {
          name: "24hr Price Change",
          value: priceChange,
          color: getColor(priceChange),
        },
      ];

      returnData.push(displayItem);
    }
  });

  return returnData;
});

export const updateWatchlistPrices = (symbols) => {
  if (symbols.length > 0) {
    snackbar.addMessage("Watchlist prices refreshing...");
    fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=" +
        symbols +
        "&order=market_cap_desc&per_page=250&page=1&sparkline=false&price_change_percentage=24h",
    )
        .then((result) => {
          return result.json();
        })
        .then((json) => {
          apiResponse.set(json);
        })
        .catch((error) => {
          snackbar.addMessage("Error getting current prices.");
          console.error("Error getting current prices.", error);
          return [];
        });
  }
};

apiResponse.subscribe((value) => {
  const timestamp = new Date();
  lastUpdated.set(timestamp.toLocaleDateString() + " " + timestamp.toLocaleTimeString());
});

export const watchlistSymbols = derived(watchlist, ($watchlist) => {
  return $watchlist.map((item) => item.id).toString();
});

watchlistSymbols.subscribe((value) => {
  updateWatchlistPrices(value);
});
