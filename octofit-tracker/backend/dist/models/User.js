"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    level: { type: String, required: true, enum: ['beginner', 'intermediate', 'advanced'] },
    weeklyGoal: { type: Number, required: true, min: 1 },
    joinedAt: { type: Date, default: Date.now },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('User', userSchema);
