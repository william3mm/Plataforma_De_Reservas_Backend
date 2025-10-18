import { Router } from "express";
import { RequestHandler } from "express";

import ServiceController from "../../controller/Service_Controller";

import authMiddleware from "../../middlewares/Auth_Middleware";

import ENV from "../../config/env";

const router = Router();

const auth = authMiddleware(ENV.JWT_SECRET);

router.post("/", auth, ServiceController.create as RequestHandler);

router.put("/:id", auth, ServiceController.update as RequestHandler);

router.delete("/:id", auth, ServiceController.delete as RequestHandler);

export default router;
