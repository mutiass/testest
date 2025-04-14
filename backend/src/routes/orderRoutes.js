import express from "express";
import {
    getOrders,
    getOrderById,
    createOrder,
    updateOrder,
    searchOrders
} from "../controllers/orderController.js";

const router = express.Router();

// Search orders
router.get("/Search", searchOrders);

// GET all orders
router.get("/", getOrders);

// GET order by ID
router.get("/:id", getOrderById);

// POST create new order
router.post("/", createOrder);

// PUT order
router.put("/", updateOrder);

export default router;
