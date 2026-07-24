function CustomerForm({ formData, handleChange }) {
  return (
    <div className="bg-white rounded-3xl shadow-sm p-8">

      <h2
        className="text-3xl font-bold mb-8"
        style={{ fontFamily: "Montserrat" }}
      >
        Customer Information
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        <div>
          <label className="block mb-2 font-medium">
            First Name *
          </label>

          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Livhuwani"
            className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#785900]"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Last Name *
          </label>

          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Canly"
            className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#785900]"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Phone Number *
          </label>

          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="082 123 4567"
            className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#785900]"
          />
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