export const getDollarDisplayValue = (text) => {
  if (text) {
    text = text.toFixed(2);
    text = text.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return "$" + text;
};

export const getPercentage = (value, total) => {
  return parseFloat((value / total) * 100).toFixed(2) + "%";
};

export const getColor = (value) => {
  return value.includes("-") ? "rgba(255,73,73,1)" : "rgba(1,204,3,1)";
};