"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/Reservation_Routes.ts
const express_1 = require("express");
const Reservation_Controller_js_1 = __importDefault(require("../../controller/Reservation_Controller.js"));
const Auth_Middleware_js_1 = __importDefault(require("../../middlewares/Auth_Middleware.js"));
const env_js_1 = __importDefault(require("../../config/env.js"));
const router = (0, express_1.Router)();
const auth = (0, Auth_Middleware_js_1.default)(env_js_1.default.JWT_SECRET);
router.post("/", auth, Reservation_Controller_js_1.default.create);
router.post("/cancel", auth, Reservation_Controller_js_1.default.cancel);
router.get("/", auth, Reservation_Controller_js_1.default.list);
exports.default = router;
