import express from 'express';
import {createProduct, getProducts, totalProducts} from '../controllers/product.controller.js';

const router = express.Router();


router.post("/", createProduct);
// router.delete("/:id", deleteProducts);
router.get("/", getProducts);
router.get("/total", totalProducts);
// router.put("/:id", updateProducts);

export default router;