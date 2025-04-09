import express from 'express';
import {createProduct, getProducts, totalProducts, lowInventory, updateStock, deleteProduct} from '../controllers/product.controller.js';

const router = express.Router();


router.post("/", createProduct);
// router.delete("/:id", deleteProducts);
router.get("/", getProducts);
router.get("/total", totalProducts);
router.get("/inventory", lowInventory);
router.put("/update/:id", updateStock);
router.delete("/:id", deleteProduct);

export default router;