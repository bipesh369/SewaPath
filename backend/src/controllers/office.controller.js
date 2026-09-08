import Office from '../models/office.model.js';
import { ApiError } from '../utils/apiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const listOffices = asyncHandler(async (req, res) => {
  const offices = await Office.find().sort({ 'name.en': 1 });
  res.json({ offices });
});

export const getOffice = asyncHandler(async (req, res) => {
  const office = await Office.findById(req.params.id);
  if (!office) throw new ApiError(404, 'Office not found.');
  res.json({ office });
});

export const createOffice = asyncHandler(async (req, res) => {
  const office = await Office.create(req.body);
  res.status(201).json({ office });
});

export const updateOffice = asyncHandler(async (req, res) => {
  const office = await Office.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!office) throw new ApiError(404, 'Office not found.');
  res.json({ office });
});

export const deleteOffice = asyncHandler(async (req, res) => {
  const office = await Office.findByIdAndDelete(req.params.id);
  if (!office) throw new ApiError(404, 'Office not found.');
  res.json({ message: 'Office deleted.' });
});
