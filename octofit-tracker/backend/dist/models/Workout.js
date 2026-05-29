"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const workoutSchema = new mongoose_1.Schema({
    title: { type: String, required: true, trim: true },
    difficulty: { type: String, required: true, enum: ['beginner', 'intermediate', 'advanced'] },
    targetMuscleGroups: [{ type: String, required: true }],
    durationMinutes: { type: Number, required: true, min: 5 },
    suggestedFor: [{ type: mongoose_1.Types.ObjectId, ref: 'User', required: true }],
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Workout', workoutSchema);
