import { Link } from "react-router-dom";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useState } from "react";

const LOGO = "/logo/NOMIANI%20Botanical%20Skincare%20Logo.png";

const secondaryLinks = [
  { label: "Shop", to: "/shop" },
  { label: "About", to: "/about" },
  { label: "How to Order", to: "#" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  const { itemCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-transparent backdrop-blur-sm shadow-none">
      <div className="px-4 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-6 min-w-0">
          <Link to="/" className="flex items-center gap-2 min-w-0">
            <img alt="Nomiani Skincare Logo" className="h-16 w-auto object-contain shrink-0" src={LOGO} />
          </Link>

          {/* Desktop menu centered */}
          <div className="hidden md:flex items-center gap-6 overflow-x-auto no-scrollbar whitespace-nowrap">
            {secondaryLinks.map((link) => (
              <a
                key={link.label}
                href={link.to}
                className="font-label-sm text-label-sm uppercase text-on-surface hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Link to="/cart" className="relative w-11 h-11 flex items-center justify-center text-on-surface hover:text-primary transition-colors">
            <ShoppingBag size={22} />
            <span className="absolute top-1 right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-primary text-on-primary font-label-sm text-[10px] font-bold flex items-center justify-center">
              {itemCount}
            </span>
          </Link>
          {/* Mobile hamburger moved to right */}
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden w-8 h-8 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile overlay menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-60 backdrop-blur-xl" onClick={() => setMobileMenuOpen(false)}>
          <div className="absolute top-4 right-4 ">
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="w-8 h-8 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface"
            >
              <X size={20} />
            </button>
          </div>
          <div className="px-4 pt-16 pb-4">
          <div className="flex flex-col gap-2">
            {secondaryLinks.map((link) => (
              <a
                key={link.label}
                href={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className="block bg-primary text-on-primary font-medium uppercase tracking-wider text-label-sm rounded-xl px-4 py-2 mb-2 transition-colors hover:bg-primary/90"
              >
                {link.label}
              </a>
            ))}
          </div>
          </div>
        </div>
      )}
    </header>
  );
}
