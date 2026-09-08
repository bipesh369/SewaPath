import { apiRequest } from './client.js';

export const register = (payload) =>
  apiRequest('/auth/register', {
    method: 'POST',
    body: payload,
    auth: false,
  });

export const login = (payload) =>
  apiRequest('/auth/login', {
    method: 'POST',
    body: payload,
    auth: false,
  });

export const fetchMe = () => apiRequest('/auth/me');

export const updateLanguage = (preferredLanguage) =>
  apiRequest('/auth/me/language', {
    method: 'PATCH',
    body: { preferredLanguage },
  });