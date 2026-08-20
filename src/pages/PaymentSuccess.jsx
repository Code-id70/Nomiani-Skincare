import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle2, Loader2 } from "lucide-react";
import { apiRequest } from "../services/api";

function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const orderNumber = searchParams.get("order");

  const [status, setStatus] = useState("verifying");
  const [message, setMessage] = useState("Verifying your payment...");

  useEffect(() => {
    if (!orderNumber) {
      setStatus("error");
      setMessage("Missing order reference.");
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const orderRes = await apiRequest(`/api/orders/${orderNumber}/`);
        const orderData = orderRes.data;
        const checkoutId = orderData?.payment_reference;

        if (!checkoutId) {
          setStatus("error");
          setMessage("No payment reference found for this order.");
          return;
        }

        const verifyRes = await apiRequest("/api/payments/yoco/verify/", {
          method: "POST",
          body: JSON.stringify({ checkout_id: checkoutId }),
        });
        const verifyData = verifyRes.data;
        const paid = verifyData?.data?.status === "successful";
        setStatus(paid ? "success" : "error");
        setMessage(
          paid
            ? "Payment confirmed!"
            : `Payment not successful. Status: ${verifyData?.data?.status || 'unknown'}`
        );
      } catch (err) {
        setStatus("error");
        setMessage(err.message || "Could not verify payment.");
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [orderNumber]);

  return (
    <div className="min-h-screen bg-[#EFE4D4] flex items-start justify-center py-16 px-4">
      <div className="w-full max-w-md bg-white border border-[#D4C5AB] rounded-3xl p-8 shadow-sm text-center">
        {status === "verifying" && (
          <>
            <Loader2 size={40} className="mx-auto text-[#785900] animate-spin mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Verifying Payment</h1>
            <p className="text-gray-600">Please wait while we confirm your payment...</p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={34} className="text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful</h1>
            <p className="text-gray-600 mb-6">
              {message} {orderNumber ? `Order #${orderNumber}` : ""}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/shop"
                className="flex-1 text-center bg-[#785900] text-white py-3 rounded-xl font-semibold hover:bg-[#5f4700] transition"
              >
                Continue Shopping
              </Link>
              <Link
                to="/"
                className="flex-1 text-center border border-[#D4C5AB] bg-white text-gray-700 py-3 rounded-xl font-semibold hover:bg-amber-50 transition"
              >
                Back to Home
              </Link>
            </div>
          </>
        )}

        {status === "error" && (
          <>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Issue</h1>
            <p className="text-gray-600 mb-6">{message}</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/payment-method"
                className="flex-1 text-center bg-[#785900] text-white py-3 rounded-xl font-semibold hover:bg-[#5f4700] transition"
              >
                Try Again
              </Link>
              <Link
                to="/"
                className="flex-1 text-center border border-[#D4C5AB] bg-white text-gray-700 py-3 rounded-xl font-semibold hover:bg-amber-50 transition"
              >
                Back to Home
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default PaymentSuccess;
