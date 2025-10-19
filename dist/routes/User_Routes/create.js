"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_Controller_js_1 = __importDefault(require("../../controller/User_Controller.js"));
const router = (0, express_1.Router)();
router.post("/", User_Controller_js_1.default.create);
exports.default = router;
