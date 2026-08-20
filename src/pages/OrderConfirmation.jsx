import { Link, useLocation } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { useCart } from "../context/CartContext";

function OrderConfirmation() {
  const location = useLocation();
  const { cartItems } = useCart();

  const orderNumber = location.state?.orderNumber || "DELI-1025";

  const items = location.state?.cartItems?.length
    ? location.state.cartItems
    : cartItems;

  const subtotal = location.state?.subtotal ?? items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  const deliveryFee = location.state?.deliveryFee ?? 0;
  const total = location.state?.total ?? subtotal + deliveryFee;

  const now = new Date();
  const dateStr = now.toLocaleDateString("en-ZA");
  const timeStr = now.toLocaleTimeString("en-ZA", { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="min-h-screen bg-[#EFE4D4] flex items-start justify-center py-16 px-4">
      <div className="w-full max-w-md font-mono">

        {/* Success icon above the slip */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle2 size={34} className="text-green-600" />
          </div>
        </div>

        {/* Receipt Slip */}
        <div className="relative bg-[#FFF8F2] shadow-lg">

          {/* Zigzag top edge */}
          <div
            className="h-4 w-full"
            style={{
              backgroundImage:
                "linear-gradient(135deg, #EFE4D4 25%, transparent 25%), linear-gradient(225deg, #EFE4D4 25%, transparent 25%)",
              backgroundSize: "16px 16px",
              backgroundPosition: "0 0",
              backgroundColor: "#FFF8F2",
            }}
          />

          <div className="px-8 py-6">

            {/* Header */}
            <div className="text-center">
              <h1
                className="text-2xl tracking-widest font-bold text-[#201B11]"
                style={{ fontFamily: "Montserrat" }}
              >
                DELI EGGS
              </h1>
              <p className="text-xs text-gray-500 mt-1">
                Where your breakfast starts
              </p>

              {/* Address block */}
              <div className="text-[11px] text-gray-500 mt-3 leading-relaxed">
                <p>123 Church Street, Hatfield</p>
                <p>Pretoria, Gauteng, 0028</p>
                <p>Tel: 012 345 6789</p>
                <p>VAT No: 4123456789</p>
              </div>
            </div>

            <div className="border-t border-dashed border-[#785900]/40 my-5" />

            {/* Meta */}
            <div className="text-xs text-gray-600 space-y-1">
              <div className="flex justify-between">
                <span>Order #</span>
                <span className="font-bold text-[#785900]">{orderNumber}</span>
              </div>
              <div className="flex justify-between">
                <span>Date</span>
                <span>{dateStr}</span>
              </div>
              <div className="flex justify-between">
                <span>Time</span>
                <span>{timeStr}</span>
              </div>
              <div className="flex justify-between">
                <span>Status</span>
                <span className="text-green-700 font-semibold">CONFIRMED</span>
              </div>
            </div>

            <div className="border-t border-dashed border-[#785900]/40 my-5" />

            {/* Items */}
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.id} className="text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#201B11]">{item.name}</span>
                    <span className="text-[#201B11]">
                      R {(item.quantity * item.price).toFixed(2)}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">
                    {item.quantity} x R {item.price}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-dashed border-[#785900]/40 my-5" />

            {/* Totals */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>R {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery</span>
                <span>{deliveryFee === 0 ? "Free" : `R ${deliveryFee.toFixed(2)}`}</span>
              </div>
            </div>

            <div className="border-t border-dashed border-[#785900]/40 my-5" />

            <div className="flex justify-between items-baseline">
              <span className="font-bold text-lg text-[#201B11]">TOTAL</span>
              <span className="font-bold text-2xl text-[#785900]">
                R {total.toFixed(2)}
              </span>
            </div>

            <div className="border-t border-dashed border-[#785900]/40 my-5" />

            {/* Thank you + barcode */}
            <div className="text-center">
              <p className="text-sm text-[#201B11] tracking-wide">
                THANK YOU FOR YOUR ORDER
              </p>
              <p className="text-xs text-gray-500 mt-1">🥚 See you again soon 🥚</p>

              {/* Fake barcode */}
              <div className="flex justify-center gap-[2px] mt-5 h-10">
                {Array.from({ length: 30 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-[#201B11]"
                    style={{ width: Math.random() > 0.5 ? "2px" : "1px" }}
                  />
                ))}
              </div>
              <p className="text-[10px] tracking-[0.3em] text-gray-500 mt-1">
                {orderNumber}
              </p>
            </div>

          </div>

          {/* Zigzag bottom edge */}
          <div
            className="h-4 w-full"
            style={{
              backgroundImage:
                "linear-gradient(45deg, #EFE4D4 25%, transparent 25%), linear-gradient(-45deg, #EFE4D4 25%, transparent 25%)",
              backgroundSize: "16px 16px",
              backgroundPosition: "0 100%",
              backgroundColor: "#FFF8F2",
            }}
          />
        </div>

        {/* Buttons below the slip */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
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

      </div>
    </div>
  );
}

export default OrderConfirmation;