import { derived, writable } from 'svelte/store';

export const nomicsData = writable([]);
export const wallet = writable([]);
export const displayData = derived([nomicsData, wallet], ([$nomicsData, $wallet]) => {
  let returnData = [];
  if ($nomicsData && $nomicsData.length > 0){
    console.log("Nomics Data", $nomicsData);
    $wallet.forEach((holding) => {
      let data = $nomicsData.find(x => x.id === holding.symbol);
      holding.logo = data.logo_url;
      holding.price = parseFloat(data.price);
      holding.name = data.name;
      holding.value = (parseFloat(data.price) * parseFloat(holding.amountHeld));
      returnData.push(holding);
    });
  }
  return returnData;
});



export const totalValue = derived(displayData, $displayData => {
  let total = 0;
  $displayData.forEach(holding => {
    total += holding.value;
  })
  return total
});