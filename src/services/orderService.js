import { apiRequest } from "./api";

export async function createOrder(orderData) {
  return apiRequest("/api/orders/", {
    method: "POST",
    body: JSON.stringify(orderData),
  });
}


