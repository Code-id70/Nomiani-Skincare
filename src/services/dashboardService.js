import { apiRequest } from "./api";

export async function getDashboardStats() {
  return apiRequest("/api/admin/dashboard/");
}

export async function getAnalytics(period = "30_days") {
  return apiRequest(`/api/admin/analytics/?period=${period}`);
}

export async function getAdminOrders(params = {}) {
  const query = new URLSearchParams();

  if (params.order_status) query.set("order_status", params.order_status);
  if (params.payment_status) query.set("payment_status", params.payment_status);
  if (params.order_type) query.set("order_type", params.order_type);
  if (params.search) query.set("search", params.search);

  const qs = query.toString();
  return apiRequest(`/api/admin/orders/${qs ? `?${qs}` : ""}`);
}

export async function getAdminProducts(params = {}) {
  const query = new URLSearchParams();

  if (params.category) query.set("category", params.category);
  if (params.featured !== undefined) query.set("featured", params.featured);
  if (params.search) query.set("search", params.search);

  const qs = query.toString();
  return apiRequest(`/api/admin/products/${qs ? `?${qs}` : ""}`);
}

export async function updateProductStock(productId, quantity) {
  return apiRequest(`/api/admin/products/${productId}/stock/`, {
    method: "POST",
    body: JSON.stringify({ quantity }),
  });
}

export async function deleteProduct(productId) {
  return apiRequest(`/api/admin/products/${productId}/`, {
    method: "DELETE",
  });
}

export async function createProduct(productData) {
  return apiRequest("/api/admin/products/", {
    method: "POST",
    body: JSON.stringify(productData),
  });
}


