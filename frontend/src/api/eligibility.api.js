import { apiRequest } from './client.js';

export const listQuestions = (serviceId) =>
  apiRequest(`/services/${serviceId}/eligibility`, {
    auth: false,
  });

export const checkEligibility = (serviceId, answers) =>
  apiRequest(`/services/${serviceId}/eligibility/check`, {
    method: 'POST',
    body: { answers },
    auth: false,
  });

export const createQuestion = (serviceId, payload) =>
  apiRequest(`/services/${serviceId}/eligibility`, {
    method: 'POST',
    body: payload,
  });

export const updateQuestion = (serviceId, questionId, payload) =>
  apiRequest(`/services/${serviceId}/eligibility/${questionId}`, {
    method: 'PATCH',
    body: payload,
  });

export const deleteQuestion = (serviceId, questionId) =>
  apiRequest(`/services/${serviceId}/eligibility/${questionId}`, {
    method: 'DELETE',
  });