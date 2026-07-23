import { useState } from "react";

import MainLayout from "../components/layout/MainMenu";
import SearchBar from "../components/shop/SearchBar";
import CategoryFilter from "../components/shop/CategoryFilter";
import SortProducts from "../components/shop/SortProducts";
import ProductCard from "../components/shop/ProductCard";

import products from "../data/products";

function Shop() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  const categories = [
    "All",
    "Large",
    "Medium",
    "Jumbo",
    "Half Tray",
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      product.name.toLowerCase().includes(selectedCategory.toLowerCase());

    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts];

  switch (sortBy) {
    case "price-low":
      sortedProducts.sort((a, b) => a.price - b.price);
      break;

    case "price-high":
      sortedProducts.sort((a, b) => b.price - a.price);
      break;

    case "name":
      sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
      break;

    default:
      break;
  }

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="mb-12">
          <h1
            className="text-5xl font-bold"
            style={{ fontFamily: "Montserrat" }}
          >
            Shop Fresh Eggs
          </h1>

          <p className="text-gray-600 mt-3">
            Browse our premium collection of farm-fresh eggs.
          </p>
        </div>

        <div className="space-y-8">
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />

          <div className="flex flex-col md:flex-row justify-between gap-6">
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />

            <SortProducts
              sortBy={sortBy}
              setSortBy={setSortBy}
            />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {sortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default Shop;