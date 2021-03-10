export const getDollarDisplayValue = (text) => {
  if (text) {
    text = text.toFixed(2);
    text = text.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return text;
};
