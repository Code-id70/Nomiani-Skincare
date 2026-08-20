function CustomerForm({ formData, handleChange, errors = {} }) {
  const inputClass = (field) =>
    `w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#785900] ${
      errors[field] ? "border-red-500" : ""
    }`;

  return (
    <div className="bg-white rounded-3xl shadow-sm p-8">

      <h2
        className="text-3xl font-bold mb-8"
        style={{ fontFamily: "Montserrat" }}
      >
        Customer Information
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        <div data-error={errors.firstName ? "true" : undefined}>
          <label className="block mb-2 font-medium">
            First Name *
          </label>

          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Livhuwani"
            className={inputClass("firstName")}
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
          )}
        </div>

        <div data-error={errors.lastName ? "true" : undefined}>
          <label className="block mb-2 font-medium">
            Last Name *
          </label>

          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Canly"
            className={inputClass("lastName")}
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
          )}
        </div>

        <div data-error={errors.phone ? "true" : undefined}>
          <label className="block mb-2 font-medium">
            Phone Number *
          </label>

          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="082 123 4567"
            className={inputClass("phone")}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
          )}
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Email (Optional)
          </label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Canly@email.com"
            className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#785900]"
          />
        </div>

      </div>

    </div>
  );
}

export default CustomerForm;