import mongoose from "mongoose";

import Transaction from "../models/transaction.model.js";
import { getNextSequence } from "../utils/getNextSequence.js";



export const createTransaction =async (req,res) => {
    const transaction = req.body; //req.body is the data that is sent to the server
    if (!transaction.description || !transaction.category || !transaction.type || !transaction.amount || !transaction.payment_method) {
        return res.status(400).json({success: false, message: "All fields are required"});
    }

    

    try {
        const nextId = await getNextSequence("transaction");
        transaction.transaction_id = `TR-${nextId}`;
        const newTransaction= new Transaction(transaction)
        await newTransaction.save();
        res.status(201).json({success: true, message: "Product created successfully", transaction: newTransaction});

    } catch (error) {
        console.log("Error: ", error.message);
        res.status(500).json({success: false, message: "Server error. Please try again."});
    }

}



export const getTransactions = async (req,res) => {

    try {
        const transactions = await Transaction.find({});
        res.status(201).json({success: true, transactions: transactions});

    } catch (error) {
        console.log("Error: ", error.message);
        res.status(404).json({success: false, message: "Error in fetching Products"}); 
}
}



export const totalIncome = async (req, res) => {
    try {
        // Find all transactions with type "income" and sum their amounts
        const total = await Transaction.aggregate([
            { $match: { type: "income" } }, // Filter transactions with type "income"
            { $group: { _id: null, totalIncome: { $sum: "$amount" } } } // Sum the "amount" field
        ]);

        // If no income transactions are found, return 0
        const totalIncome = total.length > 0 ? total[0].totalIncome : 0;

        res.status(200).json({ success: true, totalIncome });
    } catch (error) {
        console.log("Error: ", error.message);
        res.status(500).json({ success: false, message: "Error in fetching total income" });
    }
};


export const expenseBreakdown = async (req, res) => {
    try {
        // Aggregate transactions with type "expense", group by category, and sum their amounts
        const expenses = await Transaction.aggregate([
            { $match: { type: "expense" } }, // Filter transactions with type "expense"
            { $group: { _id: "$category", totalAmount: { $sum: "$amount" } } } // Group by category and sum amounts
        ]);

        // Map the aggregated data to the pie chart format
        const pieChartData = expenses.map((expense) => {
            return {
                name: expense._id, // Category name (e.g., Sales, Salary, etc.)
                value: expense.totalAmount, // Total amount for the category
                color: getRandomColor(), // Assign a random color
            };
        });

        res.status(200).json({ success: true, pieChartData });
    } catch (error) {
        console.log("Error: ", error.message);
        res.status(500).json({ success: false, message: "Error in fetching expense breakdown" });
    }
};

// Helper function to generate random colors
const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};