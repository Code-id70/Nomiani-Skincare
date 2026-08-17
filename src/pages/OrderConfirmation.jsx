import { Link } from "react-router-dom";
import { CheckCircle2, Package, Truck } from "lucide-react";

function OrderConfirmation() {
  // Mock data for UI
  const orderNumber = "DELI-1025";

  const items = [
    {
      id: 1,
      name: "Large Eggs",
      quantity: 2,
      price: 95,
    },
  ];

  const subtotal = items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  const deliveryFee = 0;
  const total = subtotal + deliveryFee;

  return (
    <div className="min-h-screen bg-[#FFF8F2]">

      {/* Header */}
      <header className="border-b border-[#D4C5AB] bg-white">
        <div className="max-w-6xl mx-auto px-6 py-5 flex justify-center">
          <span className="font-semibold text-xl text-[#785900]">
            DELI EGGS
          </span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">

        {/* Success */}
        <div className="text-center">

          <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2
              size={46}
              className="text-green-600"
            />
          </div>

          <h1
            className="text-4xl md:text-5xl font-bold text-gray-900"
            style={{ fontFamily: "Montserrat" }}
          >
            Order Confirmed!
          </h1>

          <p className="mt-4 text-gray-600 text-lg">
            Thank you for ordering from DELI EGGS.
          </p>

          <div className="mt-4 inline-block bg-amber-100 text-[#785900] px-4 py-2 rounded-full font-semibold">
            Order #{orderNumber}
          </div>

        </div>

        {/* Status */}
        <div className="mt-10 bg-white border border-[#D4C5AB] rounded-3xl p-6 md:p-8">

          <div className="grid md:grid-cols-2 gap-8">

            {/* Order Status */}
            <div className="flex gap-4">

              <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
                <Package
                  size={24}
                  className="text-[#785900]"
                />
              </div>

              <div>
                <h3 className="font-bold text-lg">
                  Order Received
                </h3>

                <p className="text-gray-500 text-sm mt-1">
                  We've received your order and will start preparing it shortly.
                </p>
              </div>

            </div>

            {/* Delivery */}
            <div className="flex gap-4">

              <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
                <Truck
                  size={24}
                  className="text-[#785900]"
                />
              </div>

              <div>
                <h3 className="font-bold text-lg">
                  Delivery / Collection
                </h3>

                <p className="text-gray-500 text-sm mt-1">
                  We'll keep you updated when your order is ready.
                </p>
              </div>

            </div>

          </div>

        </div>

        {/* Order Summary */}
        <div className="mt-6 bg-white border border-[#D4C5AB] rounded-3xl p-6 md:p-8">

          <h2
            className="text-2xl font-bold mb-6"
            style={{ fontFamily: "Montserrat" }}
          >
            Order Summary
          </h2>

          <div className="space-y-5">

            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b border-gray-100 pb-5"
              >

                <div>
                  <h3 className="font-semibold">
                    {item.name}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    {item.quantity} × R {item.price}
                  </p>
                </div>

                <span className="font-bold text-[#785900]">
                  R {(item.quantity * item.price).toFixed(2)}
                </span>

              </div>
            ))}

          </div>

          {/* Totals */}
          <div className="mt-6 space-y-3">

            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>R {subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-gray-600">
              <span>Delivery</span>
              <span>
                {deliveryFee === 0
                  ? "Free"
                  : `R ${deliveryFee.toFixed(2)}`}
              </span>
            </div>

            <div className="border-t border-[#D4C5AB] pt-4 mt-4 flex justify-between">
              <span className="font-bold text-lg">
                Total
              </span>

              <span className="font-bold text-xl text-[#785900]">
                R {total.toFixed(2)}
              </span>
            </div>

          </div>

        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">

          <Link
            to="/shop"
            className="flex-1 text-center bg-[#785900] text-white py-4 rounded-xl font-semibold hover:bg-[#5f4700] transition"
          >
            Continue Shopping
          </Link>

          <Link
            to="/"
            className="flex-1 text-center border border-[#D4C5AB] bg-white text-gray-700 py-4 rounded-xl font-semibold hover:bg-amber-50 transition"
          >
            Back to Home
          </Link>

        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Thank you for choosing DELI EGGS. 🥚
        </p>

      </main>
    </div>
  );
}

export default OrderConfirmation;