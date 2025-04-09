import mongoose from "mongoose";

import Customer from "../models/customer.model.js";
import Counter from "../models/counter.model.js";
import { getNextSequence } from "../utils/getNextSequence.js";
import Order from "../models/order.model.js";

export const createCustomer = async (req, res) => {
    const customer = req.body;
  
    if (!customer.name || !customer.email || !customer.phone || !customer.address || !customer.most_purchased) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }
  
    try {
      // Get and increment the sequence value
      const nextId = await getNextSequence("customer");
    customer.customer_id = `CUS-${nextId}`;

    const newCustomer = new Customer(customer);
    await newCustomer.save();
  
      res.status(201).json({
        success: true,
        message: "Customer created successfully",
        customer: newCustomer,
      });
    } catch (error) {
      console.log("Error: ", error.message);
      res.status(500).json({ success: false, message: "Server error. Please try again." });
    }
  };

  export const totalCustomer = async (req, res) => {
    try {
        // Count the total number of customers in the database
        const total = await Customer.countDocuments({});
        res.status(200).json({ success: true, totalCustomers: total });
    } catch (error) {
        console.log("Error: ", error.message);
        res.status(500).json({ success: false, message: "Error in fetching total customers" });
    }
};
  

export const getCustomer = async (req, res) => {
    try {
        // Retrieve all customers
        const customers = await Customer.find({});

        // For each customer, calculate the required details
        const customerDetails = await Promise.all(
            customers.map(async (customer) => {
                // Fetch all orders for the customer
                const orders = await Order.find({ customer: customer._id }).sort({ orderDate: -1 });

                // Calculate total spent (sum of paidAmount in all orders)
                const totalSpent = orders.reduce((sum, order) => sum + order.payment.paidAmount, 0);

                // Get the date of the last purchase (from the most recent order)
                const lastOrder = orders[0];
                const lastPurchase = lastOrder ? lastOrder.orderDate : "N/A";

                // Total number of orders
                const totalOrders = orders.length;

                return {
                    customer_id: customer.customer_id,
                    name: customer.name,
                    email: customer.email,
                    phone: customer.phone,
                    address: customer.address,
                    most_purchased: customer.most_purchased,
                    lastPurchase,
                    totalSpent,
                    totalOrders,
                };
            })
        );

        res.status(200).json({ success: true, customers: customerDetails });
    } catch (error) {
        console.log("Error: ", error.message);
        res.status(500).json({ success: false, message: "Error in fetching customer details" });
    }
};


// export const deleteProducts = async (req,res) => {
//     const {id} = req.params;

//     if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({message:`No product with id: ${id}`});
//     try{
//         await Product.findByIdAndDelete(id);
//         res.status(201).json({success: true, message: "Product deleted successfully"});

//     } catch (error) {
//         console.log("Error: ", error.message);
//         res.status(500).json({success: false, message: "Update failed"});
//     }
// }


// export const getProducts = async (req,res) => {

//     try {
//         const products = await Product.find({});
//         res.status(201).json({success: true, products: products});

//     } catch (error) {
//         console.log("Error: ", error.message);
//         res.status(404).json({success: false, message: "Error in fetching Products"}); 
// }
// }



// export const updateProducts = async (req,res) => { //put is used to update all the data, patch is used to update some data
//     const {id} = req.params;
//     const product = req.body;
//     if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({message:`No product with id: ${id}`});
//     try{
//         const updatedProduct =await Product.findByIdAndUpdate(id,product, {new: true});
//         res.status(201).json({success: true, message: "Product deleted successfully", product: updatedProduct});

//     } catch (error) {
//         console.log("Error: ", error.message);
//         res.status(500).json({success: false, message: "Server Error"});
//     }
// }