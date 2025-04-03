import express from 'express';
import {createCustomer, getCustomer } from '../controllers/customer.controller.js';

const router = express.Router();


router.post("/", createCustomer);
// router.delete("/:id", deleteProducts);
router.get("/", getCustomer);
// router.put("/:id", updateProducts);

export default router;