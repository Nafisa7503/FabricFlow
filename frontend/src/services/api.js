const API_KEY = "";
const BASE_URL = "http://localhost:5000/api";

export const getTransactions = async () => {
    const response = await fetch(`${BASE_URL}/transaction`, {
      method: "GET",
    });
    const data = await response.json();
    return data.results;
  };
  