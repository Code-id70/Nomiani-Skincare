import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300">
      <img
        src={product.image}
        alt={product.name}
        className="h-64 w-full object-cover"
      />

      <div className="p-6">
        <h3
          className="text-2xl font-bold"
          style={{ fontFamily: "Montserrat" }}
        >
          {product.name}
        </h3>

        <p className="text-gray-500 mt-2">
          {product.size}
        </p>

        <div className="mt-6 flex items-center justify-between">
          <span className="text-3xl font-bold text-[#785900]">
            R {product.price}
          </span>

          {product.inStock ? (
            <span className="text-green-600 font-semibold">
              ✓ In Stock
            </span>
          ) : (
            <span className="text-red-500 font-semibold">
              Out of Stock
            </span>
          )}
        </div>

        <div className="flex gap-3 mt-6">
          <Link
            to={`/product/${product.slug}`}
            className="flex-1 text-center border border-[#785900] text-[#785900] py-3 rounded-xl font-medium hover:bg-[#785900] hover:text-white transition"
          >
            View Details
          </Link>

          {product.inStock ? (
            <button
              onClick={() => addToCart(product)}
              className="flex-1 bg-[#785900] text-white rounded-xl py-3 hover:bg-[#5d4400] transition flex items-center justify-center gap-2"
            >
              <ShoppingCart size={18} />
              Add
            </button>
          ) : (
            <button
              disabled
              className="flex-1 bg-gray-300 text-gray-500 rounded-xl py-3 cursor-not-allowed flex items-center justify-center gap-2"
            >
              <ShoppingCart size={18} />
              Out of Stock
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;