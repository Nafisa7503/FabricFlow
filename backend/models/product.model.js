import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    fabric_name: {
        type: String,
        required: true,
    },
    fabric_type: {
        type: String,        //( Shirt, Suit, Punjabi,Sherwani )   if nafisa_shirt then +=1 nafisa shirt 1 
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
    // supplier_id: {
    //     type: String,
    //     required: true,
    // },
    
   
   
},{ timestamps: true,}
);

const Product = mongoose.model("Product", productSchema); //Create a model Transaction from the schema transactionSchema

export default Product;