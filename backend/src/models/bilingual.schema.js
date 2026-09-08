import mongoose from 'mongoose';

// Shared shape for every citizen-facing piece of text: English + Nepali.
export const bilingualText = (required = true) => ({
  en: { type: String, required, trim: true },
  ne: { type: String, required, trim: true },
});

export const bilingualTextOptional = () => ({
  en: { type: String, trim: true, default: '' },
  ne: { type: String, trim: true, default: '' },
});
