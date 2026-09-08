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
  if (!process.env.MONGO_URI)
    throw new Error("MONGO_URI is not set. Copy .env.example to .env first.");
  await connectDB(process.env.MONGO_URI);

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

  console.log("[seed] creating categories...");
  const categories = await Category.insertMany(categorySeed);
  const categoryBySlug = Object.fromEntries(categories.map((c) => [c.slug, c]));

  console.log("[seed] creating offices...");
  const officeDocs = officeSeed.map(({ key, ...rest }) => rest);
  const offices = await Office.insertMany(officeDocs);
  const officeByKey = Object.fromEntries(
    officeSeed.map((o, i) => [o.key, offices[i]]),
  );

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
        `[seed] skipping ${raw.slug}: missing category or office reference`,
      );
      continue;
    }

    const service = await Service.create({
      ...serviceFields,
      category: category._id,
      office: office._id,
    });

    // Create eligibility questions for this service
    await EligibilityQuestion.insertMany(
      eligibility.map((q, i) => ({
        ...q,
        service: service._id,
        order: i + 1,
      })),
    );
    await DocumentRequirement.insertMany(
      documents.map((d, i) => ({ ...d, service: service._id, order: i + 1 })),
    );
    await JourneyStep.insertMany(
      journey.map((s, i) => ({ ...s, service: service._id, order: i + 1 })),
    );
  }

  console.log("[seed] creating a default admin account...");
  const adminEmail = process.env.SEED_ADMIN_EMAIL || "admin@sewapath.gov.np";
  const adminPassword = process.env.SEED_ADMIN_PASSWORD || "SEWApath123";
  const existingAdmin = await User.findOne({ email: adminEmail });
  if (!existingAdmin) {
    await User.create({
      name: "SewaPath Admin",
      email: adminEmail,
      passwordHash: await bcrypt.hash(adminPassword, 10),
      role: ROLES.ADMIN,
    });
    console.log(`[seed] admin account -> ${adminEmail} / ${adminPassword}`);
  }

  console.log(
    `[seed] done. ${categories.length} categories, ${offices.length} offices, ${serviceSeed.length} services.`,
  );
  process.exit(0);
}

run().catch((err) => {
  console.error("[seed] failed:", err);
  process.exit(1);
});
