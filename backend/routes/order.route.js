import express from 'express';
import {createOrder, getOrders,deleteOrder, recentOrders, pendingOrders, newOrders } from '../controllers/order.controller.js';

const router = express.Router();


router.post("/", createOrder);
router.delete("/:id", deleteOrder);
router.get("/", getOrders);
router.get("/recent", recentOrders);
router.get("/pending", pendingOrders);
router.get("/new", newOrders);
// router.put("/:id", updateProducts);

export default router;