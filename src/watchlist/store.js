import { derived, writable } from "svelte/store";
import { getDollarDisplayValue, getPercentage} from "../utils";
import { snackbar } from "../store";

export const watchlist = createWatchlist();
export const lastUpdated = writable(localStorage.getItem("watchlistLastUpdated") || "");
export const selectedId = writable(null);

const apiResponse = writable([]);

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
            price: 0,
          };

          return [...watchlistArray, newItem];
        } else {
          throw new Error("Cryptocurrency already already exists in watchlist.");
        }
      });
    },
    updateData: (apiData) => {
      // Price needs to stay part of portfolio and not just displayData or we run into some weird loading issues
      update((watchlistArray) => {
        const index = watchlistArray.findIndex((obj) => obj.id == apiData.id);
        watchlistArray[index].price = apiData.current_price;
        watchlistArray[index].ath = apiData.ath;
        watchlistArray[index].priceChange24hPercentage = apiData.price_change_percentage_24h;
        watchlistArray[index].priceChange24h = apiData.price_change_24h;
        return [...watchlistArray];
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
  let returnData = [];

  $watchlist.forEach((item) => {
    const displayItem = {...item};
    const priceChange24hPercentage = getPercentage(item.priceChange24hPercentage, 100);
    const priceChange24h = getDollarDisplayValue(item.priceChange24h);

    displayItem.details = [
      {
        name: "Current Price",
        value: getDollarDisplayValue(item.price),
        dataType: "neutral",
      },
      {
        name: "24hr % Change",
        value: priceChange24hPercentage,
        dataType: priceChange24hPercentage.includes("-") ? "negative" : "positive",
      },
      {
        name: "All Time High",
        value: getDollarDisplayValue(item.ath),
        dataType: "neutral",
      },
      {
        name: "24hr Price Change",
        value: priceChange24h,
        dataType: priceChange24h.includes("-") ? "negative" : "positive",
      },
    ];

    returnData.push(displayItem);
  });

  returnData.sort(function(a, b) {
    const textA = a.symbol.toUpperCase();
    const textB = b.symbol.toUpperCase();
    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
  });

  return returnData;
});

export const updateWatchlistPrices = (symbols) => {
  if (symbols.length > 0) {
    snackbar.addMessage("Watchlist prices refreshing...", 2000);
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
  if (Object.keys(value).length > 0) {
    const timestamp = new Date();
    lastUpdated.set(timestamp.toLocaleDateString() + " " + timestamp.toLocaleTimeString());
  }
  Object.keys(value).forEach(key => {
    watchlist.updateData(value[key]);
  });
});

lastUpdated.subscribe((value) => {
  localStorage.setItem("watchlistLastUpdated", value);
});

export const watchlistSymbols = derived(watchlist, ($watchlist) => {
  return $watchlist.map((item) => item.id).toString();
});

watchlistSymbols.subscribe((value) => {
  updateWatchlistPrices(value);
});
