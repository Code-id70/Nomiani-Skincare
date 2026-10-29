import { Flower2, MessageCircle, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="px-4 pt-10 pb-12 bg-surface-container text-on-surface flex flex-col">
      <div className="flex flex-col items-center text-center mb-6">
        <div className="flex items-center gap-2 mb-1">
          <Flower2 className="text-primary text-[24px]" />
          <span className="font-headline font-headline-sm text-headline-sm text-primary font-bold">
            Nomiani Skincare
          </span>
        </div>
        <p className="font-body-sm text-body-sm text-on-surface-variant max-w-xs">
          Nourish your skin with earth-born botanicals.
        </p>
      </div>

      <div className="w-full mb-8">
        <a
          href="https://wa.me/27680688642"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full h-12 rounded-full bg-[#25D366] text-white font-label-lg text-label-lg font-medium flex items-center justify-center gap-2 shadow-sm hover:brightness-105 active:scale-[0.99] transition-all"
        >
          <MessageCircle className="text-[20px]" />
          <span>Chat with Us on WhatsApp</span>
        </a>
      </div>

      <div className="flex flex-col gap-2 p-4 rounded-xl bg-surface-container-high/60 mb-6 text-center">
        <p className="font-label-sm text-[11px] text-on-surface-variant font-medium">
          Nomiani Skincare (Pty) Ltd 
        </p>
        <p className="font-body-sm text-[12px] text-on-surface-variant leading-snug">
          Studio 4, The Old Biscuit Mill, Woodstock, Cape Town, 7925
        </p>
        <div className="flex items-center justify-center gap-3 pt-1">
          <a className="font-body-sm text-[12px] text-primary hover:underline" href="mailto:hello@haloskin.co.za">
            help@nomianiskincare.co.za
          </a>
          <span className="text-on-surface-variant">&bull;</span>
          <span className="font-body-sm text-[12px] text-on-surface-variant">
            <Phone className="inline w-[12px] h-[12px] mr-1" /> +27 68 068 8642
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 mb-6 text-center">
        <a className="font-label-sm text-[11px] text-on-surface-variant hover:text-primary">
          Return &amp; Refund Policy
        </a>
        <span className="text-on-surface-variant/40">&bull;</span>
        <a className="font-label-sm text-[11px] text-on-surface-variant hover:text-primary">
          Terms of Service
        </a>
        <span className="text-on-surface-variant/40">&bull;</span>
        <a className="font-label-sm text-[11px] text-on-surface-variant hover:text-primary">
          Privacy Policy (POPIA)
        </a>
      </div>

      <div className="text-center pt-2">
        <p className="font-label-sm text-[11px] text-on-surface-variant opacity-80">
          &copy; 2025 Nomiani Skincare Botanicals. All rights reserved. Handcrafted in South Africa.
        </p>
      </div>
    </footer>
  );
}
