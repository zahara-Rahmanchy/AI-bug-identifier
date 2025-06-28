"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateLimiter = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const AppError_1 = __importDefault(require("../errors/AppError"));
exports.rateLimiter = (0, express_rate_limit_1.default)({
    windowMs: 60 * 1000, // 1 minute
    max: 5, // allow max 6 calls per minute (just under 10 RPM limit)
    handler: (req, res, next) => {
        const err = new AppError_1.default(429, "Rate limit exceeded: Max 8 requests per minute allowed. Please wait.");
        next(err); // Forward error to global error handler
    },
    standardHeaders: true,
    legacyHeaders: false,
});
