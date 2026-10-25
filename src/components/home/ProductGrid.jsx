import products from "../../data/products";
import ProductCard from "./ProductCard";

export default function ProductGrid() {
  return (
    <section className="px-4 py-8 bg-surface">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="font-headline text-headline-sm text-on-surface mt-0.5">
          Products
          </h2>
        </div>
        <a href="#" className="font-label-md text-label-md text-primary font-medium flex items-center gap-0.5">
          View All (12)
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
