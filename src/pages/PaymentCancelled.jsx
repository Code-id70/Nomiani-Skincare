import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import BottomNav from "../components/layout/BottomNav";

function PaymentCancelled() {
  return (
    <>
    <div className="min-h-screen bg-surface-container flex items-start justify-center py-16 px-4">
      <div className="w-full max-w-md bg-white border border-outline-variant rounded-3xl p-8 shadow-sm text-center">
        <h1 className="text-2xl font-bold text-on-surface mb-2">Payment Cancelled</h1>
        <p className="text-on-surface-variant mb-6">
          You cancelled the payment. Your order has not been placed yet.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            to="/checkout"
            className="flex-1 text-center bg-primary text-white py-3 rounded-xl font-semibold hover:bg-primary/90 transition"
          >
            Try Again
          </Link>
          <Link
            to="/"
            className="flex-1 text-center border border-outline-variant bg-white text-on-surface-variant py-3 rounded-xl font-semibold hover:bg-surface-container-high transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
    <BottomNav />
    </>
  );
}

export default PaymentCancelled;


