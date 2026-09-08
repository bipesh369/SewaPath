import { apiRequest } from './client.js';

export const listDocuments = (serviceId) =>
  apiRequest(`/services/${serviceId}/documents`, {
    auth: false,
  });

export const createDocument = (serviceId, payload) =>
  apiRequest(`/services/${serviceId}/documents`, {
    method: 'POST',
    body: payload,
  });

export const updateDocument = (serviceId, documentId, payload) =>
  apiRequest(`/services/${serviceId}/documents/${documentId}`, {
    method: 'PATCH',
    body: payload,
  });

export const deleteDocument = (serviceId, documentId) =>
  apiRequest(`/services/${serviceId}/documents/${documentId}`, {
    method: 'DELETE',
  });