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
      console.log("This works")
      console.log(productData)
      const response = await fetch(`${BASE_URL}/product`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Make sure to set content type
        },
        body: JSON.stringify(productData), // Send the transaction data in the request body
      });
      console.log(response)
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

  //CUSTOMER APIs
  export const getCustomers = async () => {
    const response = await fetch(`${BASE_URL}/customer`, {
      method: "GET",
    });
    const data = await response.json();
    return data;
  };

  export const postCustomers = async (customerData) => {
    try {
      console.log("This works")
      console.log(customerData)
      const response = await fetch(`${BASE_URL}/customer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Make sure to set content type
        },
        body: JSON.stringify(customerData), // Send the transaction data in the request body
      });
      console.log(response)
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



  //ORDER APIs
  export const getOrders = async () => {
    const response = await fetch(`${BASE_URL}/order`, {
      method: "GET",
    });
    const data = await response.json();
    return data;
  };

  export const postOrders = async (orderData) => {
    try {
      console.log("This works")
      console.log(orderData)
      const response = await fetch(`${BASE_URL}/customer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Make sure to set content type
        },
        body: JSON.stringify(orderData), // Send the transaction data in the request body
      });
      console.log(response)
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