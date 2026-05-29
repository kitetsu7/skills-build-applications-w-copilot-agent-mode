"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = __importDefault(require("./models/User"));
const Team_1 = __importDefault(require("./models/Team"));
const Activity_1 = __importDefault(require("./models/Activity"));
const Leaderboard_1 = __importDefault(require("./models/Leaderboard"));
const Workout_1 = __importDefault(require("./models/Workout"));
const database_1 = require("./config/database");
const server_1 = require("./server");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', baseUrl: server_1.baseUrl });
});
app.get('/api/users/', async (_req, res) => {
    const items = await User_1.default.find({}, '-__v').sort({ createdAt: -1 }).lean();
    res.json({ resource: 'users', count: items.length, items });
});
app.get('/api/teams/', async (_req, res) => {
    const items = await Team_1.default.find({}, '-__v')
        .populate('members', 'name email level weeklyGoal')
        .sort({ points: -1 })
        .lean();
    res.json({ resource: 'teams', count: items.length, items });
});
app.get('/api/activities/', async (_req, res) => {
    const items = await Activity_1.default.find({}, '-__v')
        .populate('user', 'name email')
        .sort({ performedAt: -1 })
        .lean();
    res.json({ resource: 'activities', count: items.length, items });
});
app.get('/api/leaderboard/', async (_req, res) => {
    const items = await Leaderboard_1.default.find({}, '-__v')
        .populate('user', 'name email')
        .sort({ rank: 1 })
        .lean();
    res.json({ resource: 'leaderboard', count: items.length, items });
});
app.get('/api/workouts/', async (_req, res) => {
    const items = await Workout_1.default.find({}, '-__v')
        .populate('suggestedFor', 'name level')
        .sort({ difficulty: 1, durationMinutes: 1 })
        .lean();
    res.json({ resource: 'workouts', count: items.length, items });
});
app.get('/api/', (_req, res) => {
    res.json({
        baseUrl: server_1.baseUrl,
        endpoints: {
            users: `${server_1.baseUrl}/api/users/`,
            teams: `${server_1.baseUrl}/api/teams/`,
            activities: `${server_1.baseUrl}/api/activities/`,
            leaderboard: `${server_1.baseUrl}/api/leaderboard/`,
            workouts: `${server_1.baseUrl}/api/workouts/`,
        },
    });
});
(0, database_1.connectDatabase)()
    .then(() => {
    app.listen(server_1.port, () => {
        console.log(`OctoFit backend listening on port ${server_1.port}`);
    });
})
    .catch((error) => {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
});
