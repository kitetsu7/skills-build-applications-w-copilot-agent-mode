import express from 'express';
import UserModel from './models/User';
import TeamModel from './models/Team';
import ActivityModel from './models/Activity';
import LeaderboardModel from './models/Leaderboard';
import WorkoutModel from './models/Workout';
import { connectDatabase } from './config/database';
import { baseUrl, port } from './server';

const app = express();
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', baseUrl });
});

app.get('/api/users/', async (_req, res) => {
  const items = await UserModel.find({}, '-__v').sort({ createdAt: -1 }).lean();
  res.json({ resource: 'users', count: items.length, items });
});

app.get('/api/teams/', async (_req, res) => {
  const items = await TeamModel.find({}, '-__v')
    .populate('members', 'name email level weeklyGoal')
    .sort({ points: -1 })
    .lean();
  res.json({ resource: 'teams', count: items.length, items });
});

app.get('/api/activities/', async (_req, res) => {
  const items = await ActivityModel.find({}, '-__v')
    .populate('user', 'name email')
    .sort({ performedAt: -1 })
    .lean();
  res.json({ resource: 'activities', count: items.length, items });
});

app.get('/api/leaderboard/', async (_req, res) => {
  const items = await LeaderboardModel.find({}, '-__v')
    .populate('user', 'name email')
    .sort({ rank: 1 })
    .lean();
  res.json({ resource: 'leaderboard', count: items.length, items });
});

app.get('/api/workouts/', async (_req, res) => {
  const items = await WorkoutModel.find({}, '-__v')
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

connectDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`OctoFit backend listening on port ${port}`);
    });
  })
  .catch((error: unknown) => {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  });
