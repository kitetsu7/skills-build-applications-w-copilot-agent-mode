import { Schema, model, type InferSchemaType } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    level: { type: String, required: true, enum: ['beginner', 'intermediate', 'advanced'] },
    weeklyGoal: { type: Number, required: true, min: 1 },
    joinedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export type User = InferSchemaType<typeof userSchema>;

export default model('User', userSchema);
