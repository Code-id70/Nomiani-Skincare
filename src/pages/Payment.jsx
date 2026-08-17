import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, LockKeyhole, ShieldCheck } from "lucide-react";

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();

  const paymentMethod = location.state?.paymentMethod || "card";
  const total = location.state?.total || 0;

  const paymentNames = {
    card: "Card Payment",
    eft: "EFT / Bank Transfer",
    "instant-eft": "Instant EFT",
    collection: "Pay on Collection",
  };

  const handlePayment = () => {
    // UI only for now
    navigate("/order-confirmation");
  };

  return (
    <div className="min-h-screen bg-[#FFF8F2]">

      {/* Header */}
      <header className="border-b border-[#D4C5AB] bg-white">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link
            to="/payment-method"
            className="flex items-center gap-2 text-gray-600 hover:text-[#785900] transition"
          >
            <ArrowLeft size={20} />
            Change Payment Method
          </Link>

          <span className="font-semibold text-[#785900]">
            DELI EGGS
          </span>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">

        <div className="max-w-xl mx-auto">

          {/* Heading */}
          <div className="text-center mb-8">

            <span className="inline-block bg-amber-100 text-[#785900] px-4 py-2 rounded-full text-sm font-semibold mb-4">
              {paymentNames[paymentMethod]}
            </span>

            <h1
              className="text-4xl font-bold text-gray-900"
              style={{ fontFamily: "Montserrat" }}
            >
              Complete Payment
            </h1>

            <p className="mt-3 text-gray-600">
              Complete your payment to place your DELI EGGS order.
            </p>

          </div>

          {/* Payment Card */}
          <div className="bg-white border border-[#D4C5AB] rounded-3xl p-6 md:p-8 shadow-sm">

            {/* Total */}
            <div className="bg-[#FFF8F2] rounded-2xl p-5 mb-7 flex justify-between items-center">
              <span className="text-gray-600">
                Amount to pay
              </span>

              <span className="text-2xl font-bold text-[#785900]">
                R {Number(total).toFixed(2)}
              </span>
            </div>

            {paymentMethod === "card" && (
              <div className="space-y-5">

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Card Number
                  </label>

                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="w-full border border-[#D4C5AB] rounded-xl px-4 py-3 outline-none focus:border-[#785900] focus:ring-2 focus:ring-amber-100"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Expiry Date
                    </label>

                    <input
                      type="text"
                      placeholder="MM / YY"
                      className="w-full border border-[#D4C5AB] rounded-xl px-4 py-3 outline-none focus:border-[#785900] focus:ring-2 focus:ring-amber-100"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      CVV
                    </label>

                    <input
                      type="password"
                      placeholder="•••"
                      className="w-full border border-[#D4C5AB] rounded-xl px-4 py-3 outline-none focus:border-[#785900] focus:ring-2 focus:ring-amber-100"
                    />
                  </div>

                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Cardholder Name
                  </label>

                  <input
                    type="text"
                    placeholder="Name on card"
                    className="w-full border border-[#D4C5AB] rounded-xl px-4 py-3 outline-none focus:border-[#785900] focus:ring-2 focus:ring-amber-100"
                  />
                </div>

              </div>
            )}

            {paymentMethod === "eft" && (
              <div className="bg-amber-50 rounded-2xl p-6">

                <h3 className="font-bold text-lg mb-4">
                  Bank Transfer Details
                </h3>

                <div className="space-y-3 text-sm">

                  <div className="flex justify-between">
                    <span className="text-gray-500">Bank</span>
                    <span className="font-semibold">Bank Name</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">Account Name</span>
                    <span className="font-semibold">DELI EGGS</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">Account Number</span>
                    <span className="font-semibold">0000000000</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">Reference</span>
                    <span className="font-semibold">DELI-ORDER</span>
                  </div>

                </div>

                <p className="text-sm text-gray-600 mt-5">
                  Please use your order reference when making the payment.
                </p>

              </div>
            )}

            {paymentMethod === "instant-eft" && (
              <div className="text-center bg-amber-50 rounded-2xl p-8">

                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <LockKeyhole
                    size={28}
                    className="text-[#785900]"
                  />
                </div>

                <h3 className="font-bold text-lg">
                  Instant EFT
                </h3>

                <p className="text-gray-600 text-sm mt-2">
                  You will be redirected to a secure banking
                  environment to complete your payment.
                </p>

              </div>
            )}

            {paymentMethod === "collection" && (
              <div className="text-center bg-amber-50 rounded-2xl p-8">

                <h3 className="font-bold text-lg">
                  Pay on Collection
                </h3>

                <p className="text-gray-600 text-sm mt-2">
                  Your order will be prepared for collection.
                  Payment will be made when you collect your order.
                </p>

              </div>
            )}

            {/* Pay Button */}
            <button
              onClick={handlePayment}
              className="w-full mt-8 bg-[#785900] text-white py-4 rounded-xl font-semibold hover:bg-[#5f4700] transition"
            >
              {paymentMethod === "collection"
                ? "Confirm Order"
                : `Pay R ${Number(total).toFixed(2)}`}
            </button>

            {/* Security */}
            <div className="flex items-center justify-center gap-2 mt-5 text-sm text-gray-500">
              <ShieldCheck size={18} className="text-green-600" />
              Your payment information is secure
            </div>

          </div>

        </div>

      </main>
    </div>
  );
}

export default Payment;