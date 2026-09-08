import EligibilityQuestion from '../models/eligibilityQuestion.model.js';
import { ApiError } from '../utils/apiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import Service from "../models/service.model.js";

export const listQuestions = asyncHandler(async (req, res) => {
  console.log("DB:", EligibilityQuestion.db.name);
  console.log("SERVICE ID:", req.params.serviceId);

  const total = await EligibilityQuestion.countDocuments();

  const allQuestions = await EligibilityQuestion.find({}).limit(3);

  console.log("TOTAL QUESTIONS:", total);
  console.log("SAMPLE QUESTIONS:", allQuestions);

  const questions = await EligibilityQuestion.find({
    service: req.params.serviceId,
  });

  console.log("FOUND QUESTIONS:", questions.length);

  res.json({ questions });
});

export const createQuestion = asyncHandler(async (req, res) => {
  const question = await EligibilityQuestion.create({ ...req.body, service: req.params.serviceId });
  res.status(201).json({ question });
});

export const updateQuestion = asyncHandler(async (req, res) => {
  const question = await EligibilityQuestion.findOneAndUpdate(
    { _id: req.params.questionId, service: req.params.serviceId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!question) throw new ApiError(404, 'Eligibility question not found.');
  res.json({ question });
});

export const deleteQuestion = asyncHandler(async (req, res) => {
  const question = await EligibilityQuestion.findOneAndDelete({
    _id: req.params.questionId,
    service: req.params.serviceId,
  });
  if (!question) throw new ApiError(404, 'Eligibility question not found.');
  res.json({ message: 'Question deleted.' });
});

// POST /api/services/:serviceId/eligibility/check  { answers: { [questionId]: 'yes'|'no' } }
// Walks the questions in order; the first "no" ends the check as not eligible.
export const checkEligibility = asyncHandler(async (req, res) => {
  const { answers = {} } = req.body;
  const questions = await EligibilityQuestion.find({ service: req.params.serviceId })
    .populate({ path: 'alternativeServices', select: 'title slug summary' })
    .sort({ order: 1 });

  for (const question of questions) {
    const answer = answers[question._id.toString()];
    if (answer === 'no') {
      return res.json({
        eligible: false,
        stoppedAt: question._id,
        reason: question.reasonNo,
        alternativeServices: question.alternativeServices,
      });
    }
    if (answer !== 'yes') {
      throw new ApiError(400, 'Please answer every question before checking eligibility.');
    }
  }

  res.json({ eligible: true });
});
