import { Link, useNavigate, useLocation } from "react-router-dom";
import { CreditCard, Landmark, Smartphone, Banknote, ArrowLeft, ShieldCheck } from "lucide-react";
import { useCart } from "../context/CartContext";

function PaymentMethod() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems } = useCart();

  let customer = location.state?.customer;
  let deliveryMethod = location.state?.deliveryMethod;

  if (!customer || !deliveryMethod) {
    const saved = sessionStorage.getItem("checkoutData");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (!customer) customer = parsed.customer;
        if (!deliveryMethod) deliveryMethod = parsed.deliveryMethod;
      } catch {}
    }
  }

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  // Mock delivery fee for UI purposes
  const deliveryFee = 0;
  const total = subtotal + deliveryFee;

  const handlePaymentMethod = (method) => {
    navigate("/payment", {
      state: {
        paymentMethod: method,
        total,
        customer,
        deliveryMethod,
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#FFF8F2]">

      {/* Header */}
      <header className="border-b border-[#D4C5AB] bg-white">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link
            to="/checkout"
            className="flex items-center gap-2 text-gray-600 hover:text-[#785900] transition"
          >
            <ArrowLeft size={20} />
            Back to Checkout
          </Link>

          <span className="font-semibold text-[#785900]">
            DELI EGGS
          </span>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-6xl mx-auto px-6 py-12">

        <div className="max-w-3xl mx-auto">

          {/* Heading */}
          <div className="text-center mb-10">
            <span className="inline-block bg-amber-100 text-[#785900] px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Secure Checkout
            </span>

            <h1
              className="text-4xl md:text-5xl font-bold text-gray-900"
              style={{ fontFamily: "Montserrat" }}
            >
              Choose Payment Method
            </h1>

            <p className="mt-4 text-gray-600">
              Select how you'd like to pay for your DELI EGGS order.
            </p>
          </div>

          {/* Payment Options */}
          <div className="space-y-4">

            {/* Card */}
            <button
              onClick={() => handlePaymentMethod("card")}
              className="w-full bg-white border border-[#D4C5AB] rounded-2xl p-6 flex items-center gap-5 text-left hover:border-[#785900] hover:shadow-md transition-all group"
            >
              <div className="w-14 h-14 rounded-xl bg-amber-100 flex items-center justify-center">
                <CreditCard
                  size={26}
                  className="text-[#785900]"
                />
              </div>

              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-900">
                  Card Payment
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  Pay securely using your debit or credit card.
                </p>

                <div className="flex gap-2 mt-3">
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                    Visa
                  </span>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                    Mastercard
                  </span>
                </div>
              </div>
            </button>

            {/* EFT */}
            <button
              onClick={() => handlePaymentMethod("eft")}
              className="w-full bg-white border border-[#D4C5AB] rounded-2xl p-6 flex items-center gap-5 text-left hover:border-[#785900] hover:shadow-md transition-all group"
            >
              <div className="w-14 h-14 rounded-xl bg-amber-100 flex items-center justify-center">
                <Landmark
                  size={26}
                  className="text-[#785900]"
                />
              </div>

              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-900">
                  EFT / Bank Transfer
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  Transfer the payment directly into the DELI EGGS bank account.
                </p>
              </div>

              <span className="text-[#785900] text-xl group-hover:translate-x-1 transition">
                
              </span>
            </button>

            {/* Collection */}
            <button
              onClick={() => handlePaymentMethod("collection")}
              className="w-full bg-white border border-[#D4C5AB] rounded-2xl p-6 flex items-center gap-5 text-left hover:border-[#785900] hover:shadow-md transition-all group"
            >
              <div className="w-14 h-14 rounded-xl bg-amber-100 flex items-center justify-center">
                <Banknote
                  size={26}
                  className="text-[#785900]"
                />
              </div>

              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-900">
                  Pay on Collection
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  Pay when you collect your order.
                </p>
              </div>

            </button>

          </div>

          {/* Total */}
          <div className="mt-8 bg-white rounded-2xl border border-[#D4C5AB] p-6">

            <div className="flex justify-between text-gray-600">
              <span>Order Total</span>
              <span>R {total.toFixed(2)}</span>
            </div>

            <div className="border-t border-[#D4C5AB] mt-4 pt-4 flex justify-between">
              <span className="font-bold text-lg">
                Total to Pay
              </span>

              <span className="font-bold text-xl text-[#785900]">
                R {total.toFixed(2)}
              </span>
            </div>

          </div>

          {/* Security */}
          <div className="flex items-center justify-center gap-2 mt-6 text-sm text-gray-500">
            <ShieldCheck size={18} className="text-green-600" />
            Secure payment experience
          </div>

        </div>

      </main>
    </div>
  );
}

export default PaymentMethod;