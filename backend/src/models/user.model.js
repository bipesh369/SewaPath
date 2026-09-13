import mongoose from "mongoose";

import { ROLES } from "../constants.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    passwordHash: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: Object.values(ROLES),
      default: ROLES.CITIZEN,
    },

    preferredLanguage: {
      type: String,
      enum: ["en", "ne"],
      default: "en",
    },

    // Password reset OTP
    passwordResetOtpHash: {
      type: String,
      default: null,
    },

    passwordResetOtpExpiresAt: {
      type: Date,
      default: null,
    },

    passwordResetOtpAttempts: {
      type: Number,
      default: 0,
    },

    // Temporary token created after successful OTP verification
    passwordResetVerifiedTokenHash: {
      type: String,
      default: null,
    },

    passwordResetVerifiedExpiresAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

userSchema.methods.toSafeJSON = function toSafeJSON() {
  return {
    id: this._id,
    name: this.name,
    email: this.email,
    role: this.role,
    preferredLanguage: this.preferredLanguage,
  };
};

export default mongoose.model("User", userSchema);