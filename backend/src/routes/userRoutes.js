import express from "express";
import {
    getUsers,
    getUserById,
    deleteUser,
    searchUsers
} from "../controllers/userController.js";

const router = express.Router();


// GET search users by name or email
router.get("/search", searchUsers);

// GET all users
router.get("/", getUsers);

// GET user by ID
router.get("/:id", getUserById);


// DELETE user
router.delete("/:id", deleteUser);

export default router;
