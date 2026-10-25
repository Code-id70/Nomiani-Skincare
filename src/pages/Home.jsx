import HeroSection from "../components/home/HeroSection";
import ProductGrid from "../components/home/ProductGrid";
import HowToOrder from "../components/home/HowToOrder";
import CTABanner from "../components/home/CTABanner";

export default function Home() {
  return (
    <main className="flex-grow pb-32">
      <HeroSection />
      <ProductGrid />
      <HowToOrder />
      <CTABanner />
    </main>
  );
}
