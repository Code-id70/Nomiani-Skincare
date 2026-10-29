import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative px-4 pt-24 pb-8 overflow-hidden bg-surface">
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-accent/10 rounded-full blur-2xl pointer-events-none"></div>
      <div className="absolute top-1/2 -left-10 w-36 h-36 bg-accent/20 rounded-full blur-xl pointer-events-none"></div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-low shadow-sm mb-6">
          <span className="font-label-sm text-accent uppercase tracking-wider">Clinical Grade</span>
        </div>

        <h1 className="font-headline-lg-mobile text-3xl md:text-4xl text-on-surface font-headline-lg tracking-tight mb-4 leading-tight">
          Your Skin's Next{" "}
          <span className="italic text-accent">Nomiani Skincare</span>
        </h1>

        <p className="font-body-md text-body-md text-on-surface-variant max-w-sm mb-8 mx-auto leading-relaxed">
          Clean, clinical formulations for radiant skin. Premium skincare
          crafted for every complexion.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-xs">
          <Link
            to="/shop"
            className="w-full sm:w-auto h-12 rounded-full bg-accent text-on-accent font-semibold flex items-center justify-center gap-2 shadow-lg hover:bg-accent-dark transition-colors active:scale-[0.98]"
          >
            Shop the Collection
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </Link>
          <button className="w-full sm:w-auto h-12 rounded-full bg-surface-container-low text-on-surface font-semibold flex items-center justify-center shadow-sm hover:bg-surface-container-high transition-colors">
            View All Products
          </button>
        </div>

        <div className="mt-10 flex justify-center gap-4 w-full">
          <div className="flex flex-col items-center justify-center p-3 rounded-xl">
            <span className="text-[20px] text-accent mb-1">local_florist</span>
            <span className="font-label-sm text-accent font-medium text-center">100% Clean</span>
          </div>
          <div className="flex flex-col items-center justify-center p-3 rounded-xl">
            <span className="text-[20px] text-accent mb-1">local_shipping</span>
            <span className="font-label-sm text-accent font-medium text-center">SA Delivery</span>
          </div>
        </div>
      </div>
    </section>
  );
}

