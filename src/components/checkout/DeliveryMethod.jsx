function DeliveryMethod({
  deliveryMethod,
  setDeliveryMethod,
  errors = {},
}) {
  const inputClass = () =>
    `mt-1 ${errors.deliveryMethod ? "border-red-500" : ""}`;

  return (
    <div className="bg-white rounded-3xl shadow-sm p-8 mt-8">

      <h2
        className="text-3xl font-bold mb-8"
        style={{ fontFamily: "Montserrat" }}
      >
        Delivery Method
      </h2>

      <div className="space-y-5">

        {/* Collection */}

        <label className="flex items-start gap-4 p-5 border rounded-2xl cursor-pointer hover:border-[#785900] transition">

          <input
            type="radio"
            name="deliveryMethod"
            value="collection"
            checked={deliveryMethod === "collection"}
            onChange={(e) => setDeliveryMethod(e.target.value)}
            className={inputClass("collection")}
          />

          <div>

            <h3 className="font-semibold text-lg">
              Collection
            </h3>

            <p className="text-gray-500 mt-1">
              Collect your order from our store. Free.
            </p>

          </div>

        </label>

        {/* Delivery */}

        <label className="flex items-start gap-4 p-5 border rounded-2xl cursor-pointer hover:border-[#785900] transition">

          <input
            type="radio"
            name="deliveryMethod"
            value="delivery"
            checked={deliveryMethod === "delivery"}
            onChange={(e) => setDeliveryMethod(e.target.value)}
            className={inputClass("delivery")}
          />

          <div>

            <h3 className="font-semibold text-lg">
              Delivery
            </h3>

            <p className="text-gray-500 mt-1">
              We'll deliver your order to your location. Delivery fees will be confirmed after your order has been reviewed.
            </p>

          </div>

        </label>

      </div>

      {errors.deliveryMethod && (
        <p className="text-red-500 text-sm mt-3">{errors.deliveryMethod}</p>
      )}

    </div>
  );
}

export default DeliveryMethod;