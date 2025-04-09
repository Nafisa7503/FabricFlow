import mongoose from "mongoose";

import Product from "../models/product.model.js";
import { getNextSequence } from "../utils/getNextSequence.js";




export const createProduct =async (req,res) => {
    const product = req.body; //req.body is the data that is sent to the server
    if (!product.fabric_name || !product.fabric_type || !product.color || !product.pattern || !product.quantity || !product.price || !product.quality ) {
        return res.status(400).json({success: false, message: "All fields are required"});
    }

    

    try {
        const nextId = await getNextSequence("product");
        product.fabric_id = `FB-${nextId}`;
        const newProduct= new Product(product)
        await newProduct.save();
        res.status(201).json({success: true, message: "Product created successfully", product: newProduct});

    } catch (error) {
        console.log("Error: ", error.message);
        res.status(500).json({success: false, message: "Server error. Please try again."});
    }

}



export const getProducts = async (req,res) => {

    try {
        const products = await Product.find({});
        res.status(201).json({success: true, products: products});

    } catch (error) {
        console.log("Error: ", error.message);
        res.status(404).json({success: false, message: "Error in fetching Products"}); 
}
}



export const totalProducts = async (req, res) => {
    try {
        // Count the total number of products in the database
        const total = await Product.countDocuments({});
        res.status(200).json({ success: true, totalProducts: total });
    } catch (error) {
        console.log("Error: ", error.message);
        res.status(500).json({ success: false, message: "Error in fetching total products" });
    }
};


export const lowInventory = async (req, res) => {
    try {
        // Find the products with quantity less than 10, sort them in ascending order, and limit to 3
        const products = await Product.find({ quantity: { $lt: 10 } }) // Filter products with quantity < 10
            .sort({ quantity: 1 }) // Sort by quantity in ascending order
            .limit(10); // Limit the result to 3 products

        res.status(200).json({ success: true, products });
    } catch (error) {
        console.log("Error: ", error.message);
        res.status(500).json({ success: false, message: "Error in fetching low inventory products" });
    }
};


export const updateStock = async (req, res) => {
    const { id } = req.params; // Extract product ID from the request parameters

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: `No product with id: ${id}` });
    }

    try {
        // Find the product by ID and increment its quantity by 1
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { $inc: { quantity: 1 } }, // Increment the quantity field by 1
            { new: true } // Return the updated document
        );

        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.status(200).json({ success: true, message: "Stock updated successfully", product: updatedProduct });
    } catch (error) {
        console.log("Error: ", error.message);
        res.status(500).json({ success: false, message: "Error in updating stock" });
    }
};