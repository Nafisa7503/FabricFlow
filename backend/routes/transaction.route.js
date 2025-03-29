import express from 'express';
import {createTransactions, } from '../controllers/transaction.controller.js';

const router = express.Router();


router.post("/", createTransactions);
// router.delete("/:id", deleteProducts);
// router.get("/", getProducts);
// router.put("/:id", updateProducts);

export default router;