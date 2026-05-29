import { Schema, Types, model, type InferSchemaType } from 'mongoose';

const workoutSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    difficulty: { type: String, required: true, enum: ['beginner', 'intermediate', 'advanced'] },
    targetMuscleGroups: [{ type: String, required: true }],
    durationMinutes: { type: Number, required: true, min: 5 },
    suggestedFor: [{ type: Types.ObjectId, ref: 'User', required: true }],
  },
  { timestamps: true }
);

export type Workout = InferSchemaType<typeof workoutSchema>;

export default model('Workout', workoutSchema);
