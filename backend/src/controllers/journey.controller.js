import JourneyStep from '../models/journeyStep.model.js';
import { ApiError } from '../utils/apiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const listSteps = asyncHandler(async (req, res) => {
  const steps = await JourneyStep.find({ service: req.params.serviceId }).sort({ order: 1 });
  res.json({ steps });
});

export const createStep = asyncHandler(async (req, res) => {
  const step = await JourneyStep.create({ ...req.body, service: req.params.serviceId });
  res.status(201).json({ step });
});

export const updateStep = asyncHandler(async (req, res) => {
  const step = await JourneyStep.findOneAndUpdate(
    { _id: req.params.stepId, service: req.params.serviceId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!step) throw new ApiError(404, 'Journey step not found.');
  res.json({ step });
});

export const deleteStep = asyncHandler(async (req, res) => {
  const step = await JourneyStep.findOneAndDelete({ _id: req.params.stepId, service: req.params.serviceId });
  if (!step) throw new ApiError(404, 'Journey step not found.');
  res.json({ message: 'Journey step deleted.' });
});
