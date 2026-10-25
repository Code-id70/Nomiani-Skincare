import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const COURIER_FLAT_RATE = 85;
const FREE_THRESHOLD = 650;

export default function Cart() {
  const { items, itemCount, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();
  const navigate = useNavigate();
  const [bannerDismissed, setBannerDismissed] = useState(false);

  // Bring the free-courier banner back whenever the cart changes
  // (add / remove / quantity change) so customers always see the goal.
  useEffect(() => {
    setBannerDismissed(false);
  }, [items]);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const isFreeShipping = subtotal >= FREE_THRESHOLD;
  const shipping = isFreeShipping ? 0 : COURIER_FLAT_RATE;
  const grandTotal = subtotal + shipping;
  const remaining = FREE_THRESHOLD - subtotal;
  const pct = remaining > 0 ? Math.min(Math.round((subtotal / FREE_THRESHOLD) * 100), 100) : 100;

  const goBack = () => navigate(-1);
  const dismissBanner = () => setBannerDismissed(true);

  const goToCheckout = () => {
    if (items.length === 0) return;
    navigate("/checkout", {
      state: { items, subtotal, shipping, grandTotal },
    });
  };

  return (
    <main className="flex flex-col relative w-full pt-16 pb-8 bg-surface min-h-screen">
      <div className="flex flex-col w-full relative pb-12">
        {/* Cart Drawer Container Surface */}
        <div className="relative w-full px-4 pt-3 space-y-4">
          {/* Drawer Header & Progress Card */}
          <div className="bg-surface-container-lowest rounded-lg p-4 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 fill-none stroke-primary" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                  <path d="M3 6h18" />
                  <path d="M16 10a4 4 0 01-8 0" />
                </svg>
                <h2 className="font-headline-sm text-headline-sm text-on-surface tracking-tight">
                  Your Basket{" "}
                  <span className="font-body-md text-body-md text-on-surface-variant font-normal">
                    ({itemCount} items)
                  </span>
                </h2>
              </div>
              <button
                onClick={dismissBanner}
                aria-label="Dismiss free courier progress"
                className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
              >
                <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Free Courier Progress Bar */}
            {!bannerDismissed && (
              <div className="bg-surface-container-low rounded p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 fill-none stroke-secondary" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M1 3h15v13H1z" />
                      <path d="M16 8h4l3 3v5h-7V8z" />
                      <circle cx="5.5" cy="18.5" r="2.5" />
                      <circle cx="18.5" cy="18.5" r="2.5" />
                    </svg>
                    <span className="font-label-md text-label-md text-on-surface font-medium">
                      {remaining > 0 ? (
                        <>
                          Add <span className="font-semibold text-primary">R{remaining.toFixed(2)}</span> more for Free Courier Delivery!
                        </>
                      ) : (
                        <span className="text-secondary font-medium">Unlocked! You qualify for Free Courier Delivery</span>
                      )}
                    </span>
                  </div>
                  <span className="font-label-sm text-label-sm text-secondary font-semibold">{pct}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-surface-container-highest overflow-hidden">
                  <div
                    className="h-full rounded-full bg-secondary transition-all duration-500 ease-out"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Active Cart Items View */}
          <div className="space-y-4">
            {/* Cart Item List */}
            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-surface-container-lowest rounded-lg p-3.5 shadow-sm flex gap-3.5 relative transition-all"
                >
                  <div className="w-20 h-24 rounded bg-surface-container overflow-hidden shrink-0 relative">
                    <img
                      src={item.image}
                      alt={item.alt || item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                    <div className="flex items-start justify-between gap-1">
                      <div className="min-w-0">
                        <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider block">
                          {item.category}
                        </span>
                        <h3 className="font-headline-sm text-headline-sm text-on-surface text-[17px] leading-tight truncate">
                          {item.name}
                        </h3>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">{item.volume}</p>
                      </div>
                      <button
                        aria-label={`Remove ${item.name}`}
                        onClick={() => removeFromCart(item.id)}
                        className="w-7 h-7 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:text-error transition-colors"
                      >
                        <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M3 6h18" />
                          <path d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                          <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                          <path d="M10 11v6M14 11v6" />
                        </svg>
                      </button>
                    </div>
                    <div className="flex items-center justify-between pt-1">
                      {/* Stepper */}
                      <div className="flex items-center bg-surface-container-low rounded-full px-1.5 py-0.5">
                        <button
                          aria-label="Decrease quantity"
                          onClick={() => decreaseQuantity(item.id)}
                          className="w-6 h-6 rounded-full flex items-center justify-center text-on-surface hover:bg-surface-container-high transition-colors"
                        >
                          <svg className="w-3.5 h-3.5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                            <path d="M5 12h14" />
                          </svg>
                        </button>
                        <span className="w-6 text-center font-label-md text-label-md text-on-surface font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          aria-label="Increase quantity"
                          onClick={() => increaseQuantity(item.id)}
                          className="w-6 h-6 rounded-full flex items-center justify-center text-on-surface hover:bg-surface-container-high transition-colors"
                        >
                          <svg className="w-3.5 h-3.5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                            <path d="M12 5v14M5 12h14" />
                          </svg>
                        </button>
                      </div>
                      {/* Line Total */}
                      <div className="text-right">
                        <span className="font-label-lg text-label-lg text-on-surface font-semibold">
                          R{(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Cost Breakdown Card */}
            <div className="bg-surface-container-lowest rounded-lg p-4 shadow-sm space-y-2.5">
              <div className="flex items-center justify-between font-body-sm text-body-sm text-on-surface-variant">
                <span>Formula Subtotal</span>
                <span className="text-on-surface font-medium">R{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between font-body-sm text-body-sm text-on-surface-variant">
                <span className="flex items-center gap-1">
                  Standard Door Courier{" "}
                  <svg className="w-3.5 h-3.5 fill-none stroke-secondary" viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
                <span className="text-on-surface font-medium">{isFreeShipping ? "FREE" : `R${shipping.toFixed(2)}`}</span>
              </div>
              <div className="h-px bg-surface-container-highest my-1" />
              <div className="flex items-baseline justify-between pt-1">
                <span className="font-headline-sm text-headline-sm text-on-surface text-[18px]">Grand Total</span>
                <div className="text-right">
                  <span className="font-headline-sm text-headline-sm text-primary text-[22px] tracking-tight">
                    R{grandTotal.toFixed(2)}
                  </span>
                  <span className="block font-label-sm text-label-sm text-on-surface-variant">
                    Includes South African VAT
                  </span>
                </div>
              </div>
            </div>

            {/* Checkout Trigger Action */}
            <div className="space-y-3 pt-1">
              <button
                onClick={goToCheckout}
                disabled={items.length === 0}
                className="w-full min-h-[52px] py-3.5 px-5 rounded-full bg-primary hover:bg-primary-container disabled:opacity-50 disabled:cursor-not-allowed text-on-primary flex items-center justify-center gap-2.5 shadow-md active:scale-[0.99] transition-all"
              >
                <span className="font-label-lg text-label-lg tracking-wide uppercase font-bold">Continue to Checkout</span>
                <svg className="w-5 h-5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>

              {/* Continue Shopping Action */}
              <div className="text-center pt-2">
                <button
                  onClick={goBack}
                  className="inline-flex items-center gap-1.5 font-label-md text-label-md text-primary hover:text-primary-container transition-colors py-2 px-4 rounded-full"
                >
                  <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}