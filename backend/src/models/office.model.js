import mongoose from 'mongoose';
import { bilingualText } from './bilingual.schema.js';
import { OFFICE_LEVELS } from '../constants.js';

const officeSchema = new mongoose.Schema(
  {
    name: bilingualText(),
    level: { type: String, enum: OFFICE_LEVELS, required: true },
    address: bilingualText(),
    phone: { type: String, default: '' },
    email: { type: String, default: '' },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    officialLink: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.model('Office', officeSchema);
