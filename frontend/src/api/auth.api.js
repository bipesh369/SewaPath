import { apiRequest } from "./client.js";

export const register = (payload) =>
  apiRequest("/auth/register", {
    method: "POST",
    body: payload,
    auth: false,
  });

export const login = (payload) =>
  apiRequest("/auth/login", {
    method: "POST",
    body: payload,
    auth: false,
  });

export const fetchMe = () => apiRequest("/auth/me");

export const updateLanguage = (preferredLanguage) =>
  apiRequest("/auth/me/language", {
    method: "PATCH",
    body: { preferredLanguage },
  });

export const forgotPassword = (email) =>
  apiRequest("/auth/forgot-password", {
    method: "POST",
    body: { email },
    auth: false,
  });

export const verifyResetOtp = (email, otp) =>
  apiRequest("/auth/verify-reset-otp", {
    method: "POST",
    body: {
      email,
      otp,
    },
    auth: false,
  });

export const resetPassword = (resetToken, password) =>
  apiRequest("/auth/reset-password", {
    method: "POST",
    body: {
      resetToken,
      password,
    },
    auth: false,
  });
