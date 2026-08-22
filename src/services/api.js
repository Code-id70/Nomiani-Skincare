const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  throw new Error(
    "Missing VITE_API_URL. Set it in your deployment environment variables."
  );
}

export async function apiRequest(endpoint, options = {}) {
  const token = !options.public && localStorage.getItem("accessToken");

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  delete options.public;

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
      data.detail ||
      "Something went wrong. Please try again."
    );
  }

  return data;
}