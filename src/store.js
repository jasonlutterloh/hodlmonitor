import {derived, writable} from "svelte/store";

export const cryptoList = writable(JSON.parse(localStorage.getItem("list")) || []);
export const wallet = createWallet();
export const lastUpdated = writable(localStorage.getItem("lastUpdated") || "");

function createWallet() {
  const { subscribe, set, update } = writable(JSON.parse(localStorage.getItem("wallet")) || []);

  return {
    subscribe,
    addHolding: (apiData, amount) => {
      update(walletArray => {
        const doesExist = walletArray.some((holding) => holding.id === apiData.id);
        if (!doesExist) {
          const newHolding = {
            "id": apiData.id,
            "name": apiData.name,
            "symbol": apiData.symbol.toUpperCase(),
            "amountHeld": amount,
            "lastPrice": 0,
            "value": 0,
          };

          return [...walletArray, newHolding];
        }
        return walletArray;
      });
    },
    updatePrice: (id, price) => {
      update(walletArray => {
        const index = walletArray.findIndex((obj => obj.id == id));
        walletArray[index].lastPrice = price;
        walletArray[index].value = (parseFloat(price) * parseFloat(walletArray[index].amountHeld));
        return [...walletArray];
      });
    },
    updateAmount: (id, amount) => {
      update(walletArray => {
        const index = walletArray.findIndex((obj => obj.id == id));
        walletArray[index].amountHeld = amount;
        walletArray[index].value = (parseFloat(walletArray[index].lastPrice) * parseFloat(amount));
        return [...walletArray];
      });
    },
    removeHolding: (id) => {
      update(walletArray => walletArray.filter((holding) => holding.id !== id));
    },
    restoreFromFile: (walletToRestore) => {
      set(walletToRestore);
    },
    reset: () => set([]),
  };
}

export const updatePrices = (commaSeparatedHoldings) => {
  fetch("https://api.coingecko.com/api/v3/simple/price?vs_currencies=usd&ids=" + commaSeparatedHoldings).then(result => {
    return result.json();
  }).then(json => {
    const timestamp = new Date();

    for (const cryptoId in json) {
      if (json.hasOwnProperty(cryptoId)) {
        const price = json[cryptoId].usd;
        wallet.updatePrice(cryptoId, price);
      }
    }

    updateTimestamp(timestamp);
  }).catch(error => {
    console.error("Error getting prices", error);
    return [];
  });
};

const updateTimestamp = (timestamp) => {
  lastUpdated.set(timestamp.toLocaleDateString() + " " + timestamp.toLocaleTimeString());
};

wallet.subscribe((value) => {
  localStorage.setItem("wallet", JSON.stringify(value));
});

cryptoList.subscribe((value) => {
  localStorage.setItem("list", JSON.stringify(value));
});

lastUpdated.subscribe((value) => {
  localStorage.setItem("lastUpdated", value);
});

export const commaSeparatedHoldings = derived(wallet, ($wallet) => {
  return $wallet.map((holding)=> holding.id).toString();
});

commaSeparatedHoldings.subscribe(value => {
  updatePrices(value);
});

export const displayData = derived([wallet], ([$wallet]) => {
  const returnData = [];
  $wallet.forEach((holding) => {
    returnData.push(holding);
  });

  // Sort by value
  returnData.sort(function(a, b) {
    return a["value"] - b["value"];
  }).reverse();

  return returnData;
});

export const totalValue = derived(wallet, ($wallet) => {
  let total = 0;
  $wallet.forEach((holding) => {
    if (holding.value) {
      total += holding.value;
    }
  });
  return total;
});
