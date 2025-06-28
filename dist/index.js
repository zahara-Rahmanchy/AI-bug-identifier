"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const bugsRoute_1 = require("./routes/bugsRoute");
const globalErrorHandler_1 = __importDefault(require("./errors/globalErrorHandler"));
dotenv_1.default.config();
const PORT = process.env.PORT;
console.log("p: ", PORT);
const app = (0, express_1.default)();
// parsers
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get('/', (req, res) => {
    res.send('AI Bug Identifier is running');
});
app.use("/", bugsRoute_1.bugsRoutes);
app.use(globalErrorHandler_1.default);
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
