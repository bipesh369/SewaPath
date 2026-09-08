import mongoose from "mongoose";

import {
  bilingualText,
  bilingualTextOptional,
} from "./bilingual.schema.js";

const eligibilityQuestionSchema = new mongoose.Schema(
  {
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },

    order: {
  type: Number,
  required: true,
},

type: {
  type: String,
  enum: ["age", "health", "document"],
},

minimumAge: {
  type: Number,
},

    // Which vehicle categories should see this question?
    vehicleCategories: [
      {
        type: String,
        enum: ["A", "K", "B", "C", "C1", "D", "E", "F", "G"],
      },
    ],

    prompt: bilingualText(),

    reasonNo: bilingualTextOptional(),

    alternativeServices: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
      },
    ],
  },
  { timestamps: true }
);

eligibilityQuestionSchema.index({ service: 1, order: 1 });

export default mongoose.model(
  "EligibilityQuestion",
  eligibilityQuestionSchema
);