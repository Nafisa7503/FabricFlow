import mongoose from "mongoose";

const counterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true, // ensures one counter per type (customer, order, etc.)
  },
  seq: {
    type: Number,
    default: 10001, // starting point
  },
});

const Counter = mongoose.model("Counter", counterSchema);

export default Counter;
