import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
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
},{
    timestamps: true
}
);

const Transaction = mongoose.model("Transaction", transactionSchema); //Create a model Transaction from the schema transactionSchema

export default Transaction;