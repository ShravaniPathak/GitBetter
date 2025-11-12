import { Router } from "express";
import { addTaps, createHabit, fetchHabit, deleteHabit } from "../controllers/habitController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const route=Router();

route.post("/create", authenticate, createHabit);
route.post("/fetch",authenticate,fetchHabit);
route.post("/addTaps",addTaps);
route.post("/delete",deleteHabit);

export default route;