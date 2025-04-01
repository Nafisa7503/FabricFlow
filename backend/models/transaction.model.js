import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,          //(Sales,Salary,Rent, Utility, Inventory, Others )
        required: true,
    },
    type: {
        type: String,
        required: true,
        
    },
    amount: {
        type: Number,
        required: true,
    },
    payment_method: {
        type: String,
        required: true,
        
    }
}, {
    timestamps: true
});

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
