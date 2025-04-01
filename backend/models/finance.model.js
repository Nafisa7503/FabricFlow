import mongoose from "mongoose";

const financeSchema = new mongoose.Schema({
    net_income: {
        type: Number,
        required: true,
    },
    net_expense: {
        type: Number,
        required: true,
    },
    status: {
        type: Number,
        required: true,
    },
    
    
   
   
},
{ timestamps: true}
);

const Finance = mongoose.model("Finance", financeSchema); //Create a model Transaction from the schema transactionSchema

export default Finance;