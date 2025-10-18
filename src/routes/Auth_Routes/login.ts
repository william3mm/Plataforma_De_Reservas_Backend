import { Router } from "express";
import Auth_Controller from "../../controller/Auth_Controller";

const router = Router();

router.post("/", Auth_Controller.login);

export default router;
