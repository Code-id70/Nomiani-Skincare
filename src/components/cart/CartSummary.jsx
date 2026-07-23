import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

function CartSummary() {
  const { cartItems, cartTotal } = useCart();

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const deliveryFee = 0; // We'll update this later

  const grandTotal = cartTotal + deliveryFee;

  return (
    <div className="bg-white rounded-3xl shadow-sm p-8 sticky top-28">

      <h2
        className="text-3xl font-bold mb-8"
        style={{ fontFamily: "Montserrat" }}
      >
        Order Summary
      </h2>

      <div className="space-y-4">

        <div className="flex justify-between">
          <span>Items</span>
          <span>{totalItems}</span>
        </div>

        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>R {cartTotal}</span>
        </div>

        <div className="flex justify-between">
          <span>Delivery</span>
          <span>
            {deliveryFee === 0 ? "Free" : `R ${deliveryFee}`}
          </span>
        </div>

        <hr className="my-6" />

        <div className="flex justify-between text-2xl font-bold text-[#785900]">
          <span>Total</span>
          <span>R {grandTotal}</span>
        </div>

      </div>

      <Link
        to="/checkout"
        className="block mt-8 text-center bg-[#785900] text-white py-4 rounded-xl hover:bg-[#5d4400] transition"
      >
        Proceed to Checkout
      </Link>

      <Link
        to="/shop"
        className="block mt-4 text-center border border-[#785900] text-[#785900] py-4 rounded-xl hover:bg-[#785900] hover:text-white transition"
      >
        Continue Shopping
      </Link>

    </div>
  );
}

export default CartSummary;