import { Router } from "express";
import UserController from "../../controller/User_Controller";

const router = Router();

router.post("/", UserController.create);

export default router;
