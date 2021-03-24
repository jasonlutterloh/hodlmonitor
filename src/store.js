import {derived, writable} from "svelte/store";

export const wallet = writable(JSON.parse(localStorage.getItem("wallet")) || []);

wallet.subscribe((value) => {
  localStorage.setItem("wallet", JSON.stringify(value));
});

export const commaSeparatedHoldings = derived(wallet, ($wallet) => {
  return $wallet.map((holding)=> holding.id).toString();
});

export const totalValue = derived(wallet, ($wallet) => {
  let total = 0;
  $wallet.forEach((holding) => {
    total += holding.value;
  });
  return total;
});

export const displayData = derived([wallet, totalValue], ([$wallet, $totalValue]) => {
  const returnData = [];
  $wallet.forEach((holding) => {
    holding.price = parseFloat(holding.priceUsd);
    holding.value = (parseFloat(holding.priceUsd) * parseFloat(holding.amountHeld));
    holding.percentage = parseFloat((holding.value / $totalValue) * 100).toFixed(2);
    returnData.push(holding);
  });

  // Sort by value
  returnData.sort(function(a, b) {
    return a["value"] - b["value"];
  }).reverse();

  return returnData;
});
