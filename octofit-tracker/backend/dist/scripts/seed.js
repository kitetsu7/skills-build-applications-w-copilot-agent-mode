"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = __importDefault(require("../models/User"));
const Team_1 = __importDefault(require("../models/Team"));
const Activity_1 = __importDefault(require("../models/Activity"));
const Leaderboard_1 = __importDefault(require("../models/Leaderboard"));
const Workout_1 = __importDefault(require("../models/Workout"));
const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';
async function seed() {
    // Seed the octofit_db database with test data
    console.log('Seed the octofit_db database with test data');
    await mongoose_1.default.connect(mongoUri);
    await Promise.all([
        User_1.default.deleteMany({}),
        Team_1.default.deleteMany({}),
        Activity_1.default.deleteMany({}),
        Leaderboard_1.default.deleteMany({}),
        Workout_1.default.deleteMany({}),
    ]);
    const users = await User_1.default.insertMany([
        {
            name: 'Avery Johnson',
            email: 'avery.johnson@octofit.test',
            level: 'intermediate',
            weeklyGoal: 5,
        },
        {
            name: 'Sofia Martinez',
            email: 'sofia.martinez@octofit.test',
            level: 'advanced',
            weeklyGoal: 6,
        },
        {
            name: 'Ethan Brown',
            email: 'ethan.brown@octofit.test',
            level: 'beginner',
            weeklyGoal: 3,
        },
        {
            name: 'Mina Patel',
            email: 'mina.patel@octofit.test',
            level: 'intermediate',
            weeklyGoal: 4,
        },
    ]);
    const [avery, sofia, ethan, mina] = users;
    await Team_1.default.insertMany([
        {
            name: 'Downtown Dashers',
            city: 'Seattle',
            members: [avery._id, ethan._id],
            points: 980,
        },
        {
            name: 'Summit Lifters',
            city: 'Portland',
            members: [sofia._id, mina._id],
            points: 1125,
        },
    ]);
    await Activity_1.default.insertMany([
        {
            user: avery._id,
            type: 'run',
            durationMinutes: 42,
            caloriesBurned: 465,
            performedAt: new Date('2026-05-20T07:30:00.000Z'),
        },
        {
            user: sofia._id,
            type: 'strength',
            durationMinutes: 55,
            caloriesBurned: 520,
            performedAt: new Date('2026-05-21T18:15:00.000Z'),
        },
        {
            user: ethan._id,
            type: 'cycle',
            durationMinutes: 30,
            caloriesBurned: 290,
            performedAt: new Date('2026-05-22T06:50:00.000Z'),
        },
        {
            user: mina._id,
            type: 'yoga',
            durationMinutes: 40,
            caloriesBurned: 180,
            performedAt: new Date('2026-05-23T12:10:00.000Z'),
        },
        {
            user: avery._id,
            type: 'swim',
            durationMinutes: 35,
            caloriesBurned: 340,
            performedAt: new Date('2026-05-24T08:05:00.000Z'),
        },
    ]);
    await Leaderboard_1.default.insertMany([
        {
            user: sofia._id,
            score: 2540,
            rank: 1,
            streakDays: 18,
            weekOf: new Date('2026-05-25T00:00:00.000Z'),
        },
        {
            user: avery._id,
            score: 2360,
            rank: 2,
            streakDays: 14,
            weekOf: new Date('2026-05-25T00:00:00.000Z'),
        },
        {
            user: mina._id,
            score: 2015,
            rank: 3,
            streakDays: 10,
            weekOf: new Date('2026-05-25T00:00:00.000Z'),
        },
        {
            user: ethan._id,
            score: 1840,
            rank: 4,
            streakDays: 7,
            weekOf: new Date('2026-05-25T00:00:00.000Z'),
        },
    ]);
    await Workout_1.default.insertMany([
        {
            title: 'Tempo Run Intervals',
            difficulty: 'intermediate',
            targetMuscleGroups: ['legs', 'core'],
            durationMinutes: 45,
            suggestedFor: [avery._id, mina._id],
        },
        {
            title: 'Upper Body Power Circuit',
            difficulty: 'advanced',
            targetMuscleGroups: ['chest', 'back', 'shoulders'],
            durationMinutes: 50,
            suggestedFor: [sofia._id],
        },
        {
            title: 'Beginner Mobility Flow',
            difficulty: 'beginner',
            targetMuscleGroups: ['hips', 'hamstrings', 'lower back'],
            durationMinutes: 25,
            suggestedFor: [ethan._id],
        },
    ]);
    const [userCount, teamCount, activityCount, leaderboardCount, workoutCount] = await Promise.all([
        User_1.default.countDocuments(),
        Team_1.default.countDocuments(),
        Activity_1.default.countDocuments(),
        Leaderboard_1.default.countDocuments(),
        Workout_1.default.countDocuments(),
    ]);
    console.log(`Seed complete: users=${userCount}, teams=${teamCount}, activities=${activityCount}, leaderboard=${leaderboardCount}, workouts=${workoutCount}`);
    await mongoose_1.default.disconnect();
}
seed().catch(async (error) => {
    console.error('Seeding failed:', error);
    await mongoose_1.default.disconnect();
    process.exit(1);
});
