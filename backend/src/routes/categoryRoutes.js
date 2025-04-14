import express from "express";
import {
    getCategories,
    getCategoryById,
    searchCategories,
    updateCategory,
    createCategory,
} from "../controllers/categoryController.js";

const router = express.Router();

// GET search categories by name
router.get("/search", searchCategories);

// GET all categories
router.get("/", getCategories);

// GET category by ID
router.get("/:id", getCategoryById);

// POST create new category
router.post("/", createCategory);

// PUT update category
router.put("/:id", updateCategory);

// DELETE category by id
router.get("/:id", searchCategories);

export default router;
