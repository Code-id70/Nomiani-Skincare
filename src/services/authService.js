import { apiRequest } from "./api";

export async function login(email, password) {
  return apiRequest("/api/auth/login/", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  });
}

export async function getCurrentUser() {
  return apiRequest("/api/auth/me/");
}

export async function logout(refreshToken) {
  return apiRequest("/api/auth/logout/", {
    method: "POST",
    body: JSON.stringify({
      refresh: refreshToken,
    }),
  });
}

