"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Auth_Controller_js_1 = __importDefault(require("../../controller/Auth_Controller.js"));
const Auth_Middleware_js_1 = __importDefault(require("../../middlewares/Auth_Middleware.js"));
const env_js_1 = __importDefault(require("../../config/env.js"));
const router = (0, express_1.Router)();
const auth = (0, Auth_Middleware_js_1.default)(env_js_1.default.JWT_SECRET);
router.get("/", auth, Auth_Controller_js_1.default.me);
exports.default = router;
