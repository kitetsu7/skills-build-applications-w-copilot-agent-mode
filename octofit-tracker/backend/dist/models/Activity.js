"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const activitySchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true, enum: ['run', 'cycle', 'swim', 'strength', 'yoga'] },
    durationMinutes: { type: Number, required: true, min: 1 },
    caloriesBurned: { type: Number, required: true, min: 1 },
    performedAt: { type: Date, required: true },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Activity', activitySchema);
