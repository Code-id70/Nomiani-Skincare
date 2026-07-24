import { useCart } from "../../context/CartContext";

function OrderSummary({ deliveryMethod, onPlaceOrder }) {
  const { cartItems } = useCart();

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  return (
    <div className="bg-white rounded-3xl shadow-sm p-8 sticky top-28">

      <h2
        className="text-3xl font-bold mb-8"
        style={{ fontFamily: "Montserrat" }}
      >
        Order Summary
      </h2>

      {/* Products */}

      <div className="space-y-5">

        {cartItems.map((item) => (

          <div
            key={item.id}
            className="flex items-center justify-between border-b pb-5"
          >

            {/* Left */}

            <div className="flex items-center gap-4">

              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 rounded-xl object-cover"
              />

              <div>

                <h3 className="font-semibold text-lg">
                  {item.name}
                </h3>

                <p className="text-sm text-gray-500">
                  {item.size}
                </p>

                <p className="text-sm text-gray-500">
                  {item.quantity} × R {item.price}
                </p>

              </div>

            </div>

            {/* Right */}

            <span className="font-bold text-[#785900]">
              R {item.quantity * item.price}
            </span>

          </div>

        ))}

      </div>

      {/* Totals */}

      <div className="mt-8 space-y-4">

        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>R {subtotal}</span>
        </div>

        <div className="flex justify-between">
          <span>Delivery</span>

          <span>
            {deliveryMethod === "collection"
              ? "Free"
              : "Calculated after confirmation"}
          </span>

        </div>

        <hr />

        <div className="flex justify-between text-2xl font-bold text-[#785900]">

          <span>Total</span>

          <span>
            R {subtotal}
          </span>

        </div>

      </div>

      {/* Place Order */}

      <button
        onClick={onPlaceOrder}
        className="w-full mt-8 bg-[#785900] text-white py-4 rounded-xl hover:bg-[#5d4400] transition font-semibold"
      >
        Place Order
      </button>

    </div>
  );
}

export default OrderSummary;