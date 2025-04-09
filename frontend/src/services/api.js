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

  export const expenseBreakdown = async () => {
    const response = await fetch(`${BASE_URL}/transaction/expense`, {
      method: "GET",
    });
    const data = await response.json();
    return data;
  };

  export const totalIncome = async () => {
    const response = await fetch(`${BASE_URL}/transaction/income`, {
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

  export const totalProducts = async () => {
    const response = await fetch(`${BASE_URL}/product/total`, {
      method: "GET",
    });
    const data = await response.json();
    return data;
  };


  export const lowInventory = async () => {
    const response = await fetch(`${BASE_URL}/product/inventory`, {
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

  export const updateStock = async (productId, updatedData) => {
    try {
      const response = await fetch(`${BASE_URL}/product/update/${productId}`, {
        method: "PUT", // Use PUT for updating the stock
        headers: {
          "Content-Type": "application/json", // Ensure the content type is JSON
        },
        body: JSON.stringify(updatedData), // Send the updated stock data in the request body
      });
  
      if (!response.ok) {
        // If the response is not okay (status code outside 2xx range)
        throw new Error("Failed to update stock");
      }
  
      const data = await response.json();
      return data; // Return the response data if successful
    } catch (error) {
      console.error("Error updating stock:", error);
      throw error; // Rethrow the error to be caught in the calling function
    }
  };

  export const deleteProduct = async (productId) => {
    try {
      const response = await fetch(`${BASE_URL}/product/${productId}`, {
        method: "DELETE", // Use DELETE for removing a product
      });
  
      if (!response.ok) {
        // If the response is not okay (status code outside 2xx range)
        throw new Error("Failed to delete product");
      }
  
      const data = await response.json();
      return data; // Return the response data if successful
    } catch (error) {
      console.error("Error deleting product:", error);
      throw error; // Rethrow the error to be caught in the calling function
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

  export const totalCustomers = async () => {
    const response = await fetch(`${BASE_URL}/customer/total`, {
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

  export const recentOrders = async () => {
    const response = await fetch(`${BASE_URL}/order/recent`, {
      method: "GET",
    });
    const data = await response.json();
    return data;
  };

  export const newOrders = async () => {
    const response = await fetch(`${BASE_URL}/order/new`, {  //returns number of orders in last month
      method: "GET",
    });
    const data = await response.json();
    return data;
  };

  export const pendingOrders = async () => {
    const response = await fetch(`${BASE_URL}/order/pending`, {
      method: "GET",
    });
    const data = await response.json();
    return data;
  };

  export const postOrders = async (orderData) => {
    try {
      console.log("This works")
      console.log(orderData)
      const response = await fetch(`${BASE_URL}/order`, {
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
