"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
const PORT = process.env.PORT ? Number(process.env.PORT) : 8000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/octofit';
app.get('/', (_req, res) => {
    res.send('OctoFit Tracker API');
});
mongoose_1.default
    .connect(MONGO_URI)
    .then(() => console.log('Connected to MongoDB at', MONGO_URI))
    .catch((err) => console.error('MongoDB connection error:', err));
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
