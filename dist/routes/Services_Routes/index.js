"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Service_Controller_js_1 = __importDefault(require("../../controller/Service_Controller.js"));
const Auth_Middleware_js_1 = __importDefault(require("../../middlewares/Auth_Middleware.js"));
const env_js_1 = __importDefault(require("../../config/env.js"));
const router = (0, express_1.Router)();
const auth = (0, Auth_Middleware_js_1.default)(env_js_1.default.JWT_SECRET);
router.get("/", auth, Service_Controller_js_1.default.list);
router.get("/me", auth, Service_Controller_js_1.default.myservices);
router.post("/", auth, Service_Controller_js_1.default.create);
router.put("/:id", auth, Service_Controller_js_1.default.update);
router.delete("/:id", auth, Service_Controller_js_1.default.delete);
exports.default = router;
