import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    date_time: {
        type: Date,
        required: true,
    },
    customer: {
        type: String,
        required: true,
    },
    // action: {
    //     type: Number,
    //     required: true,
    // },
    
    
   
    timestamps: true
}
);

const Finance = mongoose.model("Finance", financeSchema); //Create a model Transaction from the schema transactionSchema

export default Finance;