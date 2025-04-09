import mongoose from "mongoose";

import Order from "../models/order.model.js";
import Customer from "../models/customer.model.js";
import { getNextSequence } from "../utils/getNextSequence.js";



export const createOrder = async (req, res) => {
    const order = req.body; // req.body is the data that is sent to the server
    if (!order.orderDate || !order.deliveryDate || !order.status || !order.products || !order.payment ) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    try {
        // Find the customer using the customer_id sent from the frontend
        const customer = await Customer.findOne({ customer_id: order.customerID });
        if (!customer) {
            return res.status(404).json({ success: false, message: "Customer not found" });
        }

        // Replace customerID with the MongoDB _id of the customer
        order.customer = customer._id;

        // Generate the next order ID
        const nextId = await getNextSequence("order");
        order.order_id = `ORD-${nextId}`;

        // Create and save the new order
        const newOrder = new Order(order);
        await newOrder.save();

        // Populate product and customer details
        const populatedOrder = await Order.findById(newOrder._id)
            .populate("customer"); // Fetch customer details

        res.status(201).json({
            success: true,
            message: "Order created successfully",
            order: populatedOrder
        });

    } catch (error) {
        console.log("Error: ", error.message);
        res.status(500).json({ success: false, message: "Server error. Please try again." });
    }
};


export const deleteOrder = async (req, res) => {
    const { id } = req.params;

    // Check if the provided ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: `No order with id: ${id}` });
    }

    try {
        // Find and delete the order by ID
        const deletedOrder = await Order.findByIdAndDelete(id);

        // If no order is found, return a 404 response
        if (!deletedOrder) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        res.status(200).json({ success: true, message: "Order deleted successfully", order: deletedOrder });
    } catch (error) {
        console.log("Error: ", error.message);
        res.status(500).json({ success: false, message: "Server error. Please try again." });
    }
};


export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({})
            // .populate("product_id")  // Fetch product details
            .populate("customer"); // Fetch customer details

        res.status(200).json({ success: true, orders: orders });
    } catch (error) {
        console.log("Error: ", error.message);
        res.status(500).json({ success: false, message: "Error in fetching Orders" });
    }
};


export const recentOrders = async (req, res) => {
    try {
        // Find the last 5 orders, sorted by createdAt in descending order
        const orders = await Order.find({})
            .sort({ createdAt: -1 }) // Sort by createdAt in descending order
            .limit(5) // Limit the result to the last 5 orders
            .populate("customer"); // Fetch customer details

        res.status(200).json({ success: true, orders: orders });
    } catch (error) {
        console.log("Error: ", error.message);
        res.status(500).json({ success: false, message: "Error in fetching recent orders" });
    }
};


export const pendingOrders = async (req, res) => {
    try {
        // Find the 4 most recent orders where the status is not "delivered"
        const orders = await Order.find({ status: { $ne: "Delivered" } })
            .sort({ createdAt: -1 }) // Sort by createdAt in descending order
            .limit(4) // Limit the result to the 4 most recent orders
            .populate("customer"); // Fetch customer details

        res.status(200).json({ success: true, orders: orders });
    } catch (error) {
        console.log("Error: ", error.message);
        res.status(500).json({ success: false, message: "Error in fetching pending orders" });
    }
};


export const newOrders = async (req, res) => {
    try {
        // Count the total number of orders where the status is not "Delivered"
        const totalOrders = await Order.countDocuments({
            status: { $ne: "Delivered" }
        });

        res.status(200).json({ success: true, totalOrders });
    } catch (error) {
        console.log("Error: ", error.message);
        res.status(500).json({ success: false, message: "Error in fetching new orders" });
    }
};


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