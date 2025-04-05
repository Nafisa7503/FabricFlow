import express from 'express';
import {createOrder, getOrders } from '../controllers/order.controller.js';

const router = express.Router();


router.post("/", createOrder);
// router.delete("/:id", deleteProducts);
router.get("/", getOrders);
// router.put("/:id", updateProducts);

export default router;