import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    date_time: {
        type: Date,
        required: true,
    },
    customer_id: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Customer",
            required: true,
    },

    action: {
        type: String,
        required: true,
    },
    
    
   
   
},{ timestamps: true}
);

const Notification = mongoose.model("Notification", notificationSchema); //Create a model Transaction from the schema transactionSchema

export default Notification;