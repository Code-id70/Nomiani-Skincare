import { useParams, Link } from "react-router-dom";
import { useState } from "react";

import products from "../data/products";
import { useCart } from "../context/CartContext";

function ProductDetails() {
  const { slug } = useParams();

  const product = products.find(
    (item) => item.slug === slug
  );

  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCart();

    if (!product) {
      return (
        <div className="max-w-7xl mx-auto px-6 py-20">
          <h1 className="text-4xl font-bold">
            Product not found.
          </h1>
        </div>
      );
    }

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">

        <Link
          to="/shop"
          className="text-[#7C3AED] font-semibold hover:underline"
        >
          ← Back to Shop
        </Link>

        <div className="grid lg:grid-cols-2 gap-16 mt-10">

          {/* Image */}
          <img
            src={product.image}
            alt={product.name}
            className="rounded-3xl shadow-lg w-full"
          />

          {/* Product Info */}
          <div>

            <h1
              className="text-5xl font-bold"
              style={{ fontFamily: "Montserrat" }}
            >
              {product.name}
            </h1>

            <p className="mt-6 text-gray-600 leading-8">
              {product.description}
            </p>

            <div className="mt-8 space-y-3">

              <p>
                <strong>Category:</strong> {product.category}
              </p>

              <p>
                <strong>Volume:</strong> {product.volumeMl} ml
              </p>

              <p>
                <strong>Skin Type:</strong> {product.skinType}
              </p>

              <p>
                <strong>Skin Concern:</strong> {product.skinConcern}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {product.inStock ? (
                  <span className="text-green-600">
                    ✓ In Stock
                  </span>
                ) : (
                  <span className="text-red-500">
                    Out of Stock
                  </span>
                )}
              </p>

            </div>

            <h2 className="text-4xl font-bold text-[#7C3AED] mt-10">
              R {product.price}
            </h2>

            {/* Quantity */}
            <div className="flex items-center gap-5 mt-10">

              <button
                onClick={() =>
                  setQuantity(Math.max(1, quantity - 1))
                }
                className="w-12 h-12 rounded-xl border hover:bg-gray-100"
              >
                -
              </button>

              <span className="text-2xl font-bold w-8 text-center">
                {quantity}
              </span>

              <button
                onClick={() =>
                  setQuantity(quantity + 1)
                }
                className="w-12 h-12 rounded-xl border hover:bg-gray-100"
              >
                +
              </button>

            </div>

            <button
              disabled={!product.inStock}
              onClick={() => addToCart(product, quantity)}
              className={`mt-10 w-full py-4 rounded-xl text-white font-semibold transition ${
                product.inStock
                  ? "bg-[#7C3AED] hover:bg-[#5B21B6]"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              {product.inStock
                ? "Add To Cart"
                : "Out Of Stock"}
            </button>

          </div>

        </div>

      </div>
  );
}

export default ProductDetails;

