import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    order_date: {
        type: Date,
        required: true,
    },
    delivery_date: {
        type: Date,
        required: true,
    },
    // customer: {
    //     type: String,
    //     required: true,
    // },
    order_status: {
        type: String,
        required: true,
    },
    // product: {
    //     type: String,
    //     required: true,
    // },
    quantity: {
        type: Number,
        required: true,
    },
    total_amount: {
        type: Number,
        required: true,
    },
    paid_amount: {
        type: Number,
        required: true,
    },
    due_amount: {
        type: Number,
        required: true,
    },
    total_amount: {
        type: Number,
        required: true,
    },
    
   
    timestamps: true
}
);

const Order = mongoose.model("Order", orderSchema); //Create a model Transaction from the schema transactionSchema

export default Order;