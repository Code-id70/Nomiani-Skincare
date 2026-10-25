import { Link, useNavigate, useLocation } from "react-router-dom";
import { CreditCard, Landmark, Smartphone, Banknote, ArrowLeft, ShieldCheck } from "lucide-react";
import { useCart } from "../context/CartContext";
import BottomNav from "../components/layout/BottomNav";

function PaymentMethod() {
  const navigate = useNavigate();
  const location = useLocation();
  const { items: cartItems } = useCart();

  let customer = location.state?.customer;
  let deliveryMethod = location.state?.deliveryMethod;
  let subtotal = location.state?.subtotal;
  let deliveryFee = location.state?.shipping ?? 0;

  if (!customer || !deliveryMethod || subtotal === undefined) {
    const saved = sessionStorage.getItem("checkoutData");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (!customer) customer = parsed.customer;
        if (!deliveryMethod) deliveryMethod = parsed.deliveryMethod;
        if (subtotal === undefined) subtotal = parsed.subtotal;
        if (deliveryFee === 0) deliveryFee = parsed.shipping ?? 0;
      } catch {}
    }
  }

  if (subtotal === undefined) {
    subtotal = cartItems.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );
  }

  const total = subtotal + deliveryFee;

  const handlePaymentMethod = (method) => {
    navigate("/payment", {
      state: {
        paymentMethod: method,
        total,
        subtotal,
        deliveryFee,
        items: location.state?.items ?? cartItems,
        customer,
        deliveryMethod,
      },
    });
  };

  return (
    <div className="min-h-screen bg-surface">

      {/* Header */}
      <header className="border-b border-outline-variant bg-surface-container-lowest">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link
            to="/checkout"
            className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition"
          >
            <ArrowLeft size={20} />
            Back to Checkout
          </Link>

          <span className="font-semibold text-primary">
            Nomiani Skincare
          </span>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-6xl mx-auto px-6 py-12 pb-32">

        <div className="max-w-3xl mx-auto">

          {/* Heading */}
          <div className="text-center mb-10">
            <span className="inline-block bg-secondary-container text-on-secondary-container px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Secure Checkout
            </span>

            <h1
              className="text-4xl md:text-5xl font-bold text-on-surface"
              style={{ fontFamily: "Montserrat" }}
            >
              Choose Payment Method
            </h1>

            <p className="mt-4 text-on-surface-variant">
              Select how you'd like to pay for your Nomiani Skincare order.
            </p>
          </div>

          {/* Payment Options */}
          <div className="space-y-4">

            {/* Card */}
            <button
              onClick={() => handlePaymentMethod("card")}
              className="w-full bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 flex items-center gap-5 text-left hover:border-primary hover:shadow-md transition-all group"
            >
              <div className="w-14 h-14 rounded-xl bg-primary-container flex items-center justify-center">
                <CreditCard
                  size={26}
                  className="text-on-primary-container"
                />
              </div>

              <div className="flex-1">
                <h3 className="font-semibold text-lg text-on-surface">
                  Card Payment
                </h3>

                <p className="text-sm text-on-surface-variant mt-1">
                  Pay securely using your debit or credit card.
                </p>

                <div className="flex gap-2 mt-3">
                  <span className="text-xs bg-surface-container-high text-on-surface-variant px-2 py-1 rounded">
                    Visa
                  </span>
                  <span className="text-xs bg-surface-container-high text-on-surface-variant px-2 py-1 rounded">
                    Mastercard
                  </span>
                </div>
              </div>
            </button>

            {/* EFT */}
            <button
              onClick={() => handlePaymentMethod("eft")}
              className="w-full bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 flex items-center gap-5 text-left hover:border-primary hover:shadow-md transition-all group"
            >
              <div className="w-14 h-14 rounded-xl bg-primary-container flex items-center justify-center">
                <Landmark
                  size={26}
                  className="text-on-primary-container"
                />
              </div>

              <div className="flex-1">
                <h3 className="font-semibold text-lg text-on-surface">
                  EFT / Bank Transfer
                </h3>

                <p className="text-sm text-on-surface-variant mt-1">
                  Transfer the payment directly into the Nomiani Skincare bank account.
                </p>
              </div>

              <span className="text-primary text-xl group-hover:translate-x-1 transition">
                
              </span>
            </button>

            {/* Collection */}
            <button
              onClick={() => handlePaymentMethod("collection")}
              className="w-full bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 flex items-center gap-5 text-left hover:border-primary hover:shadow-md transition-all group"
            >
              <div className="w-14 h-14 rounded-xl bg-primary-container flex items-center justify-center">
                <Banknote
                  size={26}
                  className="text-on-primary-container"
                />
              </div>

              <div className="flex-1">
                <h3 className="font-semibold text-lg text-on-surface">
                  Pay on Collection
                </h3>

                <p className="text-sm text-on-surface-variant mt-1">
                  Pay when you collect your order.
                </p>
              </div>

            </button>

          </div>

          {/* Total */}
          <div className="mt-8 bg-surface-container-lowest rounded-2xl border border-outline-variant p-6">

            <div className="flex justify-between text-on-surface-variant">
              <span>Order Total</span>
              <span>R {total.toFixed(2)}</span>
            </div>

            <div className="border-t border-outline-variant mt-4 pt-4 flex justify-between">
              <span className="font-bold text-lg text-on-surface">
                Total to Pay
              </span>

              <span className="font-bold text-xl text-primary">
                R {total.toFixed(2)}
              </span>
            </div>

          </div>

          {/* Security */}
          <div className="flex items-center justify-center gap-2 mt-6 text-sm text-on-surface-variant">
            <ShieldCheck size={18} className="text-secondary" />
            Secure payment experience
          </div>

        </div>

      </main>
      <BottomNav />
    </div>
  );
}

export default PaymentMethod;

