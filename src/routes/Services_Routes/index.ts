import { Router } from "express";

import ServiceController from "../../controller/Service_Controller.js";

import authMiddleware from "../../middlewares/Auth_Middleware.js";

import ENV from "../../config/env.js";

const router = Router();

const auth = authMiddleware(ENV.JWT_SECRET);

router.get("/", auth, ServiceController.list);
router.get("/me", auth, ServiceController.myservices);
router.post("/", auth, ServiceController.create);

router.put("/:id", auth, ServiceController.update);

router.delete("/:id", auth, ServiceController.delete);

export default router;
