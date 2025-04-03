const API_KEY = "";
const BASE_URL = "http://localhost:5000/api";





//TRANSACTION APIs

export const getTransactions = async () => {
    const response = await fetch(`${BASE_URL}/transaction`, {
      method: "GET",
    });
    const data = await response.json();
    return data;
  };

  export const postTransactions = async (transactionData) => {
    try {
      const response = await fetch(`${BASE_URL}/transaction`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Make sure to set content type
        },
        body: JSON.stringify(transactionData), // Send the transaction data in the request body
      });
  
      if (!response.ok) {
        // If the response is not okay (status code outside 2xx range)
        throw new Error("Failed to submit transaction");
      }
  
      const data = await response.json();
      return data; // Return the response data if successful
    } catch (error) {
      console.error("Error posting transaction:", error);
      throw error; // Rethrow the error to be caught in the form submission handler
    }
  };
  
  //PRODUCT APIs
  export const getProducts = async () => {
    const response = await fetch(`${BASE_URL}/product`, {
      method: "GET",
    });
    const data = await response.json();
    return data;
  };

  export const postProducts = async (productData) => {
    try {
      const response = await fetch(`${BASE_URL}/product`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Make sure to set content type
        },
        body: JSON.stringify(productData), // Send the transaction data in the request body
      });
  
      if (!response.ok) {
        // If the response is not okay (status code outside 2xx range)
        throw new Error("Failed to submit transaction");
      }
  
      const data = await response.json();
      return data; // Return the response data if successful
    } catch (error) {
      console.error("Error posting transaction:", error);
      throw error; // Rethrow the error to be caught in the form submission handler
    }
  }; 