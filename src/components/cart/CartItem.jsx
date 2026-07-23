import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "../../context/CartContext";

function CartItem({ item }) {
  const {
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  return (
    <div className="bg-white rounded-3xl shadow-sm p-6 flex flex-col md:flex-row gap-6 items-center">

      {/* Product Image */}
      <img
        src={item.image}
        alt={item.name}
        className="w-36 h-36 rounded-2xl object-cover"
      />

      {/* Product Info */}
      <div className="flex-1 w-full">

        <h2
          className="text-2xl font-bold"
          style={{ fontFamily: "Montserrat" }}
        >
          {item.name}
        </h2>

        <p className="text-gray-500 mt-1">
          {item.size}
        </p>

        <p className="text-[#785900] font-bold text-2xl mt-4">
          R {item.price}
        </p>

      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-3">

        <button
          onClick={() => decreaseQuantity(item.id)}
          className="w-10 h-10 rounded-lg border border-gray-300 hover:bg-gray-100 flex items-center justify-center"
        >
          <Minus size={18} />
        </button>

        <span className="text-xl font-semibold w-8 text-center">
          {item.quantity}
        </span>

        <button
          onClick={() => increaseQuantity(item.id)}
          className="w-10 h-10 rounded-lg border border-gray-300 hover:bg-gray-100 flex items-center justify-center"
        >
          <Plus size={18} />
        </button>

      </div>

      {/* Subtotal */}
      <div className="text-center">

        <p className="text-gray-500">
          Subtotal
        </p>

        <p className="text-2xl font-bold text-[#785900]">
          R {item.price * item.quantity}
        </p>

      </div>

      {/* Remove */}
      <button
        onClick={() => removeFromCart(item.id)}
        className="text-red-500 hover:text-red-700 transition"
        title="Remove Item"
      >
        <Trash2 size={24} />
      </button>

    </div>
  );
}

export default CartItem;