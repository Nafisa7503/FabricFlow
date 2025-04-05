import mongoose from "mongoose";

import Transaction from "../models/transaction.model.js";
import { getNextSequence } from "../utils/getNextSequence.js";



export const createTransaction =async (req,res) => {
    const transaction = req.body; //req.body is the data that is sent to the server
    if (!transaction.description || !transaction.category || !transaction.type || !transaction.amount || !transaction.payment_method) {
        return res.status(400).json({success: false, message: "All fields are required"});
    }

    

    try {
        const nextId = await getNextSequence("customer");
        transaction.transaction_id = `TR-${nextId}`;
        const newTransaction= new Transaction(transaction)
        await newTransaction.save();
        res.status(201).json({success: true, message: "Product created successfully", transaction: newTransaction});

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


export const getTransactions = async (req,res) => {

    try {
        const transactions = await Transaction.find({});
        res.status(201).json({success: true, transactions: transactions});

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