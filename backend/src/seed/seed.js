import "dotenv/config";

import bcrypt from "bcryptjs";

import { connectDB } from "../config/db.js";

import { ROLES } from "../constants.js";

import User from "../models/user.model.js";
import Category from "../models/category.model.js";
import Office from "../models/office.model.js";
import Service from "../models/service.model.js";
import EligibilityQuestion from "../models/eligibilityQuestion.model.js";
import DocumentRequirement from "../models/documentRequirement.model.js";
import JourneyStep from "../models/journeyStep.model.js";
import SavedService from "../models/savedService.model.js";

import { categories as categorySeed } from "./data/categories.data.js";
import { offices as officeSeed } from "./data/offices.data.js";
import { services as serviceSeed } from "./data/services.data.js";

async function run() {
  // Check required environment variables
  if (!process.env.MONGO_URI) {
    throw new Error(
      "MONGO_URI is not set. Copy .env.example to .env first."
    );
  }

  if (!process.env.ADMIN_EMAIL) {
    throw new Error("ADMIN_EMAIL is not set in .env");
  }

  if (!process.env.ADMIN_PASSWORD) {
    throw new Error("ADMIN_PASSWORD is not set in .env");
  }

  const adminEmail = process.env.ADMIN_EMAIL.trim().toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD;

  await connectDB(process.env.MONGO_URI);

  // -----------------------------
  // Clear existing content
  // -----------------------------

  console.log("[seed] clearing existing content...");

  await Promise.all([
    EligibilityQuestion.deleteMany({}),
    DocumentRequirement.deleteMany({}),
    JourneyStep.deleteMany({}),
    SavedService.deleteMany({}),
    Service.deleteMany({}),
    Office.deleteMany({}),
    Category.deleteMany({}),
  ]);

  // -----------------------------
  // Create categories
  // -----------------------------

  console.log("[seed] creating categories...");

  const categories = await Category.insertMany(categorySeed);

  const categoryBySlug = Object.fromEntries(
    categories.map((c) => [c.slug, c])
  );

  // -----------------------------
  // Create offices
  // -----------------------------

  console.log("[seed] creating offices...");

  const officeDocs = officeSeed.map(({ key, ...rest }) => rest);

  const offices = await Office.insertMany(officeDocs);

  const officeByKey = Object.fromEntries(
    officeSeed.map((o, i) => [o.key, offices[i]])
  );

  // -----------------------------
  // Create services
  // -----------------------------

  console.log("[seed] creating the 12-service launch catalog...");

  for (const raw of serviceSeed) {
    const {
      categorySlug,
      officeKey,
      eligibility,
      documents,
      journey,
      ...serviceFields
    } = raw;

    const category = categoryBySlug[categorySlug];
    const office = officeByKey[officeKey];

    if (!category || !office) {
      console.warn(
        `[seed] skipping ${raw.slug}: missing category or office reference`
      );
      continue;
    }

    const service = await Service.create({
      ...serviceFields,
      category: category._id,
      office: office._id,
    });

    // Create eligibility questions
    await EligibilityQuestion.insertMany(
      eligibility.map((q, i) => ({
        ...q,
        service: service._id,
        order: i + 1,
      }))
    );

    // Create document requirements
    await DocumentRequirement.insertMany(
      documents.map((d, i) => ({
        ...d,
        service: service._id,
        order: i + 1,
      }))
    );

    // Create journey steps
    await JourneyStep.insertMany(
      journey.map((s, i) => ({
        ...s,
        service: service._id,
        order: i + 1,
      }))
    );
  }

  // -----------------------------
  // Create / update admin
  // -----------------------------

  console.log("[seed] creating/updating default admin account...");

  const passwordHash = await bcrypt.hash(adminPassword, 10);

  let admin = await User.findOne({
    email: adminEmail,
  });

  if (!admin) {
    // Admin doesn't exist, create it
    admin = await User.create({
      name: "SewaPath Admin",
      email: adminEmail,
      passwordHash,
      role: ROLES.ADMIN,
    });

    console.log(`[seed] admin account created -> ${adminEmail}`);
  } else {
    // Admin already exists, update password and role
    admin.name = "SewaPath Admin";
    admin.passwordHash = passwordHash;
    admin.role = ROLES.ADMIN;

    await admin.save();

    console.log(`[seed] admin account updated -> ${adminEmail}`);
  }

  // -----------------------------
  // Done
  // -----------------------------

  console.log(
    `[seed] done. ${categories.length} categories, ${offices.length} offices, ${serviceSeed.length} services.`
  );

  process.exit(0);
}

run().catch((err) => {
  console.error("[seed] failed:", err);
  process.exit(1);
});