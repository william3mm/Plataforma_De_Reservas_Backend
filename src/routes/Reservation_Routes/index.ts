// src/routes/Reservation_Routes.ts
import { Router } from "express";
import ReservationController from "../../controller/Reservation_Controller.js";
import authMiddleware from "../../middlewares/Auth_Middleware.js";
import ENV from "../../config/env.js";

const router = Router();
const auth = authMiddleware(ENV.JWT_SECRET);

router.post("/", auth, ReservationController.create);

router.post("/cancel", auth, ReservationController.cancel);

router.get("/", auth, ReservationController.list);

export default router;
