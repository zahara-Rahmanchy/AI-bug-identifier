"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bugsRoutes = void 0;
const express_1 = __importDefault(require("express"));
const bugController_1 = require("../controllers/bugController");
const rateLimiter_1 = require("../middleware/rateLimiter");
const router = express_1.default.Router();
router.post('/find-bug', rateLimiter_1.rateLimiter, bugController_1.BugControllers.findBug);
router.get('/sample-cases', rateLimiter_1.rateLimiter, bugController_1.BugControllers.bugSampleSnippets);
exports.bugsRoutes = router;
