import {derived, writable} from "svelte/store";

export const watchlist = createWatchlist();
export const isAddMode = writable(false);

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
    restoreFromFile: (watchlistToRestore) => {
      //TODO fix this
      set(watchlistToRestore);
    },
    reset: () => set([]),
  };
}

watchlist.subscribe((value) => {
  localStorage.setItem("watchlist", JSON.stringify(value));
});