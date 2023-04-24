import express from "express";
const router = express.Router();
import userController from "../controllers/userController.js";

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUser);
router.delete("/:id", userController.deleteUser);
router.put("/:id", userController.editUser);
router.post("/register", userController.register);
router.post("/login", userController.login);

export default router;
