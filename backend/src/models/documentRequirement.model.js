import mongoose from 'mongoose';
import { bilingualText, bilingualTextOptional } from './bilingual.schema.js';

const documentRequirementSchema = new mongoose.Schema(
  {
    service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
    order: { type: Number, required: true },
    name: bilingualText(),
    note: bilingualTextOptional(),
    isMandatory: { type: Boolean, default: true },
  },
  { timestamps: true }
);

documentRequirementSchema.index({ service: 1, order: 1 });

export default mongoose.model('DocumentRequirement', documentRequirementSchema);
