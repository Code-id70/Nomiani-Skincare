import { Search } from "lucide-react";

function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="relative w-full">

      <Search
        size={20}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
      />

      <input
        type="text"
        placeholder="Search eggs..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="
          w-full
          rounded-2xl
          border
          border-gray-200
          bg-white
          py-4
          pl-12
          pr-4
          outline-none
          transition
          focus:border-[#785900]
          focus:ring-2
          focus:ring-amber-200
        "
      />

    </div>
  );
}

export default SearchBar;