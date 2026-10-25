function OrderNotes({ formData, handleChange }) {
  return (
    <div className="bg-surface-container-lowest rounded-2xl shadow-sm p-8 mt-8">

      <h2
        className="font-headline-sm text-headline-sm text-on-surface tracking-tight mb-6"
      >
        Additional Notes
      </h2>

      <p className="font-label-sm text-label-sm text-on-surface-variant mt-3">
        Optional. Use this space to provide any special instructions regarding your order.
      </p>

      <textarea
        name="notes"
        value={formData.notes}
        onChange={handleChange}
        rows={5}
        placeholder="Example: Please call when you arrive, I'll collect after 16:00, leave at the gate, etc."
        className="w-full bg-surface-container-low rounded-2xl border border-surface-container-highest px-4 py-3 font-body-md text-body-md text-on-surface resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
      />

    </div>
  );
}

export default OrderNotes;

