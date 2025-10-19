import { Router } from "express";
import Auth_Controller from "../../controller/Auth_Controller.js";

import authMiddleware from "../../middlewares/Auth_Middleware.js";

import ENV from "../../config/env.js";
const router = Router();

const auth = authMiddleware(ENV.JWT_SECRET);

router.get("/", auth, Auth_Controller.me);

export default router;
