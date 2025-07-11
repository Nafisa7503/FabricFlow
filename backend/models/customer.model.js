import mongoose from "mongoose";


const customerSchema = new mongoose.Schema({
    customer_id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    most_purchased: {
        type: String,
        required: true,
    },
},{
    timestamps: true
}
);

const Customer = mongoose.model("Customer", customerSchema); //Create a model Transaction from the schema transactionSchema

export default Customer;