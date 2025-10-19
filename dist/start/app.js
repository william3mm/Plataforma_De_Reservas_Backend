"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("../database/Database.js");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const create_js_1 = __importDefault(require("../routes/User_Routes/create.js"));
const me_js_1 = __importDefault(require("../routes/Auth_Routes/me.js"));
const login_js_1 = __importDefault(require("../routes/Auth_Routes/login.js"));
const index_js_1 = __importDefault(require("../routes/Services_Routes/index.js"));
const index_js_2 = __importDefault(require("../routes/Reservation_Routes/index.js"));
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.Middlewares();
        this.Routes();
    }
    Middlewares() {
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)({
            origin: "*",
            methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            allowedHeaders: ["Content-Type", "Authorization"],
        }));
    }
    Routes() {
        this.app.use("/register", create_js_1.default);
        this.app.use("/auth/login", login_js_1.default);
        this.app.use("/services", index_js_1.default);
        this.app.use("/reservations", index_js_2.default);
        this.app.use("/me", me_js_1.default);
    }
}
exports.default = new App().app;
