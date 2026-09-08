import { apiRequest } from './client.js';

export const listCategories = () =>
  apiRequest('/categories', { auth: false });

export const createCategory = (payload) =>
  apiRequest('/categories', {
    method: 'POST',
    body: payload,
  });

export const updateCategory = (id, payload) =>
  apiRequest(`/categories/${id}`, {
    method: 'PATCH',
    body: payload,
  });

export const deleteCategory = (id) =>
  apiRequest(`/categories/${id}`, {
    method: 'DELETE',
  });