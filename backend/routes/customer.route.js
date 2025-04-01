import express from 'express';
import {createCustomer, } from '../controllers/customer.controller.js';

const router = express.Router();


router.post("/", createCustomer);
// router.delete("/:id", deleteProducts);
// router.get("/", getProducts);
// router.put("/:id", updateProducts);

export default router;