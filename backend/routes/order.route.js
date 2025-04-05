import express from 'express';
import {createOrder, getOrder} from '../controllers/order.controller.js';

const router = express.Router();


router.post("/", createOrder);
// router.delete("/:id", deleteProducts);
router.get("/", getOrder);
// router.put("/:id", updateProducts);

export default router;