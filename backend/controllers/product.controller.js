import mongoose from "mongoose";

import Product from "../models/product.model.js";



export const createProduct =async (req,res) => {
    const product = req.body; //req.body is the data that is sent to the server
    if (!product.fabric_name || !product.fabric_type || !product.color || !product.pattern || !product.quantity || !product.price || !product.quality ) {
        return res.status(400).json({success: false, message: "All fields are required"});
    }

    const newProduct= new Product(product)

    try {
        await newProduct.save();
        res.status(201).json({success: true, message: "Product created successfully", product: newProduct});

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


export const getProducts = async (req,res) => {

    try {
        const products = await Product.find({});
        res.status(201).json({success: true, products: products});

    } catch (error) {
        console.log("Error: ", error.message);
        res.status(404).json({success: false, message: "Error in fetching Products"}); 
}
}



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