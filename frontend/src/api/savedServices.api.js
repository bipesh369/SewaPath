import { apiRequest } from './client.js';

export const listSavedServices = () =>
  apiRequest('/saved-services');

export const saveService = (serviceId) =>
  apiRequest('/saved-services', {
    method: 'POST',
    body: { serviceId },
  });

export const unsaveService = (serviceId) =>
  apiRequest(`/saved-services/${serviceId}`, {
    method: 'DELETE',
  });