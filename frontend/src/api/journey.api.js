import { apiRequest } from './client.js';

export const listSteps = (serviceId) =>
  apiRequest(`/services/${serviceId}/journey`, {
    auth: false,
  });

export const createStep = (serviceId, payload) =>
  apiRequest(`/services/${serviceId}/journey`, {
    method: 'POST',
    body: payload,
  });

export const updateStep = (serviceId, stepId, payload) =>
  apiRequest(`/services/${serviceId}/journey/${stepId}`, {
    method: 'PATCH',
    body: payload,
  });

export const deleteStep = (serviceId, stepId) =>
  apiRequest(`/services/${serviceId}/journey/${stepId}`, {
    method: 'DELETE',
  });