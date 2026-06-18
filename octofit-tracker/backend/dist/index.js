"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const users_1 = __importDefault(require("./routes/users"));
const teams_1 = __importDefault(require("./routes/teams"));
const activities_1 = __importDefault(require("./routes/activities"));
const leaderboard_1 = __importDefault(require("./routes/leaderboard"));
const workouts_1 = __importDefault(require("./routes/workouts"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const PORT = process.env.PORT ? Number(process.env.PORT) : 8000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/octofit';
// Mount API routers
app.use('/api/users', users_1.default);
app.use('/api/teams', teams_1.default);
app.use('/api/activities', activities_1.default);
app.use('/api/leaderboard', leaderboard_1.default);
app.use('/api/workouts', workouts_1.default);
app.get('/', (_req, res) => {
    res.send('OctoFit Tracker API');
});
mongoose_1.default
    .connect(MONGO_URI)
    .then(() => console.log('Connected to MongoDB at', MONGO_URI))
    .catch((err) => console.error('MongoDB connection error:', err));
// Codespaces-aware API URL support using CODESPACE_NAME
const API_BASE = process.env.CODESPACE_NAME
    ? `https://${process.env.CODESPACE_NAME}-${PORT}.githubpreview.dev`
    : `http://localhost:${PORT}`;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
    console.log(`API base URL: ${API_BASE}`);
});
