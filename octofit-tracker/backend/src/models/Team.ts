import { Schema, Types, model, type InferSchemaType } from 'mongoose';

const teamSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    members: [{ type: Types.ObjectId, ref: 'User', required: true }],
    points: { type: Number, required: true, min: 0, default: 0 },
  },
  { timestamps: true }
);

export type Team = InferSchemaType<typeof teamSchema>;

export default model('Team', teamSchema);
