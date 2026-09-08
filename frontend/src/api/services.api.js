import { apiRequest } from './client.js';

export const listServices = (params = {}) => {
  const qs = new URLSearchParams(
    Object.entries(params).filter(([, v]) => v)
  );

  const suffix = qs.toString() ? `?${qs.toString()}` : '';

  return apiRequest(`/services${suffix}`, {
    auth: false,
  });
};

export const getServiceBySlug = (slug) =>
  apiRequest(`/services/slug/${slug}`, {
    auth: false,
  });

export const getServiceById = (id) =>
  apiRequest(`/services/${id}`, {
    auth: false,
  });

export const createService = (payload) =>
  apiRequest('/services', {
    method: 'POST',
    body: payload,
  });

export const updateService = (id, payload) =>
  apiRequest(`/services/${id}`, {
    method: 'PATCH',
    body: payload,
  });

export const deleteService = (id) =>
  apiRequest(`/services/${id}`, {
    method: 'DELETE',
  });