"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("./config/database");
const users_1 = __importDefault(require("./routes/users"));
const teams_1 = __importDefault(require("./routes/teams"));
const activities_1 = __importDefault(require("./routes/activities"));
const leaderboard_1 = __importDefault(require("./routes/leaderboard"));
const workouts_1 = __importDefault(require("./routes/workouts"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const PORT = process.env.PORT ? Number(process.env.PORT) : 8000;
// Mount API routers
app.use('/api/users', users_1.default);
app.use('/api/teams', teams_1.default);
app.use('/api/activities', activities_1.default);
app.use('/api/leaderboard', leaderboard_1.default);
app.use('/api/workouts', workouts_1.default);
app.get('/', (_req, res) => {
    res.send('OctoFit Tracker API');
});
// Codespaces-aware API URL support using CODESPACE_NAME
const API_BASE = process.env.CODESPACE_NAME
    ? `https://${process.env.CODESPACE_NAME}-${PORT}.githubpreview.dev`
    : `http://localhost:${PORT}`;
async function start() {
    try {
        await (0, database_1.connectDatabase)();
        const server = app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
            console.log(`API base URL: ${API_BASE}`);
        });
        const shutdown = async () => {
            console.log('Shutting down server...');
            server.close(async () => {
                await (0, database_1.disconnectDatabase)();
                process.exit(0);
            });
        };
        process.on('SIGINT', shutdown);
        process.on('SIGTERM', shutdown);
    }
    catch (err) {
        console.error('Failed to start server:', err);
        process.exit(1);
    }
}
start();
