import { Router } from "express";
import { createHabit } from "../controllers/habitController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const route=Router();

route.post("/create", authenticate, createHabit);

export default route;