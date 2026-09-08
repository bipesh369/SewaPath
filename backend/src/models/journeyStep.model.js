import mongoose from 'mongoose';
import { bilingualText } from './bilingual.schema.js';

const journeyStepSchema = new mongoose.Schema(
  {
    service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
    order: { type: Number, required: true },
    title: bilingualText(),
    description: bilingualText(),
  },
  { timestamps: true }
);

journeyStepSchema.index({ service: 1, order: 1 });

export default mongoose.model('JourneyStep', journeyStepSchema);
