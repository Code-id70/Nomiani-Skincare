import { Flower2, Store, ShoppingBag, UserCircle } from "lucide-react";
import { useCart } from "../../context/CartContext";

const bottomLinks = [
  { label: "Discover", Icon: Flower2, to: "/", active: true },
  { label: "Shop", Icon: Store, to: "/shop", active: false },
  { label: "Cart", Icon: ShoppingBag, to: "/cart", active: false },
  { label: "Account", Icon: UserCircle, to: "#", active: false },
];

export default function BottomNav() {
  const { itemCount } = useCart();

  return (
    <nav className="fixed bottom-0 w-full z-50 pb-safe bg-surface/90 backdrop-blur-xl shadow-[0_-4px_20px_-2px_rgba(110,103,95,0.08)]">
      <div className="flex justify-around items-center h-16 px-2">
        {bottomLinks.map((link) => {
          const Icon = link.Icon;
          const active = link.active;

          return (
            <a
              key={link.label}
              href={link.to}
              onClick={(e) => {
                if (link.label === "Account") {
                  e.preventDefault();
                  alert("Account login coming soon — you can still checkout as a guest.");
                }
              }}
              className="relative flex flex-col items-center justify-center gap-1 min-w-[60px] h-12 transition-colors"
            >
              <Icon
                size={22}
                className={`${active ? "text-primary" : "text-on-surface-variant"} transition-colors`}
              />
              {link.label === "Cart" && itemCount > 0 && (
                <span className="absolute top-0 right-0 min-w-[18px] h-[18px] px-1 rounded-full bg-primary text-on-primary font-label-sm text-[10px] font-bold flex items-center justify-center">
                  {itemCount}
                </span>
              )}
              <span
                className={`font-label-sm text-label-sm ${active ? "text-primary font-semibold" : "text-on-surface-variant"} transition-colors`}
              >
                {link.label}
              </span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
