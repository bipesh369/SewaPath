import mongoose from "mongoose";
import { bilingualText, bilingualTextOptional } from "./bilingual.schema.js";

const serviceSchema = new mongoose.Schema(
  {
    title: bilingualText(),
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    summary: bilingualText(),
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    office: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Office",
      required: true,
    },
    // Free-text search terms in both languages, e.g. "moved to another district", "बसाइँ सराइ"
    keywords: [{ type: String, trim: true, lowercase: true }],

    eligibility: [
  {
    vehicleCategory: {
      type: String,
      enum: ["A", "K", "B", "OTHER"],
      required: true,
    },

    prompt: bilingualText(),

    reasonNo: bilingualText(),
  },
],

    feeInfo: bilingualTextOptional(),
    timeInfo: bilingualTextOptional(),
    officialLink: { type: String, default: "" },
    isActive: { type: Boolean, default: true },
    lastVerifiedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

serviceSchema.index({ keywords: 1 });
serviceSchema.index({
  "title.en": "text",
  "title.ne": "text",
  "summary.en": "text",
  keywords: "text",
});

export default mongoose.model("Service", serviceSchema);
