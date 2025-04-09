import express from 'express';
import {createTransaction, expenseBreakdown, getTransactions,totalIncome } from '../controllers/transaction.controller.js';

const router = express.Router();


router.post("/", createTransaction);
// router.delete("/:id", deleteProducts);
router.get("/", getTransactions);
router.get("/income", totalIncome);
router.get("/expense", expenseBreakdown);
// router.put("/:id", updateProducts);

export default router;