import { derived, writable } from "svelte/store";
import { snackbar } from "../store";
import { getDollarDisplayValue, getPercentage } from "../utils";

export const portfolio = createPortfolio();
export const lastUpdated = writable(localStorage.getItem("portfolioLastUpdated") || "");
export const selectedItem = writable({});

const apiResponse = writable({});

// This has to exist to support migrating to the new variable
function getPortfolioFromLocalStorage() {
  const portfolio = localStorage.getItem("portfolio");
  const oldPortfolio = localStorage.getItem("wallet");

  if (portfolio) {
    return JSON.parse(portfolio);
  } else if (oldPortfolio) {
    return JSON.parse(oldPortfolio);
  } else {
    return [];
  }
}

function createPortfolio() {
  const { subscribe, set, update } = writable(getPortfolioFromLocalStorage()); // Not happy with this var but its already set so would break existing users if changed

  return {
    subscribe,
    addHolding: (apiData, amount) => {
      update((portfolioArray) => {
        const doesExist = portfolioArray.some((holding) => holding.id === apiData.id);
        if (!doesExist && apiData != null) {
          const newHolding = {
            id: apiData.id,
            name: apiData.name,
            symbol: apiData.symbol.toUpperCase(),
            amountHeld: amount,
            price: 0,
            value: 0,
          };

          return [...portfolioArray, newHolding];
        } else {
          throw new Error("Cryptocurrency already already exists in portfolio.");
        }
      });
    },
    updateAmount: (id, amount) => {
      update((portfolioArray) => {
        const index = portfolioArray.findIndex((obj) => obj.id == id);
        portfolioArray[index].amountHeld = amount;
        portfolioArray[index].value =
          parseFloat(portfolioArray[index].price) * parseFloat(amount);
        return [...portfolioArray];
      });
    },
    updatePrice: (id, price) => {
      // Price needs to stay part of portfolio and not just displayData or we run into some weird loading issues
      update((portfolioArray) => {
        const index = portfolioArray.findIndex((obj) => obj.id == id);
        portfolioArray[index].price = price;
        portfolioArray[index].value = parseFloat(price) * parseFloat(portfolioArray[index].amountHeld);
        return [...portfolioArray];
      });
    },
    removeItem: (id) => {
      update((portfolioArray) => portfolioArray.filter((holding) => holding.id !== id));
    },
    restoreFromFile: (fileData) => {
      const isArray = Array.isArray(fileData);
      let errorFlag = false;
      if (isArray) {
        // This just checks if the property exists, not the type. Could got that far but probably not needed.
        fileData.forEach((item) => {
          !(
            item.hasOwnProperty("id") &&
            item.hasOwnProperty("name") &&
            item.hasOwnProperty("symbol") &&
            item.hasOwnProperty("amountHeld")
          ) ? (errorFlag = true) : null;
        });
      }
      if (!errorFlag) {
        set(fileData);
      } else {
        console.error("Portfolio could not be restored.");
        snackbar.addMessage("Portfolio could not be restored.");
      }
    },
    reset: () => set([]),
  };
}

portfolio.subscribe((value) => {
  localStorage.setItem("portfolio", JSON.stringify(value));
});

export const totalValue = derived(portfolio, ($portfolio) => {
  let total = 0;
  $portfolio.forEach((item) => {
    if (item.value) {
      total += item.value;
    }
  });
  return total;
});

export const displayData = derived([portfolio, totalValue], ([$portfolio, $totalValue]) => {
  let returnData = [];

  $portfolio.forEach((item) => {
    const displayItem = { ...item };

    displayItem["details"] = [
      {
        name: "Portfolio Percentage",
        value: getPercentage(item.value, $totalValue),
        dataType: "default",
      },
      {
        name: "Quantity",
        value: item.amountHeld,
        dataType: "default",
      },
      {
        name: "Current Price",
        value: getDollarDisplayValue(item.price),
        dataType: "default",
      },
      {
        name: "Current Value",
        value: getDollarDisplayValue(item.value),
        dataType: "default",
      },
    ];

    returnData.push(displayItem);
  });

  // Sort by value
  returnData.sort(function(a, b) {
    return a["value"] - b["value"];
  }).reverse();

  return returnData;
});

export const updatePortfolioPrices = (symbols) => {
  if (symbols.length > 0) {
    snackbar.addMessage("Portfolio prices refreshing...");
    fetch("https://api.coingecko.com/api/v3/simple/price?vs_currencies=usd&ids=" + symbols)
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
    portfolio.updatePrice(key, value[key].usd);
  });
});

lastUpdated.subscribe((value) => {
  localStorage.setItem("portfolioLastUpdated", value);
});

export const portfolioSymbols = derived(portfolio, ($portfolio) => {
  return $portfolio.map((holding) => holding.id).toString();
});

portfolioSymbols.subscribe((value) => {
  updatePortfolioPrices(value);
});
