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