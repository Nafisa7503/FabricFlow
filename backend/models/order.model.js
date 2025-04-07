import mongoose from "mongoose";

const measurementSchema = new mongoose.Schema({
  neck: String,
  chest: String,
  waist: String,
  shoulder: String,
  sleeveLength: String,
  shirtLength: String,
  cuff: String,
  notes: String,
}, { _id: false });

const productSchema = new mongoose.Schema({
  productType: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  measurements: [measurementSchema],
  fabricTaken: {
    type: Boolean,
    default: false,
  },
  fabricCode: {
    type: String,
  },
  fabricPrice: {
    type: Number,
  },
}, { _id: false });

const paymentSchema = new mongoose.Schema({
  totalAmount: {
    type: Number,
    required: true,
  },
  paidAmount: {
    type: Number,
    required: true,
  },
  dueAmount: {
    type: Number,
    required: true,
  },
  finalTotalAmount: {
    type: Number,
    required: true,
  },
}, { _id: false });

const orderSchema = new mongoose.Schema({
  order_id: {
    type: String,
    required: true,
  },
  orderDate: {
    type: Date,
    required: true,
  },
  deliveryDate: {
    type: Date,
    required: true,
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  status: {
    type: String,
    default: "Order Taken",
  },
  products: [productSchema],
  payment: paymentSchema,
}, {
  timestamps: true
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
