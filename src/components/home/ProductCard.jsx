import { Link } from "react-router-dom";
import { useState } from "react";
import { Plus, Heart, ArrowRight } from "lucide-react";
import { useCart } from "../../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [isSaved, setIsSaved] = useState(false);

  const handleAddToCart = () => {
    if (product.stock === "out_of_stock") return;
    addToCart(product);
  };

  const inStock = product.stock === "in_stock";

  return (
    <div className={`flex flex-col rounded-2xl overflow-hidden shadow-sm group transition-opacity duration-300 max-w-sm mx-auto ${
      !inStock ? "opacity-75" : ""
    }`}>
      <div className="relative bg-surface-container-low aspect-[2/2] w-full max-w-[200px] mx-auto overflow-hidden">
        <img
          src={product.image}
          alt={product.alt}
          className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${
            !inStock ? "grayscale-[35%]" : ""
          }`}
        />
        <div
          className={`absolute top-2 left-2 px-2 py-0.5 rounded-full font-label-sm text-[10px] font-semibold flex items-center gap-1 shadow-sm ${
            inStock
              ? "bg-secondary-fixed text-on-secondary-fixed"
              : "bg-surface-container-highest text-on-surface-variant"
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              inStock ? "bg-tertiary" : "bg-outline"
            }`}
          />
          {inStock ? "In Stock" : "Out of Stock"}
        </div>
        <button
          aria-label="Favorite"
          onClick={() => setIsSaved((prev) => !prev)}
          className="absolute top-2 right-2 w-7 h-7 rounded-full bg-surface/80 backdrop-blur-md flex items-center justify-center transition-colors"
        >
          <Heart
            className={`w-[16px] h-[16px] ${
              isSaved ? "text-primary" : "text-on-surface-variant"
            }`}
            fill={isSaved ? "currentColor" : "none"}
          />
        </button>
      </div>

      <div className="p-3 flex flex-col flex-grow">
        <span className="font-label-sm text-[10px] text-on-surface-variant uppercase font-medium">
          {product.volume}
        </span>
        <h3 className="font-label-lg text-label-lg text-on-surface font-semibold line-clamp-2 mt-0.5 mb-1 leading-snug">
          {product.name}
        </h3>
        <div className="mt-auto pt-2 flex items-center justify-between">
          <span
            className={`font-label-lg text-label-lg font-bold ${
              inStock ? "text-primary" : "text-on-surface-variant"
            }`}
          >
            R{product.price}
          </span>
          <div className="flex items-center gap-2">
            <Link
              to={`/product/${product.id}`}
              className="flex items-center gap-1 px-3 py-2 rounded-full bg-surface-container-high text-on-surface font-label-sm text-[10px] uppercase font-medium hover:bg-surface-container-highest transition-colors"
            >
              View Details
              <ArrowRight className="text-[10px]" />
            </Link>
            {inStock ? (
              <button
                aria-label="Add to cart"
                onClick={handleAddToCart}
                className="w-9 h-9 rounded-full bg-primary text-on-primary flex items-center justify-center shadow active:scale-95 transition-transform"
              >
                <Plus className="text-[18px]" />
              </button>
            ) : (
              <button
                aria-label="Sold out"
                disabled
                className="h-9 px-2.5 rounded-full bg-surface-variant text-on-surface-variant font-label-sm text-[10px] uppercase font-bold cursor-not-allowed"
              >
                Sold Out
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
