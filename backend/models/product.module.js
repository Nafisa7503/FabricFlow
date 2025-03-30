import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    fabric_name: {
        type: String,
        required: true,
    },
    fabric_type: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    pattern: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quality: {
        type: String,
        required: true,
    },
    supplier: {
        type: String,
        required: true,
    },
    
   
    timestamps: true
}
);

const Order = mongoose.model("Order", orderSchema); //Create a model Transaction from the schema transactionSchema

export default Order;