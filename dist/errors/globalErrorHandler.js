"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("./AppError"));
const globalErrorHandler = (err, req, res, next) => {
    // console.log(err.name, err.isJoi);
    let statusCode = 500;
    const errorResponse = {
        success: false,
        name: '',
        errorMessage: err.message,
        errorDetails: err,
    };
    if (err instanceof AppError_1.default) {
        errorResponse.name = err.name;
        statusCode = err.statusCode;
        errorResponse.errorMessage = err.message;
        errorResponse.errorDetails = err;
    }
    res.status(statusCode).json(Object.assign(Object.assign({}, errorResponse), { stack: err.stack }));
};
exports.default = globalErrorHandler;
