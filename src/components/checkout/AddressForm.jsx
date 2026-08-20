function AddressForm({ formData, handleChange, errors = {} }) {
  const inputClass = (field) =>
    `w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#785900] ${
      errors[field] ? "border-red-500" : ""
    }`;

  return (
    <div className="bg-white rounded-3xl shadow-sm p-8 mt-8">

      <h2
        className="text-3xl font-bold mb-8"
        style={{ fontFamily: "Montserrat" }}
      >
        Delivery Address
      </h2>

      <div className="grid gap-6">

        {/* Street Address */}
        <div data-error={errors.street ? "true" : undefined}>
          <label className="block mb-2 font-medium">
            Street Address *
          </label>

          <input
            type="text"
            name="street"
            value={formData.street}
            onChange={handleChange}
            placeholder="123 Main Street"
            className={inputClass("street")}
          />
          {errors.street && (
            <p className="text-red-500 text-sm mt-1">{errors.street}</p>
          )}
        </div>

        {/* Suburb & City */}
        <div className="grid md:grid-cols-2 gap-6">

          <div data-error={errors.suburb ? "true" : undefined}>
            <label className="block mb-2 font-medium">
              Suburb *
            </label>

            <input
              type="text"
              name="suburb"
              value={formData.suburb}
              onChange={handleChange}
              placeholder="Mamelodi East"
              className={inputClass("suburb")}
            />
            {errors.suburb && (
              <p className="text-red-500 text-sm mt-1">{errors.suburb}</p>
            )}
          </div>

          <div data-error={errors.city ? "true" : undefined}>
            <label className="block mb-2 font-medium">
              City *
            </label>

            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Pretoria"
              className={inputClass("city")}
            />
            {errors.city && (
              <p className="text-red-500 text-sm mt-1">{errors.city}</p>
            )}
          </div>

        </div>

        {/* Postal Code */}
        <div>
          <label className="block mb-2 font-medium">
            Postal Code
          </label>

          <input
            type="text"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            placeholder="0001"
            className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#785900]"
          />
        </div>

      </div>

    </div>
  );
}

export default AddressForm;