import { Link } from "react-router-dom";
import { ShoppingBasket, Menu } from "lucide-react";
import { useCart } from "../../context/CartContext";
import logo from "../../assets/logo/logo.png";
import { useState } from "react";
import MobileMenu from "./MobileMenu";

function Navbar({ heroImage }) {
  const { cartCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
    <header className={`sticky top-0 z-50 border-b border-[#D4C5AB] ${heroImage ? "bg-[#FFF8F2]/60" : "bg-[#FFF8F2]/90 backdrop-blur-md"}`}>
      <div className="max-w-7xl mx-auto h-20 px-6 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src={logo}
            alt="DELI EGGS"
            className="h-20 w-auto"
          />
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
         <button
            onClick={() => setIsMenuOpen(true)}
            className="lg:hidden"
          >
            <Menu
              size={28}
              className="text-[#785900]"
            />
          </button>

        </div>

      </div>
    </header>

    <MobileMenu
      isOpen={isMenuOpen}
      onClose={() => setIsMenuOpen(false)}
    />
  </>
);
}

export default Navbar;