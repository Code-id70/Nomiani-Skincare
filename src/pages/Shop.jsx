import ProductGrid from "../components/home/ProductGrid";

export default function Shop() {
  return (
    <main className="flex-grow pt-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="font-headline-lg text-4xl text-on-surface mb-8">Shop the Collection</h1>
        <ProductGrid />
      </div>
    </main>
  );
}
