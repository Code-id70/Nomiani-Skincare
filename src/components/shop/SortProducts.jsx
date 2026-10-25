import { ArrowUpDown } from "lucide-react";

function SortProducts({ sortBy, setSortBy }) {
  return (
    <div className="flex items-center gap-2">

      <ArrowUpDown size={20} className="text-gray-400" />

      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="
          rounded-xl
          border
          border-gray-200
          bg-white
          px-4
          py-2
          outline-none
          transition
          focus:border-[#7C3AED]
          focus:ring-2
          focus:ring-amber-200
          text-gray-700
        "
      >
        <option value="default">Default</option>
        <option value="price-low">Price: Low to High</option>
        <option value="price-high">Price: High to Low</option>
        <option value="name">Name: A to Z</option>
      </select>

    </div>
  );
}

export default SortProducts;


