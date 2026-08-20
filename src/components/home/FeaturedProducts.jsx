import products from "../../data/products";
import ProductCard from "../shop/ProductCard";
import { Link } from "react-router-dom";

function FeaturedProducts() {
  return (
    <section className="py-24 bg-[#FFF8F2]">

      <div className="max-w-7xl mx-auto px-6">

        <div className="flex justify-between items-end mb-16">

          <div>

            <span className="uppercase text-[#785900] font-semibold tracking-widest">
              Featured Products
            </span>

            <h2
              className="text-3xl font-bold mt-2"
              style={{ fontFamily: "Montserrat" }}
            >
              Fresh From The Farm
            </h2>

          </div>

          <Link
            to="/shop"
            className="hidden md:block text-[#785900] font-semibold hover:underline"
          >
            View All →
          </Link>

        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {products
            .filter((product) => product.featured)
            .map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}

        </div>

      </div>

    </section>
  );
}

export default FeaturedProducts;