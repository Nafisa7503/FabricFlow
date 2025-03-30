import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    most_purchased: {
        type: Number,
        required: true,
    },
    // DOB: {
    //     type: String,
    //     required: true,
    // }
},{
    timestamps: true
}
);

const Transaction = mongoose.model("Transaction", transactionSchema); //Create a model Transaction from the schema transactionSchema

export default Customer;