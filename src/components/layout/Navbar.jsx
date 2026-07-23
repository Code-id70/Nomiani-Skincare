import { Link } from "react-router-dom";
import { ShoppingBasket, Menu } from "lucide-react";
import { useCart } from "../../context/CartContext";

function Navbar() {
  const { cartCount } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-[#FFF8F2]/90 backdrop-blur-md border-b border-[#D4C5AB]">
      <div className="max-w-7xl mx-auto h-20 px-6 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center">
          <div className="w-14 h-14 rounded-full bg-[#785900] flex items-center justify-center text-white font-bold text-xs">
            LOGO
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-10">

          <Link
            to="/"
            className="font-medium hover:text-[#785900] transition-colors"
          >
            Home
          </Link>

          <Link
            to="/shop"
            className="font-medium hover:text-[#785900] transition-colors"
          >
            Shop
          </Link>

          <Link
            to="/about"
            className="font-medium hover:text-[#785900] transition-colors"
          >
            About
          </Link>

          <Link
            to="/contact"
            className="font-medium hover:text-[#785900] transition-colors"
          >
            Contact
          </Link>

        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-4">

          <Link
            to="/cart"
            className="relative p-2 rounded-full hover:bg-amber-100 transition"
          >
            <ShoppingBasket
              size={24}
              className="text-[#785900]"
            />

            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 rounded-full bg-amber-500 text-white text-xs flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Mobile Menu Button */}
          <button className="lg:hidden">
            <Menu className="text-[#785900]" />
          </button>

        </div>

      </div>
    </header>
  );
}

export default Navbar;