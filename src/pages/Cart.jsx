import MainMenu from "../components/layout/MainMenu";

import EmptyCart from "../components/cart/EmptyCart";
import CartItem from "../components/cart/CartItem";
import CartSummary from "../components/cart/CartSummary";

import { useCart } from "../context/CartContext";

function Cart() {
  const { cartItems } = useCart();

  return (
    <MainMenu>
      <div className="max-w-7xl mx-auto px-6 py-20">

        <h1
          className="text-5xl font-bold mb-12"
          style={{ fontFamily: "Montserrat" }}
        >
          Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="grid lg:grid-cols-3 gap-10">

            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">

              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                />
              ))}

            </div>

            {/* Summary */}
            <CartSummary />

          </div>
        )}

      </div>
    </MainMenu>
  );
}

export default Cart;