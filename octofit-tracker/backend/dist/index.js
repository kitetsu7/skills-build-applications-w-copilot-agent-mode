"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = __importDefault(require("./models/User"));
const Team_1 = __importDefault(require("./models/Team"));
const Activity_1 = __importDefault(require("./models/Activity"));
const Leaderboard_1 = __importDefault(require("./models/Leaderboard"));
const Workout_1 = __importDefault(require("./models/Workout"));
const app = (0, express_1.default)();
const port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';
app.use(express_1.default.json());
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', baseUrl });
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
        baseUrl,
        endpoints: {
            users: `${baseUrl}/api/users/`,
            teams: `${baseUrl}/api/teams/`,
            activities: `${baseUrl}/api/activities/`,
            leaderboard: `${baseUrl}/api/leaderboard/`,
            workouts: `${baseUrl}/api/workouts/`,
        },
    });
});
mongoose_1.default
    .connect(mongoUri)
    .then(() => {
    app.listen(port, () => {
        console.log(`OctoFit backend listening on port ${port}`);
    });
})
    .catch((error) => {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
});
