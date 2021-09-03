import { derived, writable } from "svelte/store";
import { snackbar } from "../store";
import { getDollarDisplayValue, getPercentage } from "../utils";

export const portfolio = createPortfolio();
export const isEditMode = writable(false);
export const lastUpdated = writable("");
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
          parseFloat(portfolioArray[index].lastPrice) * parseFloat(amount);
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

export const displayData = derived([portfolio, apiResponse], ([$portfolio, $apiResponse]) => {
  const returnData = [];

  if (Object.keys($apiResponse).length > 0) {
    $portfolio.forEach((item) => {
      const displayItem = { ...item };
      const itemApiData = $apiResponse[displayItem.id];

      const price = itemApiData?.usd ? itemApiData.usd : 0;
      displayItem.lastPrice = price;
      displayItem.value = parseFloat(price) * parseFloat(displayItem.amountHeld);
      displayItem["details"] = [
        {
          name: "Quantity",
          value: displayItem.amountHeld,
          color: "var(--text-color)",
        },
        {
          name: "Current Price",
          value: getDollarDisplayValue(price),
          color: "var(--text-color)",
        },
        {
          name: "Current Value",
          value: getDollarDisplayValue(displayItem.value),
          color: "var(--text-color)",
        },
      ];

      returnData.push(displayItem);
    });

    const totalValue = returnData.reduce((accumulator, current) => accumulator + current.value, 0);

    returnData.forEach((item) => {
      const detail = {
        name: "Portfolio Percentage",
        value: getPercentage(item.value, totalValue),
        color: "var(--text-color)",
      };
      item["details"].unshift(detail);
    });

    // Sort by value
    returnData.sort(function(a, b) {
      return a["value"] - b["value"];
    }).reverse();
  }
  return returnData;
});

export const totalValue = derived(displayData, ($displayData) => {
  let total = 0;
  $displayData.forEach((item) => {
    if (item.value) {
      total += item.value;
    }
  });
  return total;
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
  const timestamp = new Date();
  lastUpdated.set(timestamp.toLocaleDateString() + " " + timestamp.toLocaleTimeString());
});

export const portfolioSymbols = derived(portfolio, ($portfolio) => {
  return $portfolio.map((holding) => holding.id).toString();
});

portfolioSymbols.subscribe((value) => {
  updatePortfolioPrices(value);
});
