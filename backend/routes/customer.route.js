import express from 'express';
import {createCustomer, getCustomer, totalCustomer } from '../controllers/customer.controller.js';

const router = express.Router();


router.post("/", createCustomer);
// router.delete("/:id", deleteProducts);
router.get("/", getCustomer);
router.get("/total", totalCustomer);
// router.put("/:id", updateProducts);

export default router;