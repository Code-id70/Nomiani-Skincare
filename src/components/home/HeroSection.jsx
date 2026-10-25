import { Link } from "react-router-dom";
import { Leaf, Truck, ArrowRight, Flower } from "lucide-react";

const HERO_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBDK4SLHK21raZY4jh2f1SwGKHaIHGM1S27VZ3pvXFYLTzz3J5KYpJVSk9CS12w3R5SykZ8A_IjwnpQN9TkE8pXTM6GnddTYZSX43hagD5vE1oMxGc1wo-d2G552_or8gcS3bbbUqZy1s_5z6_biWN4EJ-8SG4bwl8JuXN_sH1qCvM6yWe3AuIOWilQ2fE7YZ4REtjZJoUNHxmjn5UCnShymef4UeT7Xz0bbQhONz5y0uYqOOj6EIX7";

const HERO_ALT =
  "An ethereal editorial flatlay of amber glass cosmetic dropper bottles, rich whipped golden cream in a ceramic dish, fresh protea flowers, and crushed botanicals on warm sunlit terracotta stones, high luxury aesthetic, soft organic lighting, serene clean wellness.";

const badges = [
  { label: "100% Organic", icon: Leaf },
  { label: "SA Delivery", icon: Truck },
];

export default function HeroSection() {
  return (
    <section className="relative px-4 pt-24 pb-8 overflow-hidden bg-gradient-to-b from-surface-container-low via-surface-container to-surface">
      {/* Ambient botanical graphic accents */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-secondary-fixed/40 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute top-1/2 -left-10 w-36 h-36 bg-primary-fixed/30 rounded-full blur-xl pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Seasonal Ribbon */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full shadow-sm mb-4">
          <div className="flex flex-col items-center gap-3">
  <span className="font-sans text-xs sm:text-sm text-on-surface-variant uppercase tracking-[0.35em] font-medium">
    Welcome to
  </span>
  <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-on-surface tracking-tight text-center leading-tight">
    Nomiani <span className="italic font-light">Skincare</span>
  </h1>
  <span className="h-px w-16 bg-on-surface/20" />
</div>
        </div>

        {/* Main Headline */}
        <h1 className="font-headline text-headline-lg-mobile text-on-surface font-headline-lg tracking-tight mb-3 leading-tight">
          Your daily glow <br />
          <span className="italic text-primary font-serif">starts here</span>
        </h1>

        <p className="font-body text-body-md text-on-surface-variant max-w-sm mb-6">
          Handcrafted natural botanicals, botanical oils, and nourishing body care formulated for radiant, healthy South African skin.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-xs mb-8">
          <Link
            to="/shop"
            className="w-full h-12 rounded-full bg-primary text-on-primary font-sans text-label-lg font-medium flex items-center justify-center gap-2 shadow-md active:scale-[0.98] transition-transform"
          >
            <span>Shop Now</span>
            <ArrowRight className="text-[18px]" />
          </Link>
        </div>

        {/* Hero Visual Highlight */}
        <div className="w-full relative rounded-2xl overflow-hidden shadow-lg bg-surface-container-lowest mb-6">
          <img className="w-full h-52 object-cover" src={HERO_IMAGE} alt={HERO_ALT} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-on-primary">
            <div className="flex items-center gap-1.5 backdrop-blur-md bg-inverse-surface/40 px-2.5 py-1 rounded-full">
              <Flower className="text-[14px]" />
              <span className="font-sans text-label-sm">Gauteng based</span>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-3 gap-2 w-full pt-2">
          {badges.map((badge) => {
            const Icon = badge.icon;
            return (
              <div
                key={badge.label}
                className="flex flex-col items-center justify-center p-2.5 shadow-sm"
              >
                <Icon className="text-[20px] text-secondary mb-1" />
                <span className="font-sans text-label-sm text-on-surface font-medium text-center">
                  {badge.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
