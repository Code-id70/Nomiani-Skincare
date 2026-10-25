import { Link } from "react-router-dom";
import { ShoppingBasket } from "lucide-react";

function EmptyCart() {
  return (
    <div className="max-w-2xl mx-auto text-center py-24">

      <div className="w-28 h-28 rounded-full bg-violet-100 flex items-center justify-center mx-auto">
        <ShoppingBasket
          size={48}
          className="text-[#7C3AED]"
        />
      </div>

      <h1
        className="text-4xl font-bold mt-8"
        style={{ fontFamily: "Montserrat" }}
      >
        Your cart is empty
      </h1>

      <p className="text-gray-600 mt-4">
        Looks like you haven't added any products yet.
      </p>

      <Link
        to="/shop"
        className="inline-block mt-8 bg-[#7C3AED] text-white px-8 py-4 rounded-xl hover:bg-[#5B21B6] transition"
      >
        Continue Shopping
      </Link>

    </div>
  );
}

export default EmptyCart;

