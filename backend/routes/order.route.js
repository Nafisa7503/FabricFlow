import express from 'express';
import {createOrder, } from '../controllers/order.controller.js';

const router = express.Router();


router.post("/", createOrder);
// router.delete("/:id", deleteProducts);
// router.get("/", getProducts);
// router.put("/:id", updateProducts);

export default router;