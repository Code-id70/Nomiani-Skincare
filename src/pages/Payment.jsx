import { useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, ShieldCheck, Printer, RotateCcw, Loader2 } from "lucide-react";
import { useCart } from "../context/CartContext";
import { createOrder } from "../services/orderService";
import { API_URL } from "../services/api";
import BottomNav from "../components/layout/BottomNav";

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
const { items: contextItems } = useCart();

  const paymentMethod = location.state?.paymentMethod || "card";
  const customer = location.state?.customer;
  const deliveryMethod = location.state?.deliveryMethod;

  const items = location.state?.items?.length
    ? location.state.items
    : contextItems;

  const subtotal =
    location.state?.subtotal ??
    items.reduce((sum, item) => sum + item.quantity * item.price, 0);
  const deliveryFee = location.state?.deliveryFee ?? 0;
  const total = location.state?.total ?? subtotal + deliveryFee;

  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [createdOrder, setCreatedOrder] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const timers = useRef([]);

  const paymentNames = {
    card: "Card Payment",
    eft: "EFT / Bank Transfer",
    collection: "Pay on Collection",
  };

  const now = new Date();
  const dateStr = now.toLocaleDateString("en-ZA");
  const timeStr = now.toLocaleTimeString("en-ZA", { hour: "2-digit", minute: "2-digit" });

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const handlePrint = () => {
    if (printerStatus === "printing") return;
    clearTimers();
    setPrinterStatus("printing");
    timers.current.push(setTimeout(() => setPrinterStatus("done"), 2200));
  };

  const handleReset = () => {
    clearTimers();
    setPrinterStatus("idle");
    setCreatedOrder(null);
    setError(null);
  };

  const buildOrderPayload = () => {
    const orderType = deliveryMethod === "delivery" ? "DELIVERY" : "COLLECTION";
    return {
      customer_first_name: customer?.firstName || "",
      customer_last_name: customer?.lastName || "",
      customer_email: customer?.email || "",
      customer_phone: customer?.phone || "",
      customer_address: [customer?.street, customer?.suburb, customer?.city, customer?.postalCode].filter(Boolean).join(", "),
      order_type: orderType,
      delivery_address: deliveryMethod === "delivery" ? [customer?.street, customer?.suburb, customer?.city].filter(Boolean).join(", ") : "",
      delivery_distance: null,
items: items.map((item) => ({
        product_id: item.id,
        product_name: item.name,
        quantity: item.quantity,
        unit_price: item.price,
      })),
      notes: customer?.notes || "",
      payment_method: paymentNames[paymentMethod] || paymentMethod,
      payment_reference: "",
    };
  };

  const submitOrder = async () => {
    setProcessing(true);
    setError(null);
    try {
const response = await createOrder(buildOrderPayload());
      setCreatedOrder(response.data);
      sessionStorage.removeItem("checkoutData");
      handlePrint();
      setShowModal(true);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  const handlePlaceOrder = () => {
    submitOrder();
  };

  const handlePay = async () => {
    setProcessing(true);
    setError(null);

    try {
      const payload = {
        customer: {
          firstName: customer?.firstName || "",
          lastName: customer?.lastName || "",
          email: customer?.email || "",
          phone: customer?.phone || "",
          street: customer?.street || "",
          suburb: customer?.suburb || "",
          city: customer?.city || "",
          postalCode: customer?.postalCode || "",
          notes: customer?.notes || "",
        },
        deliveryMethod,
items: items.map((item) => ({
          product_id: item.id,
          product_name: item.name,
          quantity: item.quantity,
          unit_price: item.price,
        })),
        total,
      };

      const response = await fetch(`${API_URL}/api/payments/yoco/checkout/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        const details = result.details || result.message || "Could not start payment.";
        throw new Error(details);
      }

      const redirectUrl = result.data.redirect_url;
      if (!redirectUrl) {
        throw new Error("Yoco did not return a payment page.");
      }

      window.location.href = redirectUrl;
    } catch (err) {
      setProcessing(false);
      setError(err.message || "Unable to start payment. Please try again.");
    }
  };

  const handlePayment = () => {
    if (!createdOrder) return;
    navigate("/order-confirmation", {
      state: {
        orderNumber: createdOrder.order_number,
        paymentMethod: createdOrder.payment_method,
        total: parseFloat(createdOrder.total),
        subtotal: parseFloat(createdOrder.subtotal),
        deliveryFee: parseFloat(createdOrder.delivery_fee),
        cartItems: items,
        customer,
        deliveryMethod,
        orderId: createdOrder.id,
      },
    });
  };

  const showPayButton = paymentMethod === "card";
  const showPlaceOrderButton = paymentMethod === "eft" || paymentMethod === "collection";

  return (
    <>
    <div className="min-h-screen bg-surface">

      {/* Header */}
      <header className="border-b border-outline-variant bg-surface-container-lowest">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link
            to="/payment-method"
            className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition"
          >
            <ArrowLeft size={20} />
            Change Payment Method
          </Link>

          <span className="font-semibold text-primary">
            Nomiani Skincare
          </span>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">

        <div className="max-w-xl mx-auto">

          {/* Heading */}
          <div className="text-center mb-8">

            <span className="inline-block bg-primary-container text-on-primary-container px-4 py-2 rounded-full text-sm font-semibold mb-4">
              {paymentNames[paymentMethod] || paymentMethod}
            </span>

            <h1
              className="text-4xl font-bold text-on-surface"
              style={{ fontFamily: "Montserrat" }}
            >
              Complete Payment
            </h1>

            <p className="mt-3 text-on-surface-variant">
              Complete your payment to place your Nomiani Skincare order.
            </p>

          </div>

          {/* Payment Card */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-3xl p-6 md:p-8 shadow-sm">

            {/* Total */}
            <div className="bg-surface rounded-2xl p-5 mb-7 flex justify-between items-center">
              <span className="text-on-surface-variant">
                Amount to pay
              </span>

              <span className="text-2xl font-bold text-primary">
                R {Number(total).toFixed(2)}
              </span>
            </div>

            {paymentMethod === "card" && (
              <div className="space-y-5">
                <p className="text-sm text-on-surface-variant">
                  Click the button below to securely enter your card details via Yoco. You will be redirected to Yoco&apos;s secure payment page.
                </p>

                {error && (
                  <p className="text-sm text-red-600 bg-red-50 p-3 rounded-xl">
                    {error}
                  </p>
                )}
              </div>
            )}

            {paymentMethod === "eft" && (
              <div className="bg-surface-container-low rounded-2xl p-6">

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
                    <span className="font-semibold">Nomiani Skincare</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">Account Number</span>
                    <span className="font-semibold">0000000000</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">Reference</span>
                    <span className="font-semibold">HALO-ORDER</span>
                  </div>

                </div>

                  <p className="text-sm text-on-surface-variant mt-5">
                    Please use your order reference when making the payment.
                  </p>

                {error && (
                  <p className="text-sm text-red-600 bg-red-50 p-3 rounded-xl mt-4">
                    {error}
                  </p>
                )}

              </div>
            )}



            {paymentMethod === "collection" && (
              <div className="text-center bg-surface-container-low rounded-2xl p-8">

                <h3 className="font-bold text-lg">
                  Pay on Collection
                </h3>

                <p className="text-on-surface-variant text-sm mt-2">
                  Your order will be prepared for collection.
                  Payment will be made when you collect your order.
                </p>

                {error && (
                  <p className="text-sm text-red-600 bg-red-50 p-3 rounded-xl mt-4">
                    {error}
                  </p>
                )}

              </div>
            )}

            {/* Action Button */}
            <div className="mt-8">
              {showPayButton && (
                <button
                  onClick={handlePay}
                  disabled={processing}
                  className="w-full flex items-center justify-center gap-2 px-5 py-4 rounded-xl font-semibold text-white text-lg transition disabled:opacity-50 disabled:cursor-not-allowed bg-primary shadow-md hover:bg-primary/90"
                >
                  {processing ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>Pay R {Number(total).toFixed(2)}</>
                  )}
                </button>
              )}

              {showPlaceOrderButton && (
                <button
                  onClick={handlePlaceOrder}
                  disabled={processing}
                  className="w-full flex items-center justify-center gap-2 px-5 py-4 rounded-xl font-semibold text-white text-lg transition disabled:opacity-50 disabled:cursor-not-allowed bg-primary shadow-md hover:bg-primary/90"
                >
                  {processing ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Place Order"
                  )}
                </button>
              )}
            </div>

            {/* ===== Receipt printer ===== */}
            <div className="mt-8 flex flex-col items-center">
              <style>{`
                @keyframes pay-led-pulse {
                   0%, 100% { opacity: 1; box-shadow: 0 0 6px currentColor; }
                   50% { opacity: 0.35; box-shadow: 0 0 2px currentColor; }
                }
                .pay-led-printing { animation: pay-led-pulse 0.6s ease-in-out infinite; }
                .pay-led-idle { opacity: 0.45; }
                @keyframes pay-paper-pulse {
                   0%, 100% { transform: translateY(0); }
                   50% { transform: translateY(-3px); }
                }
                .pay-paper-ready { animation: pay-paper-pulse 1.6s ease-in-out infinite; }
                .pay-paper-reveal {
                   transition: max-height 2000ms cubic-bezier(0.22, 0.61, 0.36, 1),
                               opacity 300ms ease-out;
                }
              `}</style>

              {/* Printed receipt, feeds out above the slot */}
              <div
                className="pay-paper-reveal w-[240px] overflow-hidden"
                style={{
                  maxHeight: printerStatus === "idle" ? "0px" : printerStatus === "printing" ? "260px" : "420px",
                  opacity: printerStatus === "idle" ? 0 : 1,
                }}
              >
                <button
                  type="button"
                  onClick={printerStatus === "done" && createdOrder ? handlePayment : undefined}
                  disabled={!(printerStatus === "done" && createdOrder)}
                  className={`w-full text-left bg-surface-container-lowest shadow-lg px-5 pt-6 pb-4 font-mono border border-outline-variant ${
                    printerStatus === "done" && createdOrder ? "pay-paper-ready cursor-pointer hover:shadow-xl transition" : ""
                  }`}
                >
                  <div className="text-center">
                    <p className="text-sm tracking-widest font-bold text-[#201B11]" style={{ fontFamily: "Montserrat" }}>
                      Nomiani Skincare
                    </p>
                    <p className="text-[10px] text-gray-500 mt-1">Clean skincare for every skin type</p>
                  </div>

                  <div className="border-t border-dashed border-outline-variant/40 my-3" />

                  <div className="text-[10px] text-on-surface-variant space-y-1">
                    <div className="flex justify-between">
                      <span>Order #</span>
                      <span className="font-bold text-primary">{createdOrder?.order_number}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Date</span>
                      <span>{dateStr} {timeStr}</span>
                    </div>
                  </div>

                  <div className="border-t border-dashed border-outline-variant/40 my-3" />

                  <div className="space-y-1.5">
                    {items.map((item) => (
                      <div key={item.id} className="flex justify-between text-[11px]">
                        <span className="text-[#201B11]">{item.quantity} x {item.name}</span>
                        <span className="text-[#201B11]">R {(item.quantity * item.price).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-dashed border-outline-variant/40 my-3" />

                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-sm text-[#201B11]">TOTAL</span>
                    <span className="font-bold text-lg text-primary">R {total.toFixed(2)}</span>
                  </div>

                  {printerStatus === "done" && createdOrder && (
                    <p className="text-center text-[10px] text-primary font-semibold tracking-wide mt-4 animate-pulse">
                      TAP TO CONTINUE →
                    </p>
                  )}
                </button>
              </div>

              {/* POS machine, brand colored */}
              <div className="w-[260px] -mt-1 relative z-10">
                <div className="rounded-t-2xl rounded-b-xl px-5 pt-4 pb-5 shadow-lg border border-outline-variant bg-surface">

                  <div className="text-center mb-3">
                    <span className="text-[9px] tracking-[0.3em] text-primary font-mono font-semibold">
                      Nomiani Skincare · POS-100
                    </span>
                  </div>

                  {/* output slot */}
                  <div className="mx-6 h-2.5 rounded-full bg-[#201B11] mb-4 shadow-inner" />

                  {/* LCD readout */}
                  <div className="rounded-lg px-3 py-2.5 mb-4 border border-black/40" style={{ background: "#101a12" }}>
                    <p
                      className="font-mono text-[10px] tracking-widest text-center"
                      style={{ color: "#7CFF9E", textShadow: "0 0 5px rgba(124,255,158,0.6)" }}
                    >
                      {printerStatus === "idle"
                        ? "READY — PRESS PRINT"
                        : printerStatus === "printing"
                        ? "PRINTING RECEIPT..."
                        : "TAP RECEIPT TO CONTINUE"}
                    </p>
                  </div>

                  {/* LED + label */}
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${printerStatus === "printing" ? "pay-led-printing" : "pay-led-idle"}`}
                      style={{
                        backgroundColor: printerStatus === "idle" ? "#B8A88C" : printerStatus === "printing" ? "#ffb020" : "#4ade80",
                        color: printerStatus === "idle" ? "#B8A88C" : printerStatus === "printing" ? "#ffb020" : "#4ade80",
                      }}
                    />
                    <span className="text-[9px] tracking-[0.2em] text-gray-500 font-mono">
                      {printerStatus === "idle" ? "STANDBY" : printerStatus === "printing" ? "BUSY" : "ONLINE"}
                    </span>
                  </div>

                  {/* controls */}
                  <div className="flex items-center justify-center gap-3">
                    <button
                      onClick={handlePrint}
                      disabled={printerStatus === "printing" || !createdOrder}
                      className="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-white text-sm transition disabled:opacity-50 disabled:cursor-not-allowed bg-primary shadow-md hover:bg-primary/90"
                    >
                      <Printer size={15} />
                      {printerStatus === "printing" ? "Printing..." : "Print Receipt"}
                    </button>

                    <button
                      onClick={handleReset}
                      className="flex items-center justify-center w-11 h-11 rounded-xl text-primary transition hover:bg-surface-container-high bg-surface-container-low shadow-sm"
                      aria-label="Reset printer"
                    >
                      <RotateCcw size={15} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Security */}
            <div className="flex items-center justify-center gap-2 mt-6 text-sm text-on-surface-variant">
              <ShieldCheck size={18} className="text-green-600" />
              Your payment information is secure
            </div>

          </div>

        </div>

      </main>
    </div>
    {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full mx-4">
            <h2 className="text-xl font-bold mb-2">Your order is placed</h2>
            <p className="text-gray-600 mb-4">Choose an option below.</p>
            <div className="flex flex-col gap-3">
              <button onClick={() => window.print()} className="w-full py-3 rounded-xl bg-[#91462f] text-white font-semibold">
                Download the receipt
              </button>
              <button
                onClick={() => {
                  const order = createdOrder || {};
                  const orderId = order.id || order.order_id || "";
                  const customerName = `${customer?.firstName || ""} ${customer?.lastName || ""}`.trim();
                  const deliveryAddress = deliveryMethod === "delivery"
                    ? [customer?.street, customer?.suburb, customer?.city, customer?.postalCode].filter(Boolean).join(", ")
                    : "Collection";
                  const itemLines = items.map((i) => `${i.name} x${i.quantity} - R${i.price}`).join("\n");
                  const message = [
                    `Hi, my name is ${customerName}.`,
                    `New order${orderId ? ` #${orderId}` : ""}:`,
                    itemLines,
                    `Total: R${total}`,
                    `Delivery: ${deliveryAddress}`,
                    orderId ? `Admin: ${window.location.origin}/admin/orders/${orderId}` : "",
                  ].filter(Boolean).join("\n");
                  window.open(`https://wa.me/27820850042?text=${encodeURIComponent(message)}`, "_blank");
                }}
                className="w-full py-3 rounded-xl border border-[#91462f] text-[#91462f] font-semibold"
              >
                Send order to WhatsApp
              </button>
              <button onClick={() => setShowModal(false)} className="w-full py-2 text-gray-500">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      <BottomNav />
    </>
  );
}

export default Payment;


