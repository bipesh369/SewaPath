import { apiRequest } from './client.js';

export const listOffices = () =>
  apiRequest('/offices', {
    auth: false,
  });

export const getOffice = (id) =>
  apiRequest(`/offices/${id}`, {
    auth: false,
  });

export const createOffice = (payload) =>
  apiRequest('/offices', {
    method: 'POST',
    body: payload,
  });

export const updateOffice = (id, payload) =>
  apiRequest(`/offices/${id}`, {
    method: 'PATCH',
    body: payload,
  });

export const deleteOffice = (id) =>
  apiRequest(`/offices/${id}`, {
    method: 'DELETE',
  });