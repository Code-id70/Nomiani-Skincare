export default function Contact() {
  return (
    <main className="flex-grow pt-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-headline-lg text-4xl text-on-surface mb-8">Contact Us</h1>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="p-6 rounded-2xl bg-surface-container-low border border-surface-container-high/50">
            <h3 className="font-headline-md text-2xl text-on-surface mb-4">Get in Touch</h3>
            <p className="font-body-sm text-sm text-on-surface-variant mb-4">
              Have a question about our products or need help with an order?
              Reach out to our team.
            </p>
            <p className="font-body-sm text-sm text-on-surface mb-2">
              <span className="font-semibold">Email:</span> hello@haloskin.co.za
            </p>
            <p className="font-body-sm text-sm text-on-surface mb-2">
              <span className="font-semibold">Phone:</span> +27 (0)82 555 3829
            </p>
            <p className="font-body-sm text-sm text-on-surface">
              <span className="font-semibold">Studio:</span> Woodstock, Cape Town, 7925
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-surface-container-low border border-surface-container-high/50">
            <h3 className="font-headline-md text-2xl text-on-surface mb-4">Studio Hours</h3>
            <p className="font-body-sm text-sm text-on-surface-variant mb-4">
              Visit us or reach out during business hours.
            </p>
            <p className="font-body-sm text-sm text-on-surface mb-2">
              <span className="font-semibold">Mon–Fri:</span> 09:00 – 17:00
            </p>
            <p className="font-body-sm text-sm text-on-surface mb-2">
              <span className="font-semibold">Sat:</span> 10:00 – 14:00
            </p>
            <p className="font-body-sm text-sm text-on-surface">
              <span className="font-semibold">Sun:</span> Closed
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
