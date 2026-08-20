import { useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, ShieldCheck, Printer, RotateCcw, Loader2 } from "lucide-react";
import { useCart } from "../context/CartContext";
import { createOrder } from "../services/orderService";

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems } = useCart();

  const paymentMethod = location.state?.paymentMethod || "card";
  const customer = location.state?.customer;
  const deliveryMethod = location.state?.deliveryMethod;

  const subtotal = cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0);
  const deliveryFee = deliveryMethod === "delivery" ? location.state?.deliveryFee ?? 0 : 0;
  const total = subtotal + deliveryFee;

  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [createdOrder, setCreatedOrder] = useState(null);

  const [printerStatus, setPrinterStatus] = useState("idle");
  const timers = useRef([]);

  const paymentNames = {
    card: "Card Payment",
    eft: "EFT / Bank Transfer",
    "instant-eft": "Instant EFT",
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
      items: cartItems.map((item) => ({
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
      handlePrint();
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
        items: cartItems.map((item) => ({
          product_id: item.id,
          product_name: item.name,
          quantity: item.quantity,
          unit_price: item.price,
        })),
        total,
      };

      const response = await fetch("/api/payments/yoco/checkout/", {
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
        cartItems,
        customer,
        deliveryMethod,
        orderId: createdOrder.id,
      },
    });
  };

  const showPayButton = paymentMethod === "card" || paymentMethod === "instant-eft";
  const showPlaceOrderButton = paymentMethod === "eft" || paymentMethod === "collection";

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
              {paymentNames[paymentMethod] || paymentMethod}
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
                <p className="text-sm text-gray-600">
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

                {error && (
                  <p className="text-sm text-red-600 bg-red-50 p-3 rounded-xl mt-4">
                    {error}
                  </p>
                )}

              </div>
            )}

            {paymentMethod === "instant-eft" && (
              <div className="space-y-5">
                <p className="text-sm text-gray-600">
                  Click the button below to pay instantly using your online banking via Yoco. You will be redirected to Yoco&apos;s secure payment page.
                </p>

                {error && (
                  <p className="text-sm text-red-600 bg-red-50 p-3 rounded-xl">
                    {error}
                  </p>
                )}
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
                  className="w-full flex items-center justify-center gap-2 px-5 py-4 rounded-xl font-semibold text-white text-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    background: "linear-gradient(180deg, #8a6a1c 0%, #785900 60%, #5f4700 100%)",
                    boxShadow: "0 3px 0 #45350a, 0 4px 8px rgba(0,0,0,0.25)",
                  }}
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
                  className="w-full flex items-center justify-center gap-2 px-5 py-4 rounded-xl font-semibold text-white text-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    background: "linear-gradient(180deg, #8a6a1c 0%, #785900 60%, #5f4700 100%)",
                    boxShadow: "0 3px 0 #45350a, 0 4px 8px rgba(0,0,0,0.25)",
                  }}
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
                  className={`w-full text-left bg-white shadow-lg px-5 pt-6 pb-4 font-mono border border-[#D4C5AB] ${
                    printerStatus === "done" && createdOrder ? "pay-paper-ready cursor-pointer hover:shadow-xl transition" : ""
                  }`}
                >
                  <div className="text-center">
                    <p className="text-sm tracking-widest font-bold text-[#201B11]" style={{ fontFamily: "Montserrat" }}>
                      DELI EGGS
                    </p>
                    <p className="text-[10px] text-gray-500 mt-1">Where your breakfast starts</p>
                  </div>

                  <div className="border-t border-dashed border-[#785900]/40 my-3" />

                  <div className="text-[10px] text-gray-600 space-y-1">
                    <div className="flex justify-between">
                      <span>Order #</span>
                      <span className="font-bold text-[#785900]">{createdOrder?.order_number}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Date</span>
                      <span>{dateStr} {timeStr}</span>
                    </div>
                  </div>

                  <div className="border-t border-dashed border-[#785900]/40 my-3" />

                  <div className="space-y-1.5">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex justify-between text-[11px]">
                        <span className="text-[#201B11]">{item.quantity} x {item.name}</span>
                        <span className="text-[#201B11]">R {(item.quantity * item.price).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-dashed border-[#785900]/40 my-3" />

                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-sm text-[#201B11]">TOTAL</span>
                    <span className="font-bold text-lg text-[#785900]">R {total.toFixed(2)}</span>
                  </div>

                  {printerStatus === "done" && createdOrder && (
                    <p className="text-center text-[10px] text-[#785900] font-semibold tracking-wide mt-4 animate-pulse">
                      TAP TO CONTINUE →
                    </p>
                  )}
                </button>
              </div>

              {/* POS machine, brand colored */}
              <div className="w-[260px] -mt-1 relative z-10">
                <div className="rounded-t-2xl rounded-b-xl px-5 pt-4 pb-5 shadow-lg border border-[#D4C5AB] bg-[#FFF8F2]">

                  <div className="text-center mb-3">
                    <span className="text-[9px] tracking-[0.3em] text-[#785900] font-mono font-semibold">
                      DELI EGGS · POS-100
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
                      className="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-white text-sm transition disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{
                        background: "linear-gradient(180deg, #8a6a1c 0%, #785900 60%, #5f4700 100%)",
                        boxShadow: "0 3px 0 #45350a, 0 4px 8px rgba(0,0,0,0.25)",
                      }}
                    >
                      <Printer size={15} />
                      {printerStatus === "printing" ? "Printing..." : "Print Receipt"}
                    </button>

                    <button
                      onClick={handleReset}
                      className="flex items-center justify-center w-11 h-11 rounded-xl text-[#785900] transition hover:bg-[#EFE4D4]"
                      style={{
                        background: "#F2E9DA",
                        boxShadow: "0 3px 0 #D4C5AB, 0 4px 8px rgba(0,0,0,0.1)",
                      }}
                      aria-label="Reset printer"
                    >
                      <RotateCcw size={15} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Security */}
            <div className="flex items-center justify-center gap-2 mt-6 text-sm text-gray-500">
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
