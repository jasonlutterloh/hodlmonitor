export async function searchCurrency(searchText) {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  return fetch("https://api.coincap.io/v2/assets?search="+searchText, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log("Search Results", result);
        return result.data;
      })
      .catch((error) => {
        console.log("Error with Search", error);
        throw error;
      });
};
