import {derived, writable} from "svelte/store";

export const portfolio = createPortfolio();
export const isAddMode = writable(false);
export const isEditMode = writable(false);

function createPortfolio() {
  const { subscribe, set, update } = writable(JSON.parse(localStorage.getItem("wallet")) || []); // Not happy with this var but its already set so would break existing users if changed

  return {
    subscribe,
    addHolding: (apiData, amount) => {
      update(portfolioArray => {
        const doesExist = portfolioArray.some((holding) => holding.id === apiData.id);
        if (!doesExist) {
          const newHolding = {
            "id": apiData.id,
            "name": apiData.name,
            "symbol": apiData.symbol.toUpperCase(),
            "amountHeld": amount,
            "lastPrice": 0,
            "value": 0,
          };

          return [...portfolioArray, newHolding];
        }
        return portfolioArray;
      });
    },
    updatePrice: (id, price) => {
      update(portfolioArray => {
        const index = portfolioArray.findIndex((obj => obj.id == id));
        if (index >= 0){
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
    removeHolding: (id) => {
      update(portfolioArray => portfolioArray.filter((holding) => holding.id !== id));
    },
    restoreFromFile: (portfolioToRestore) => {
      set(portfolioToRestore);
    },
    reset: () => set([]),
  };
}

portfolio.subscribe((value) => {
  localStorage.setItem("wallet", JSON.stringify(value));
  localStorage.setItem("portfolio", JSON.stringify(value));
});


export const displayData = derived([portfolio], ([$portfolio]) => {
  const returnData = [];
  $portfolio.forEach((holding) => {
    returnData.push(holding);
  });

  // Sort by value
  returnData.sort(function(a, b) {
    return a["value"] - b["value"];
  }).reverse();

  return returnData;
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

