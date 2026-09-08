import DocumentRequirement from '../models/documentRequirement.model.js';
import { ApiError } from '../utils/apiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const listDocuments = asyncHandler(async (req, res) => {
  const documents = await DocumentRequirement.find({ service: req.params.serviceId }).sort({ order: 1 });
  res.json({ documents });
});

export const createDocument = asyncHandler(async (req, res) => {
  const document = await DocumentRequirement.create({ ...req.body, service: req.params.serviceId });
  res.status(201).json({ document });
});

export const updateDocument = asyncHandler(async (req, res) => {
  const document = await DocumentRequirement.findOneAndUpdate(
    { _id: req.params.documentId, service: req.params.serviceId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!document) throw new ApiError(404, 'Document requirement not found.');
  res.json({ document });
});

export const deleteDocument = asyncHandler(async (req, res) => {
  const document = await DocumentRequirement.findOneAndDelete({
    _id: req.params.documentId,
    service: req.params.serviceId,
  });
  if (!document) throw new ApiError(404, 'Document requirement not found.');
  res.json({ message: 'Document requirement deleted.' });
});
