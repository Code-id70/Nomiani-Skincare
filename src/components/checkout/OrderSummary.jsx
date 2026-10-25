import { useCart } from "../../context/CartContext";

function OrderSummary({
  items,
  subtotal: subtotalProp,
  shipping: shippingProp,
  grandTotal: grandTotalProp,
  deliveryMethod,
  onPlaceOrder,
}) {
  // Prefer the values passed by Checkout; fall back to the cart context so the
  // component also works if rendered standalone.
  const { items: cartItems } = useCart();
  const resolvedItems = items && items.length ? items : cartItems;

  const subtotal =
    subtotalProp ??
    cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0);
  const shipping = shippingProp ?? 0;
  const grandTotal = grandTotalProp ?? subtotal + shipping;

  return (
    <div className="bg-surface-container-lowest rounded-lg p-6 shadow-sm space-y-6 sticky top-28">

      <h2
        className="font-headline-sm text-headline-sm text-on-surface tracking-tight"
      >
        Order Summary
      </h2>

      {/* Products */}

      <div className="space-y-4">

        {resolvedItems.map((item) => (

          <div
            key={item.id}
            className="flex items-center gap-4"
          >

            {/* Left */}

            <div className="w-14 h-14 rounded-lg bg-surface-container overflow-hidden shrink-0">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="min-w-0">

              <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider block">
                {item.category}
              </span>

              <h3 className="font-headline-sm text-headline-sm text-on-surface text-[16px] leading-tight truncate">
                {item.name}
              </h3>

              <p className="font-body-sm text-body-sm text-on-surface-variant">
                {item.volume}
              </p>

              <p className="font-body-sm text-body-sm text-on-surface-variant">
                {item.quantity} × R {item.price}
              </p>

            </div>

            {/* Right */}

            <span className="font-label-lg text-label-lg text-on-surface font-semibold ml-auto">
              R {(item.quantity * item.price).toFixed(2)}
            </span>

          </div>

        ))}

      </div>

      {/* Totals */}

      <div className="border-t border-surface-container-highest pt-4 space-y-2.5">

        <div className="flex items-center justify-between font-body-sm text-body-sm text-on-surface-variant">
          <span>Formula Subtotal</span>
          <span className="text-on-surface font-medium">R {subtotal.toFixed(2)}</span>
        </div>

        <div className="flex items-center justify-between font-body-sm text-body-sm text-on-surface-variant">
          <span className="flex items-center gap-1">
            Standard Door Courier
            {shipping === 0 && (
              <svg className="w-3.5 h-3.5 fill-none stroke-secondary" viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            )}
          </span>
          <span className="text-on-surface font-medium">
            {shipping === 0 ? "FREE" : `R ${shipping.toFixed(2)}`}
          </span>
        </div>

        <div className="h-px bg-surface-container-highest" />

        <div className="flex items-baseline justify-between pt-1">
          <span className="font-headline-sm text-headline-sm text-on-surface text-[18px]">Grand Total</span>
          <div className="text-right">
            <span className="font-headline-sm text-headline-sm text-primary text-[22px] tracking-tight">
              R {grandTotal.toFixed(2)}
            </span>
            <span className="block font-label-sm text-label-sm text-on-surface-variant">
              Includes South African VAT
            </span>
          </div>
        </div>

      </div>

      {/* Place Order */}

      <button
        onClick={onPlaceOrder}
        disabled={!resolvedItems.length}
        className="w-full min-h-[52px] mt-6 py-3.5 px-5 rounded-full bg-primary hover:bg-primary-container disabled:opacity-50 disabled:cursor-not-allowed text-on-primary font-label-lg text-label-lg tracking-wide uppercase font-bold flex items-center justify-center gap-2.5 shadow-md active:scale-[0.99] transition-all"
      >
        Place Order
        <svg className="w-5 h-5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </button>

    </div>
  );
}

export default OrderSummary;