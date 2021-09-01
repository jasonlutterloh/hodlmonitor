import {derived, writable} from "svelte/store";
import { infoMessages } from "../store";
import {getDollarDisplayValue, getPercentage} from "../utils";

export const portfolio = createPortfolio();
export const isAddMode = writable(false);
export const isEditMode = writable(false);
export const lastUpdated = writable(localStorage.getItem("portfolioLastUpdated") || "");
export const selectedItem = writable({});

// This has to exist to support migrating to the new variable
function getPortfolioFromLocalStorage() {
  const portfolio = localStorage.getItem("portfolio");
  const oldPortfolio = localStorage.getItem("wallet");
  console.log(portfolio);
  console.log(oldPortfolio);
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
      update(portfolioArray => {
        const doesExist = portfolioArray.some((holding) => holding.id === apiData.id);
        if (!doesExist && apiData != null) {
          const newHolding = {
            "id": apiData.id,
            "name": apiData.name,
            "symbol": apiData.symbol.toUpperCase(),
            "amountHeld": amount,
            "lastPrice": 0,
            "value": 0,
          };

          return [...portfolioArray, newHolding];
        } else {
          throw new Error("Cryptocurrency already already exists in portfolio.");
        }
      });
    },
    updatePrice: (id, price) => {
      update(portfolioArray => {
        const index = portfolioArray.findIndex((obj => obj.id == id));
        if (index >= 0) {
          portfolioArray[index].lastPrice = price;
          portfolioArray[index].value = (parseFloat(price) * parseFloat(portfolioArray[index].amountHeld));
          return [...portfolioArray];
        }
        return portfolioArray;
      });
    },
    updateAmount: (id, amount) => {
      update(portfolioArray => {
        const index = portfolioArray.findIndex((obj => obj.id == id));
        portfolioArray[index].amountHeld = amount;
        portfolioArray[index].value = (parseFloat(portfolioArray[index].lastPrice) * parseFloat(amount));
        return [...portfolioArray];
      });
    },
    removeItem: (id) => {
      update(portfolioArray => portfolioArray.filter((holding) => holding.id !== id));
    },
    restoreFromFile: (fileData) => {
      const isArray = Array.isArray(fileData);
      let errorFlag = false;
      if (isArray) {
        // This just checks if the property exists, not the type. Could got that far but probably not needed.
        fileData.forEach(item => {
          !(
            item.hasOwnProperty("id") &&
            item.hasOwnProperty("name") &&
            item.hasOwnProperty("symbol") &&
            item.hasOwnProperty("amountHeld") &&
            item.hasOwnProperty("lastPrice") &&
            item.hasOwnProperty("value")
          ) ? errorFlag = true : null;
        });
      }
      if (!errorFlag) {
        set(fileData);
      } else {
        console.error("Portfolio could not be restored.");
        infoMessages.addMessage("Portfolio could not be restored.");
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
  $portfolio.forEach((holding) => {
    if (holding.value) {
      total += holding.value;
    }
  });
  return total;
});

export const displayData = derived([portfolio, totalValue], ([$portfolio, $totalValue]) => {
  const returnData = [];
  $portfolio.forEach((item) => {
    const displayItem = {...item};
    displayItem["details"] = [
      {
        name: "Portfolio Percentage",
        value: getPercentage(item.value, $totalValue),
        color: "var(--text-color)",
      },
      {
        name: "Quantity",
        value: item.amountHeld,
        color: "var(--text-color)",
      },
      {
        name: "Current Price",
        value: getDollarDisplayValue(item.lastPrice),
        color: "var(--text-color)",
      },
      {
        name: "Current Value",
        value: getDollarDisplayValue(item.value),
        color: "var(--text-color)",
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
  fetch("https://api.coingecko.com/api/v3/simple/price?vs_currencies=usd&ids=" + symbols).then(result => {
    return result.json();
  }).then(json => {
    const timestamp = new Date();

    for (const cryptoId in json) {
      if (json.hasOwnProperty(cryptoId)) {
        const price = json[cryptoId].usd;
        portfolio.updatePrice(cryptoId, price);
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
  localStorage.setItem("portfolioLastUpdated", value);
});

export const portfolioSymbols = derived(portfolio, ($portfolio) => {
  return $portfolio.map((holding)=> holding.id).toString();
});

portfolioSymbols.subscribe(value => {
  updatePortfolioPrices(value);
});
