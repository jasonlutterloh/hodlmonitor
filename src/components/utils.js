export const getDisplayValue = (text) => {
  let displayValue = text.toFixed(2);
  displayValue = displayValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return displayValue;
}