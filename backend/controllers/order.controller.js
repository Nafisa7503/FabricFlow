import mongoose from "mongoose";

import Order from "../models/order.model.js";



export const createOrder =async (req,res) => {
    const order = req.body; //req.body is the data that is sent to the server
    if (!order.order_date || !order.delivery_date || !order.order_status || !order.quantity || !order.total_amount || !order.paid_amount || !order.due_amount || !order.total_amount || !order.customer_id || !order.product_id) {
        return res.status(400).json({success: false, message: "All fields are required"});
    }

    

    try {
        const nextId = await getNextSequence("order");
        order.order_id = `ORD-${nextId}`;
        const newOrder= new Order(order)
        await newOrder.save();
    
        // Populate product and customer details
        const populatedOrder = await Order.findById(newOrder._id)
            .populate("product_id")  // Fetch product details
            .populate("customer_id"); // Fetch customer details
    
        res.status(201).json({
            success: true,
            message: "Order created successfully",
            order: populatedOrder
        });
    
    } catch (error) {
        console.log("Error: ", error.message);
        res.status(500).json({success: false, message: "Server error. Please try again."});
    }
}


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



export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({})
            .populate("product_id")  // Fetch product details
            .populate("customer_id"); // Fetch customer details

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