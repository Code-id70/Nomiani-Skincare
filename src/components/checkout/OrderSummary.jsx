import { useCart } from "../../context/CartContext";

function OrderSummary() {
  const { cartItems } = useCart();

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  return (
    <div>
      {/* Products */}
      <div className="space-y-5">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border-b pb-5"
          >
            {/* Left Side */}
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 rounded-xl object-cover"
              />

              <div>
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p className="text-sm text-gray-500">{item.size}</p>
                <p className="text-gray-500 text-sm">
                  {item.quantity} × R {item.price}
                </p>
              </div>
            </div>

            {/* Right Side */}
            <span className="font-bold text-[#785900]">
              R {item.quantity * item.price}
            </span>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="mt-6 pt-5 border-t flex items-center justify-between">
        <span className="font-semibold text-lg">Subtotal</span>
        <span className="font-bold text-lg text-[#785900]">
          R {subtotal}
        </span>
      </div>
    </div>
  );
}

export default OrderSummary;