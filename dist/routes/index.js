"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/index.ts
const express_1 = require("express");
const analytics_1 = __importDefault(require("./analytics"));
const products_1 = __importDefault(require("./products"));
const router = (0, express_1.Router)();
router.use("/analytics", analytics_1.default);
router.use("/products", products_1.default);
exports.default = router;
