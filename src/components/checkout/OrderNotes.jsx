function OrderNotes({ formData, handleChange }) {
  return (
    <div className="bg-white rounded-3xl shadow-sm p-8 mt-8">

      <h2
        className="text-3xl font-bold mb-8"
        style={{ fontFamily: "Montserrat" }}
      >
        Additional Notes
      </h2>

      <textarea
        name="notes"
        value={formData.notes}
        onChange={handleChange}
        rows={5}
        placeholder="Example: Please call when you arrive, I'll collect after 16:00, leave at the gate, etc."
        className="w-full border rounded-xl px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-[#785900]"
      />

      <p className="text-sm text-gray-500 mt-3">
        Optional. Use this space to provide any special instructions regarding your order.
      </p>

    </div>
  );
}

export default OrderNotes;