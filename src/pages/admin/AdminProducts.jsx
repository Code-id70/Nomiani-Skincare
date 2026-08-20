import { useMemo, useState, useEffect } from "react";
import {
  Plus,
  Search,
  Filter,
  ArrowDownAZ,
  Edit3,
  Trash2,
  PackageCheck,
  MoreVertical,
  X,
} from "lucide-react";

import AdminLayout from "../../components/admin/AdminLayout";
import {
  getAdminProducts,
  updateProductStock,
  deleteProduct,
  createProduct,
} from "../../services/dashboardService";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [stockFilter, setStockFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [showAddModal, setShowAddModal] = useState(false);
  const [savingId, setSavingId] = useState(null);

  const [newProduct, setNewProduct] = useState({
    name: "",
    size: "",
    price: "",
  });

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError("");

        const res = await getAdminProducts();

        if (cancelled) return;

        const data = res.data || [];
        const mapped = data.map((p) => ({
          id: p.id,
          name: p.name,
          size: p.size || "N/A",
          price: Number(p.price || 0),
          inStock: p.in_stock,
          stock_quantity: p.stock_quantity,
          image: p.image,
          category: p.category,
          featured: p.featured,
        }));

        setProducts(mapped);
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Failed to load products.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  /*
  |--------------------------------------------------------------------------
  | Search + Filter + Sort
  |--------------------------------------------------------------------------
  */

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search
    if (search.trim()) {
      const query = search.toLowerCase();

      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.size.toLowerCase().includes(query)
      );
    }

    // Stock filter
    if (stockFilter === "in_stock") {
      result = result.filter((product) => product.inStock);
    }

    if (stockFilter === "out_of_stock") {
      result = result.filter((product) => !product.inStock);
    }

    // Sort
    if (sortBy === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (sortBy === "price_low") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sortBy === "price_high") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, search, stockFilter, sortBy]);

  /*
  |--------------------------------------------------------------------------
  | Toggle Stock
  |--------------------------------------------------------------------------
  */

  const toggleStock = async (id) => {
    const product = products.find((item) => item.id === id);

    if (!product) return;

    const newQuantity = product.inStock ? 0 : 10;
    setSavingId(id);

    try {
      await updateProductStock(id, newQuantity);

      setProducts((currentProducts) =>
        currentProducts.map((p) =>
          p.id === id
            ? {
                ...p,
                inStock: newQuantity > 0,
                stock_quantity: newQuantity,
              }
            : p
        )
      );
    } catch (err) {
      alert(err.message || "Failed to update stock.");
    } finally {
      setSavingId(null);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Delete Product
  |--------------------------------------------------------------------------
  */

  const deleteProductHandler = async (id) => {
    const product = products.find((item) => item.id === id);

    if (!product) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete ${product.name}?`
    );

    if (!confirmed) return;

    try {
      await deleteProduct(id);

      setProducts((currentProducts) =>
        currentProducts.filter((product) => product.id !== id)
      );
    } catch (err) {
      alert(err.message || "Failed to delete product.");
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Add Product
  |--------------------------------------------------------------------------
  */

  const handleAddProduct = async (e) => {
    e.preventDefault();

    if (
      !newProduct.name.trim() ||
      !newProduct.size.trim() ||
      !newProduct.price
    ) {
      return;
    }

    try {
      const res = await createProduct({
        name: newProduct.name,
        size: newProduct.size,
        price: Number(newProduct.price),
        stock_quantity: 0,
        in_stock: false,
      });

      const created = res.data;

      setProducts((currentProducts) => [
        ...currentProducts,
        {
          id: created.id,
          name: created.name,
          size: created.size || "N/A",
          price: Number(created.price || 0),
          inStock: created.in_stock,
          stock_quantity: created.stock_quantity,
          image: created.image,
        },
      ]);

      setNewProduct({
        name: "",
        size: "",
        price: "",
      });

      setShowAddModal(false);
    } catch (err) {
      alert(err.message || "Failed to create product.");
    }
  };

  return (
    <AdminLayout>

      {/* =========================================================
          PAGE HEADER
      ========================================================== */}

      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">

        <div>
          <h1
            className="text-3xl lg:text-4xl font-bold text-[#201B11]"
            style={{ fontFamily: "Montserrat" }}
          >
            Products
          </h1>

          <p className="text-gray-500 mt-2">
            Manage your DELI EGGS products and inventory.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="bg-[#785900] text-white font-semibold px-5 py-3 rounded-lg shadow-sm hover:bg-[#5B4200] transition-all flex items-center justify-center gap-2"
        >
          <Plus size={19} />

          Add Product
        </button>

      </div>

      {error && (
        <div className="mb-6 p-4 rounded-xl border border-red-200 bg-red-50 text-red-700 text-sm">
          {error}
        </div>
      )}


      {/* =========================================================
          SEARCH + FILTERS
      ========================================================== */}

      <div className="flex flex-col lg:flex-row justify-between gap-4 mb-6">

        {/* Search */}

        <div className="relative w-full lg:max-w-md">

          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full h-11 pl-10 pr-4 bg-white border border-[#D4C5AB] rounded-lg outline-none text-sm focus:border-[#785900] focus:ring-2 focus:ring-[#785900]/10"
          />

        </div>


        {/* Filters */}

        <div className="flex flex-col sm:flex-row gap-2">

          {/* Stock Filter */}

          <div className="relative">

            <Filter
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
            />

            <select
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value)}
              className="h-11 pl-9 pr-8 bg-white border border-[#D4C5AB] rounded-lg text-sm outline-none focus:border-[#785900]"
            >
              <option value="all">
                All Status
              </option>

              <option value="in_stock">
                In Stock
              </option>

              <option value="out_of_stock">
                Out of Stock
              </option>
            </select>

          </div>


          {/* Sort */}

          <div className="relative">

            <ArrowDownAZ
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
            />

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="h-11 pl-9 pr-8 bg-white border border-[#D4C5AB] rounded-lg text-sm outline-none focus:border-[#785900]"
            >
              <option value="name">
                Sort by Name
              </option>

              <option value="price_low">
                Price: Low to High
              </option>

              <option value="price_high">
                Price: High to Low
              </option>
            </select>

          </div>

        </div>

      </div>


      {/* =========================================================
          PRODUCTS TABLE
      ========================================================== */}

      <div className="hidden sm:block bg-white rounded-xl border border-[#D4C5AB] shadow-[0_4px_20px_rgba(120,89,0,0.05)] overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full text-left">

            <thead className="bg-[#F9F2EC] border-b border-[#D4C5AB]">

              <tr>

                <th className="px-4 py-4 text-xs uppercase tracking-wider text-gray-500 font-semibold">
                  Product
                </th>

                <th className="px-4 py-4 text-xs uppercase tracking-wider text-gray-500 font-semibold">
                  Size
                </th>

                <th className="px-4 py-4 text-xs uppercase tracking-wider text-gray-500 font-semibold">
                  Price
                </th>

                <th className="px-4 py-4 text-xs uppercase tracking-wider text-gray-500 font-semibold">
                  Stock Status
                </th>

                <th className="px-4 py-4 text-xs uppercase tracking-wider text-gray-500 font-semibold text-right">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {loading
                ? Array.from({ length: 3 }).map((_, i) => (
                    <tr key={i} className="border-b border-[#D4C5AB]/50">
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-lg bg-[#F3EDE7] animate-pulse" />
                          <div className="w-24 h-4 rounded bg-[#F3EDE7] animate-pulse" />
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="w-16 h-4 rounded bg-[#F3EDE7] animate-pulse" />
                      </td>
                      <td className="px-4 py-4">
                        <div className="w-16 h-4 rounded bg-[#F3EDE7] animate-pulse" />
                      </td>
                      <td className="px-4 py-4">
                        <div className="w-20 h-6 rounded-full bg-[#F3EDE7] animate-pulse" />
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex justify-end gap-1">
                          <div className="w-8 h-8 rounded-md bg-[#F3EDE7] animate-pulse" />
                          <div className="w-8 h-8 rounded-md bg-[#F3EDE7] animate-pulse" />
                          <div className="w-8 h-8 rounded-md bg-[#F3EDE7] animate-pulse" />
                        </div>
                      </td>
                    </tr>
                  ))
                : filteredProducts.map((product) => (

                    <tr
                      key={product.id}
                      className="border-b border-[#D4C5AB]/50 hover:bg-[#FFF8F2] transition-colors group"
                    >

                      {/* Product */}

                      <td className="px-4 py-4">

                        <div className="flex items-center gap-4">

                          <img
                            src={product.image || "https://placehold.co/100x100/F9F2EC/785900?text=Eggs"}
                            alt={product.name}
                            className="w-12 h-12 rounded-lg object-cover border border-[#D4C5AB]/40"
                            onError={(e) => {
                              e.currentTarget.src =
                                "https://placehold.co/100x100/F9F2EC/785900?text=Eggs";
                            }}
                          />

                          <span className="font-semibold text-[#201B11]">
                            {product.name}
                          </span>

                        </div>

                      </td>


                      {/* Size */}

                      <td className="px-4 py-4 text-sm text-gray-500">
                        {product.size}
                      </td>


                      {/* Price */}

                      <td className="px-4 py-4 font-semibold text-[#201B11]">
                        R{product.price.toFixed(2)}
                      </td>


                      {/* Stock */}

                      <td className="px-4 py-4">

                        <StockBadge
                          inStock={product.inStock}
                        />

                      </td>


                      {/* Actions */}

                      <td className="px-4 py-4">

                        <div className="flex items-center justify-end gap-1">

                          <button
                            type="button"
                            title="Edit"
                            className="p-2 rounded-md text-gray-500 hover:text-[#785900] hover:bg-[#F3EDE7] transition"
                          >
                            <Edit3 size={18} />
                          </button>

                          <button
                            type="button"
                            title={
                              product.inStock
                                ? "Mark Out of Stock"
                                : "Mark In Stock"
                            }
                            onClick={() => toggleStock(product.id)}
                            disabled={savingId === product.id}
                            className="p-2 rounded-md text-gray-500 hover:text-[#785900] hover:bg-[#F3EDE7] transition disabled:opacity-50"
                          >
                            <PackageCheck size={18} />
                          </button>

                          <button
                            type="button"
                            title="Delete"
                            onClick={() => deleteProductHandler(product.id)}
                            className="p-2 rounded-md text-gray-500 hover:text-red-600 hover:bg-red-50 transition"
                          >
                            <Trash2 size={18} />
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))}

            </tbody>

          </table>

        </div>


        {/* Empty */}

        {!loading && filteredProducts.length === 0 && (
          <div className="py-16 text-center">

            <PackageCheck
              size={42}
              className="mx-auto text-gray-300 mb-3"
            />

            <h3 className="font-semibold text-gray-700">
              No products found
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Try changing your search or filter.
            </p>

          </div>
        )}
      </div>


      {/* =========================================================
          MOBILE PRODUCT CARDS
      ========================================================== */}

      <div className="grid grid-cols-1 gap-4 sm:hidden">

        {loading
          ? Array.from({ length: 2 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-[#D4C5AB] p-4 shadow-sm flex gap-4 animate-pulse"
              >
                <div className="w-20 h-20 rounded-lg bg-[#F3EDE7]" />
                <div className="flex-1 space-y-2">
                  <div className="w-32 h-4 rounded bg-[#F3EDE7]" />
                  <div className="w-16 h-4 rounded bg-[#F3EDE7]" />
                  <div className="w-20 h-4 rounded bg-[#F3EDE7]" />
                </div>
              </div>
            ))
          : filteredProducts.map((product) => (

              <div
                key={product.id}
                className="bg-white rounded-xl border border-[#D4C5AB] p-4 shadow-sm flex gap-4"
              >

                <img
                  src={product.image || "https://placehold.co/100x100/F9F2EC/785900?text=Eggs"}
                  alt={product.name}
                  className="w-20 h-20 rounded-lg object-cover border border-[#D4C5AB]/40"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://placehold.co/100x100/F9F2EC/785900?text=Eggs";
                  }}
                />

                <div className="flex-1">

                  <div className="flex justify-between items-start mb-1">

                    <h3 className="font-semibold text-[#201B11]">
                      {product.name}
                    </h3>

                    <button
                      type="button"
                      className="text-gray-500"
                    >
                      <MoreVertical size={20} />
                    </button>

                  </div>

                  <p className="text-sm text-gray-500 mb-2">
                    {product.size}
                  </p>

                  <div className="flex justify-between items-center">

                    <span className="font-bold text-[#201B11]">
                      R{product.price.toFixed(2)}
                    </span>

                    <StockBadge
                      inStock={product.inStock}
                      small
                    />

                  </div>

                </div>

              </div>

            ))}

      </div>


      {/* =========================================================
          ADD PRODUCT MODAL
      ========================================================== */}

      {showAddModal && (

        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">

          {/* Overlay */}

          <div
            className="absolute inset-0 bg-black/40 backdrop:blur-sm"
            onClick={() => setShowAddModal(false)}
          />

          {/* Modal */}

          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-[#D4C5AB]">

            {/* Header */}

            <div className="flex items-center justify-between px-6 py-5 border-b border-[#D4C5AB]">

              <div>

                <h2
                  className="text-xl font-bold text-[#201B11]"
                  style={{ fontFamily: "Montserrat" }}
                >
                  Add Product
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Add a new DELI EGGS product.
                </p>

              </div>

              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="p-2 rounded-full hover:bg-[#FFF8F2] text-gray-500"
              >
                <X size={20} />
              </button>

            </div>


            {/* Form */}

            <form
              onSubmit={handleAddProduct}
              className="p-6 space-y-5"
            >

              {/* Product Name */}

              <div>

                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Product Name
                </label>

                <input
                  type="text"
                  value={newProduct.name}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      name: e.target.value,
                    })
                  }
                  placeholder="e.g. Large Eggs"
                  className="w-full h-11 px-4 border border-[#D4C5AB] rounded-lg outline-none focus:border-[#785900] focus:ring-2 focus:ring-[#785900]/10"
                />

              </div>


              {/* Size */}

              <div>

                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Size
                </label>

                <input
                  type="text"
                  value={newProduct.size}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      size: e.target.value,
                    })
                  }
                  placeholder="e.g. 30 Tray"
                  className="w-full h-11 px-4 border border-[#D4C5AB] rounded-lg outline-none focus:border-[#785900] focus:ring-2 focus:ring-[#785900]/10"
                />

              </div>


              {/* Price */}

              <div>

                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Price
                </label>

                <div className="relative">

                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                    R
                  </span>

                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={newProduct.price}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        price: e.target.value,
                      })
                    }
                    placeholder="95.00"
                    className="w-full h-11 pl-9 pr-4 border border-[#D4C5AB] rounded-lg outline-none focus:border-[#785900] focus:ring-2 focus:ring-[#785900]/10"
                  />

                </div>

              </div>


              {/* Buttons */}

              <div className="flex justify-end gap-3 pt-2">

                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-5 py-2.5 rounded-lg border border-[#D4C5AB] text-gray-600 font-semibold hover:bg-[#FFF8F2] transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-lg bg-[#785900] text-white font-semibold hover:bg-[#5B4200] transition"
                >
                  Add Product
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </AdminLayout>
  );
}


/* =========================================================
   STOCK BADGE
========================================================= */

function StockBadge({ inStock, small = false }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-semibold ${
        small
          ? "px-2 py-0.5 text-[10px]"
          : "px-2.5 py-1 text-xs"
      } ${
        inStock
          ? "bg-[#006877]/10 text-[#006877] border border-[#006877]/20"
          : "bg-[#BA1A1A]/10 text-[#BA1A1A] border border-[#BA1A1A]/20"
      }`}
    >

      <span
        className={`rounded-full ${
          small ? "w-1 h-1" : "w-1.5 h-1.5"
        } ${
          inStock
            ? "bg-[#006877]"
            : "bg-[#BA1A1A]"
        }`}
      />

      {inStock ? "In Stock" : "Out of Stock"}

    </span>
  );
}

export default AdminProducts;
