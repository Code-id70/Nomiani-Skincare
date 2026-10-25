import { Link } from "react-router-dom";
import { X, Home, ShoppingBag, Info, Phone, ShoppingBasket } from "lucide-react";
import { useCart } from "../../context/CartContext";
import logo from "../../assets/logo/logo.png";
function MobileMenu({ isOpen, onClose }) {
  const { cartCount } = useCart();

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible"
        }`}
      />

      {/* Side Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 h-20 border-b">

          {/* Logo */}
                  <Link to="/" className="flex items-center">
                    <img
                      src={logo}
                      alt="Nomiani Skincare"
                      className="h-20 w-auto"
                    />
                  </Link>
          
          <button onClick={onClose}>
            <X className="text-[#7C3AED]" />
          </button>

        </div>

        {/* Navigation */}
        <nav className="flex flex-col py-6">

          <Link
            to="/"
            onClick={onClose}
            className="flex items-center gap-3 px-6 py-4 hover:bg-violet-50 transition"
          >
            <Home size={20} />
            Home
          </Link>

          <Link
            to="/shop"
            onClick={onClose}
            className="flex items-center gap-3 px-6 py-4 hover:bg-violet-50 transition"
          >
            <ShoppingBag size={20} />
            Shop
          </Link>

          <Link
            to="/about"
            onClick={onClose}
            className="flex items-center gap-3 px-6 py-4 hover:bg-violet-50 transition"
          >
            <Info size={20} />
            About
          </Link>

          <Link
            to="/contact"
            onClick={onClose}
            className="flex items-center gap-3 px-6 py-4 hover:bg-violet-50 transition"
          >
            <Phone size={20} />
            Contact
          </Link>

          <Link
            to="/cart"
            onClick={onClose}
            className="flex items-center justify-between px-6 py-4 hover:bg-violet-50 transition"
          >
            <div className="flex items-center gap-3">
              <ShoppingBasket size={20} />
              Cart
            </div>

            {cartCount > 0 && (
              <span className="bg-[#7C3AED] text-white text-xs px-2 py-1 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 border-t p-6">

          <p className="text-sm text-gray-500">
            Clean skincare for every skin type.
          </p>

        </div>

      </div>
    </>
  );
}

export default MobileMenu;

