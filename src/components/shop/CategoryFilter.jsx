function CategoryFilter({
  categories,
  selectedCategory,
  setSelectedCategory,
}) {
  return (
    <div className="flex flex-wrap gap-3">

      {categories.map((category) => (

        <button
          key={category}
          onClick={() => setSelectedCategory(category)}
          className={`px-5 py-2 rounded-full font-medium transition-all duration-300 ${
            selectedCategory === category
              ? "bg-[#7C3AED] text-white"
              : "bg-white border border-gray-200 hover:border-[#7C3AED] hover:text-[#7C3AED]"
          }`}
        >
          {category}
        </button>

      ))}

    </div>
  );
}

export default CategoryFilter;

