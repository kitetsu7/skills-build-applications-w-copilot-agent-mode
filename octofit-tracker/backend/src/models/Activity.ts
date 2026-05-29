import { Schema, Types, model, type InferSchemaType } from 'mongoose';

const activitySchema = new Schema(
  {
    user: { type: Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true, enum: ['run', 'cycle', 'swim', 'strength', 'yoga'] },
    durationMinutes: { type: Number, required: true, min: 1 },
    caloriesBurned: { type: Number, required: true, min: 1 },
    performedAt: { type: Date, required: true },
  },
  { timestamps: true }
);

export type Activity = InferSchemaType<typeof activitySchema>;

export default model('Activity', activitySchema);
