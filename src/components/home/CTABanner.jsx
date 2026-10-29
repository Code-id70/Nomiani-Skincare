import { Ticket } from "lucide-react";
import { Link } from "react-router-dom";

export default function CTABanner() {
  return (
    <section className="px-4 py-8 bg-surface">
      <div className="relative overflow-hidden rounded-2xl bg-primary-container text-on-primary-container p-6 shadow-md flex flex-col items-center text-center">
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-on-primary-container/10 rounded-full pointer-events-none" />
        <div className="w-12 h-12 rounded-full bg-surface-container-lowest/20 flex items-center justify-center mb-3">
          <Ticket className="text-[26px] text-on-primary-container" />
        </div>
        <h2 className="font-headline-sm text-headline-sm font-headline-sm mb-2 text-on-primary-container">
          Beauty Delivered Straight To Your Door
        </h2>
        <p className="font-body-md text-body-md opacity-95 max-w-xs mb-5">
          Free courier delivery across South Africa on all orders over R650.
        </p>
        <Link
          to="/shop"
          className="h-12 px-8 rounded-full bg-surface-container-lowest text-primary font-label-lg text-label-lg shadow-sm hover:bg-surface-container-low transition-colors active:scale-95 flex items-center justify-center"
        >
          Shop Now
        </Link>
      </div>
    </section>
  );
}
