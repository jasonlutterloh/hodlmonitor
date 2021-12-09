// TODO: Write some unit tests for this! (I know, I know... I'm being lazy.)
export const getDollarDisplayValue = (text) => {
  if (text) {
    let makePretty = false;
    const decimalIndex = text.toString().indexOf(".");
    if (decimalIndex >= 1) {
      const numberBeforeDecimal = parseInt(text.toString().substring(0, decimalIndex));
      makePretty = numberBeforeDecimal > 0 ? true : false;
    } else {
      makePretty = true;
    }
    
    if (makePretty) {
      text = text.toFixed(2);
      text = text.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  } else {
    text = 0;
  }

  return "$" + text;
};

export const getPercentage = (value, total) => {
  return parseFloat((value / total) * 100).toFixed(2) + "%";
};
