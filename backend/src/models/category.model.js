import mongoose from 'mongoose';
import { bilingualText } from './bilingual.schema.js';

const categorySchema = new mongoose.Schema(
  {
    name: bilingualText(),
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    icon: { type: String, default: 'folder' },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model('Category', categorySchema);
