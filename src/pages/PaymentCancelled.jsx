import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

function PaymentCancelled() {
  return (
    <div className="min-h-screen bg-[#EFE4D4] flex items-start justify-center py-16 px-4">
      <div className="w-full max-w-md bg-white border border-[#D4C5AB] rounded-3xl p-8 shadow-sm text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Cancelled</h1>
        <p className="text-gray-600 mb-6">
          You cancelled the payment. Your order has not been placed yet.
        </p>
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
      </div>
    </div>
  );
}

export default PaymentCancelled;
