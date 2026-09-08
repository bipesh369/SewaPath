import Service from "../models/service.model.js";
import EligibilityQuestion from "../models/eligibilityQuestion.model.js";
import DocumentRequirement from "../models/documentRequirement.model.js";
import JourneyStep from "../models/journeyStep.model.js";

import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const POPULATE = [
  {
    path: "category",
    select: "name slug icon",
  },
  {
    path: "office",
    select:
      "name level address latitude longitude phone email officialLink",
  },
];

// GET /api/services?q=&category=&goal=
export const listServices = asyncHandler(async (req, res) => {
  const { q, goal, category, includeInactive } = req.query;

  const text = (q || goal || "").trim();

  const filter = {};

  if (!includeInactive) {
    filter.isActive = true;
  }

  if (category) {
    filter.category = category;
  }

  if (text) {
    const terms = text.toLowerCase().split(/\s+/).filter(Boolean);

    filter.$or = [
      { "title.en": { $regex: text, $options: "i" } },
      { "title.ne": { $regex: text, $options: "i" } },
      { "summary.en": { $regex: text, $options: "i" } },
      { "summary.ne": { $regex: text, $options: "i" } },
      {
        keywords: {
          $in: terms.map((term) => new RegExp(term, "i")),
        },
      },
    ];
  }

  const services = await Service.find(filter)
    .populate(POPULATE)
    .sort({ "title.en": 1 });

  res.json({
    services,
    count: services.length,
  });
});

// GET /api/services/slug/:slug
export const getServiceBySlug = asyncHandler(async (req, res) => {
  const service = await Service.findOne({
    slug: req.params.slug,
  }).populate(POPULATE);

  if (!service) {
    throw new ApiError(404, "Service not found.");
  }

  res.json({ service });
});

// GET /api/services/:id
export const getServiceById = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id).populate(POPULATE);

  if (!service) {
    throw new ApiError(404, "Service not found.");
  }

  const { vehicleCategory } = req.query;

const eligibilityFilter = {
  service: service._id,
};

if (vehicleCategory) {
  eligibilityFilter.vehicleCategories = vehicleCategory;
}

  const [eligibility, documents, journey] = await Promise.all([
    EligibilityQuestion.find(eligibilityFilter)
    
      .populate({
        path: "alternativeServices",
        select: "title slug summary",
      })
      .sort({ order: 1 }),

    DocumentRequirement.find({
      service: service._id,
    }).sort({ order: 1 }),

    JourneyStep.find({
      service: service._id,
    }).sort({ order: 1 }),
  ]);

  res.json({
    service,
    eligibility,
    documents,
    journey,
  });
});

// POST /api/services
export const createService = asyncHandler(async (req, res) => {
  const service = await Service.create(req.body);

  res.status(201).json({
    service,
  });
});

// PATCH /api/services/:id
export const updateService = asyncHandler(async (req, res) => {
  req.body.lastVerifiedAt = new Date();

  const service = await Service.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  ).populate(POPULATE);

  if (!service) {
    throw new ApiError(404, "Service not found.");
  }

  res.json({
    service,
  });
});

// DELETE /api/services/:id
export const deleteService = asyncHandler(async (req, res) => {
  const service = await Service.findByIdAndDelete(req.params.id);

  if (!service) {
    throw new ApiError(404, "Service not found.");
  }

  await Promise.all([
    EligibilityQuestion.deleteMany({
      service: service._id,
    }),

    DocumentRequirement.deleteMany({
      service: service._id,
    }),

    JourneyStep.deleteMany({
      service: service._id,
    }),
  ]);

  res.json({
    message: "Service and its related content deleted.",
  });
});