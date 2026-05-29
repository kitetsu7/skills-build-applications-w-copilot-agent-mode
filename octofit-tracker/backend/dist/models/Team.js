"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const teamSchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    members: [{ type: mongoose_1.Types.ObjectId, ref: 'User', required: true }],
    points: { type: Number, required: true, min: 0, default: 0 },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Team', teamSchema);
