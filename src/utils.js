export const getDollarDisplayValue = (text) => {
  if (text) {
    text = text.toFixed(2);
    text = text.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return "$" + text;
};

export const getPercentage = (value, total) => {
  return parseFloat((value / total) * 100).toFixed(2) + "%";
}