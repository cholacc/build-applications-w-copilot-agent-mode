"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Seed the octofit_db database with test data
 */
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = __importDefault(require("../models/User"));
const Team_1 = __importDefault(require("../models/Team"));
const Workout_1 = __importDefault(require("../models/Workout"));
const Activity_1 = __importDefault(require("../models/Activity"));
const Leaderboard_1 = __importDefault(require("../models/Leaderboard"));
const express_1 = __importDefault(require("express"));
const supertest_1 = __importDefault(require("supertest"));
const MONGO_URI = process.env.MONGO_URI || (() => {
    try {
        const data = require('fs').readFileSync('.mongo_uri', 'utf8');
        if (data)
            return data;
    }
    catch (e) {
        // ignore
    }
    return 'mongodb://localhost:27017/octofit_db';
})();
async function main() {
    console.log('Seed the octofit_db database with test data');
    await mongoose_1.default.connect(MONGO_URI);
    console.log('Connected to', MONGO_URI);
    // Clear existing
    await Promise.all([
        User_1.default.deleteMany({}),
        Team_1.default.deleteMany({}),
        Workout_1.default.deleteMany({}),
        Activity_1.default.deleteMany({}),
        Leaderboard_1.default.deleteMany({})
    ]);
    // Create users
    const alice = await User_1.default.create({ name: 'Alice Runner', email: 'alice@example.com' });
    const bob = await User_1.default.create({ name: 'Bob Cyclist', email: 'bob@example.com' });
    const carol = await User_1.default.create({ name: 'Carol Swimmer', email: 'carol@example.com' });
    // Teams
    const redTeam = await Team_1.default.create({ name: 'Red Rockets', members: [alice._id, bob._id] });
    const blueTeam = await Team_1.default.create({ name: 'Blue Whales', members: [carol._id] });
    // Workouts
    const w1 = await Workout_1.default.create({ name: 'Morning Run', description: 'Easy 5k', durationMinutes: 30 });
    const w2 = await Workout_1.default.create({ name: 'Interval Cycling', description: 'High intensity intervals', durationMinutes: 45 });
    // Activities
    await Activity_1.default.create({ user: alice._id, type: 'run', durationMinutes: 32, distanceKm: 5.1, performedAt: new Date() });
    await Activity_1.default.create({ user: bob._id, type: 'cycle', durationMinutes: 50, distanceKm: 20.2, performedAt: new Date() });
    await Activity_1.default.create({ user: carol._id, type: 'swim', durationMinutes: 25, performedAt: new Date() });
    // Leaderboard
    await Leaderboard_1.default.create({ user: alice._id, score: 1500, rank: 1 });
    await Leaderboard_1.default.create({ user: bob._id, score: 1200, rank: 2 });
    await Leaderboard_1.default.create({ user: carol._id, score: 900, rank: 3 });
    console.log('Seed data inserted');
    // Verify data via in-memory API route responses
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    // mount routes
    const usersRouter = (await Promise.resolve().then(() => __importStar(require('../routes/users')))).default;
    const teamsRouter = (await Promise.resolve().then(() => __importStar(require('../routes/teams')))).default;
    const activitiesRouter = (await Promise.resolve().then(() => __importStar(require('../routes/activities')))).default;
    const leaderboardRouter = (await Promise.resolve().then(() => __importStar(require('../routes/leaderboard')))).default;
    const workoutsRouter = (await Promise.resolve().then(() => __importStar(require('../routes/workouts')))).default;
    app.use('/api/users', usersRouter);
    app.use('/api/teams', teamsRouter);
    app.use('/api/activities', activitiesRouter);
    app.use('/api/leaderboard', leaderboardRouter);
    app.use('/api/workouts', workoutsRouter);
    const request = (0, supertest_1.default)(app);
    const usersRes = await request.get('/api/users');
    console.log('/api/users ->', usersRes.body.data.length, 'users');
    const teamsRes = await request.get('/api/teams');
    console.log('/api/teams ->', teamsRes.body.data.length, 'teams');
    const activitiesRes = await request.get('/api/activities');
    console.log('/api/activities ->', activitiesRes.body.data.length, 'activities');
    const leaderboardRes = await request.get('/api/leaderboard');
    console.log('/api/leaderboard ->', leaderboardRes.body.data.length, 'entries');
    const workoutsRes = await request.get('/api/workouts');
    console.log('/api/workouts ->', workoutsRes.body.data.length, 'workouts');
    await mongoose_1.default.disconnect();
    console.log('Disconnected from database');
}
main().catch((err) => {
    console.error('Seeding error:', err);
    process.exit(1);
});
