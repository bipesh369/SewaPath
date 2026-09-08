import SavedService from '../models/savedService.model.js';
import { ApiError } from '../utils/apiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const listSavedServices = asyncHandler(async (req, res) => {
  const saved = await SavedService.find({ user: req.user._id })
    .populate({
      path: 'service',
      populate: [
        { path: 'category', select: 'name slug icon' },
        { path: 'office', select: 'name level' },
      ],
    })
    .sort({ createdAt: -1 });
  res.json({ saved });
});

export const saveService = asyncHandler(async (req, res) => {
  const { serviceId } = req.body;
  if (!serviceId) throw new ApiError(400, 'serviceId is required.');
  try {
    const saved = await SavedService.create({ user: req.user._id, service: serviceId });
    res.status(201).json({ saved });
  } catch (err) {
    if (err.code === 11000) throw new ApiError(409, 'You already saved this service.');
    throw err;
  }
});

export const unsaveService = asyncHandler(async (req, res) => {
  const result = await SavedService.findOneAndDelete({
    user: req.user._id,
    service: req.params.serviceId,
  });
  if (!result) throw new ApiError(404, 'Saved service not found.');
  res.json({ message: 'Removed from your saved services.' });
});
