"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BugControllers = void 0;
const AppError_1 = __importDefault(require("../errors/AppError"));
const bugService_1 = require("../services/bugService");
const findBug = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { code, language } = req.body;
        console.log("lang: ", language, "\ncode: ", code);
        if (!code || !language) {
            throw new AppError_1.default(400, 'Both code and language fields are required.');
        }
        if (typeof code !== "string" || typeof language !== "string") {
            throw new AppError_1.default(400, 'Invalid type! Code and language should be string');
        }
        const lineCount = code === null || code === void 0 ? void 0 : code.trim().split('\n').length;
        if (lineCount > 30) {
            throw new AppError_1.default(400, `Code snippet exceeds ${30} lines. Please submit a shorter snippet.`);
        }
        const result = yield bugService_1.BugServices.findBugUsingllm(language, code);
        // console.log("res: ",typeof result)
        res.status(201).json(result);
    }
    catch (error) {
        console.error(' Error:', error.message);
        next(error);
        // res.status(500).json({ error: 'Failed to analyze code. Please try again.' });
    }
});
const bugSampleSnippets = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const language = ((_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.language) ? req.query.language : "python";
        const mode = ((_b = req === null || req === void 0 ? void 0 : req.query) === null || _b === void 0 ? void 0 : _b.mode) ? (_c = req === null || req === void 0 ? void 0 : req.query) === null || _c === void 0 ? void 0 : _c.mode : "developer-friendly";
        console.log("language controller: ", language, "\nmode controller: ", mode);
        const response = yield bugService_1.BugServices.getSampleBugSnippets(language, mode);
        res.status(200).json(response);
    }
    catch (error) {
        console.error(' Error:', error.message);
        next(error);
    }
});
exports.BugControllers = {
    findBug,
    bugSampleSnippets
};
