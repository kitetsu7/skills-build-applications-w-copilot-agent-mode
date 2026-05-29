import { Schema, Types, model, type InferSchemaType } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    user: { type: Types.ObjectId, ref: 'User', required: true },
    score: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 },
    streakDays: { type: Number, required: true, min: 0 },
    weekOf: { type: Date, required: true },
  },
  { timestamps: true }
);

export type Leaderboard = InferSchemaType<typeof leaderboardSchema>;

export default model('Leaderboard', leaderboardSchema);
