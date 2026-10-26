import { useState, useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { CheckCircle2, Loader2, ArrowRight } from "lucide-react";
import { apiRequest } from "../services/api";
import BottomNav from "../components/layout/BottomNav";

function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const orderNumber = searchParams.get("order");

  const [status, setStatus] = useState("verifying");
  const [message, setMessage] = useState("Verifying your payment...");
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    if (!orderNumber) {
      setStatus("error");
      setMessage("Missing order reference.");
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const orderRes = await apiRequest(`/api/orders/${orderNumber}/`, { public: true });
        const order = orderRes.data;
        const checkoutId = order?.payment_reference;

        if (!checkoutId) {
          setStatus("error");
          setMessage("No payment reference found for this order.");
          return;
        }

        const verifyRes = await apiRequest("/api/payments/yoco/verify/", {
          method: "POST",
          body: JSON.stringify({ checkout_id: checkoutId }),
          public: true,
        });
        const verifyData = verifyRes.data;
        const yocoStatus = verifyData?.status || verifyData?.state || verifyData?.data?.status;
        const paid = ["successful", "success", "paid", "completed"].includes(yocoStatus);

        if (paid) {
          setStatus("success");
          setMessage("Payment confirmed!");
          setOrderData(order);
          sessionStorage.removeItem("checkoutData");
        } else {
          setStatus("error");
          setMessage(`Payment not successful. Status: ${yocoStatus || "unknown"}`);
        }
      } catch (err) {
        setStatus("error");
        setMessage(err.message || "Could not verify payment.");
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [orderNumber]);

  const now = new Date();
  const dateStr = now.toLocaleDateString("en-ZA");
  const timeStr = now.toLocaleTimeString("en-ZA", { hour: "2-digit", minute: "2-digit" });

  const handleReceiptClick = () => {
    if (!orderData) return;
    navigate("/order-confirmation", {
      state: {
        orderNumber: orderData.order_number,
        cartItems: orderData.items?.map((item) => ({
          id: item.id,
          name: item.product_name,
          price: parseFloat(item.unit_price),
          quantity: item.quantity,
        })) || [],
        subtotal: parseFloat(orderData.subtotal || 0),
        deliveryFee: parseFloat(orderData.delivery_fee || 0),
        total: parseFloat(orderData.total || 0),
        customer: orderData.customer
          ? {
              firstName: orderData.customer.first_name,
              lastName: orderData.customer.last_name,
              email: orderData.customer.email,
              phone: orderData.customer.phone || "",
              street: "",
              suburb: "",
              city: "",
              postalCode: "",
              notes: orderData.notes || "",
            }
          : null,
        deliveryMethod: orderData.order_type === "DELIVERY" ? "delivery" : "collection",
        orderId: orderData.id,
        paymentMethod: orderData.payment_method,
      },
    });
  };

  const items = orderData?.items || [];
  const subtotal = parseFloat(orderData?.subtotal || 0);
  const deliveryFee = parseFloat(orderData?.delivery_fee || 0);
  const total = parseFloat(orderData?.total || 0);

  return (
    <>
    <div className="min-h-screen bg-surface-container flex items-start justify-center py-16 px-4">
      <div className="w-full max-w-md">

        {status === "verifying" && (
          <div className="bg-white border border-outline-variant rounded-3xl p-8 shadow-sm text-center">
            <Loader2 size={40} className="mx-auto text-primary animate-spin mb-4" />
            <h1 className="text-2xl font-bold text-on-surface mb-2">Verifying Payment</h1>
            <p className="text-on-surface-variant">Please wait while we confirm your payment...</p>
          </div>
        )}

        {status === "error" && (
          <div className="bg-white border border-outline-variant rounded-3xl p-8 shadow-sm text-center">
            <h1 className="text-2xl font-bold text-on-surface mb-2">Payment Issue</h1>
            <p className="text-on-surface-variant mb-6">{message}</p>
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
        )}

        {status === "success" && (
          <>
            {/* Receipt Slip */}
            <div className="relative bg-[#FFF8F2] shadow-lg cursor-pointer hover:shadow-xl transition" onClick={handleReceiptClick} role="button" tabIndex={0} onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") handleReceiptClick();
              }}
            >
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
                    Nomiani Skincare
                  </h1>
                  <p className="text-xs text-on-surface-variant mt-1">
                    Clean skincare for every skin type
                  </p>

                  {/* Address block */}
                  <div className="text-[11px] text-on-surface-variant mt-3 leading-relaxed">
                    <p>123 Main Street</p>
                    <p>Mamelodi East</p>
                    <p>Pretoria, Gauteng, 0122</p>
                    <p>Tel: 012 345 6789</p>
                  </div>
                </div>

                <div className="border-t border-dashed border-outline-variant/40 my-5" />

                {/* Meta */}
                <div className="text-xs text-on-surface-variant space-y-1">
                  <div className="flex justify-between">
                    <span>Order #</span>
                    <span className="font-bold text-primary">{orderData?.order_number}</span>
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
                    <span className="text-secondary font-semibold">PAID</span>
                  </div>
                </div>

                <div className="border-t border-dashed border-outline-variant/40 my-5" />

                {/* Items */}
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.id} className="text-sm">
                      <div className="flex justify-between">
                        <span className="text-[#201B11]">{item.product_name}</span>
                        <span className="text-[#201B11]">
                          R {(item.quantity * parseFloat(item.unit_price)).toFixed(2)}
                        </span>
                      </div>
                      <div className="text-xs text-on-surface-variant">
                        {item.quantity} x R {parseFloat(item.unit_price).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-dashed border-outline-variant/40 my-5" />

                {/* Totals */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-on-surface-variant">
                    <span>Subtotal</span>
                    <span>R {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-on-surface-variant">
                    <span>Delivery</span>
                    <span>{deliveryFee === 0 ? "Free" : `R ${deliveryFee.toFixed(2)}`}</span>
                  </div>
                </div>

                <div className="border-t border-dashed border-outline-variant/40 my-5" />

                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-lg text-[#201B11]">TOTAL</span>
                  <span className="font-bold text-2xl text-primary">
                    R {total.toFixed(2)}
                  </span>
                </div>

                <div className="border-t border-dashed border-outline-variant/40 my-5" />

                {/* Tap to continue */}
                <div className="text-center">
                  <p className="text-sm text-primary font-semibold tracking-wide animate-pulse">
                    TAP RECEIPT TO CONTINUE <ArrowRight size={14} className="inline ml-1" />
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
                className="flex-1 text-center bg-primary text-white py-3 rounded-xl font-semibold hover:bg-primary/90 transition"
              >
                Continue Shopping
              </Link>
              <Link
                to="/"
                className="flex-1 text-center border border-outline-variant bg-white text-on-surface-variant py-3 rounded-xl font-semibold hover:bg-surface-container-high transition"
              >
                Back to Home
              </Link>
            </div>
          </>
        )}

      </div>
    </div>
    <BottomNav />
    </>
  );
}

export default PaymentSuccess;


