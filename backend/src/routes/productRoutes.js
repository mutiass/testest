import express from "express";
import {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    searchProducts
} from "../controllers/productController.js";

const router = express.Router();

// Search products by name using query params
router.get("/search", searchProducts); // /api/products/search?keyword=milk

// Get all products
router.get("/", getProducts);

// Get product by ID
router.get("/:id", getProductById);

// Create new product
router.post("/", createProduct);

// Update product
router.put("/:id", updateProduct);

// Delete product
router.delete("/:id", deleteProduct);

export default router;
