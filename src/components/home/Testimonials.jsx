import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah M.",
    role: "Restaurant Owner",
    review:
      "DELI EGGS always delivers quality eggs on time. Our customers love the freshness and consistency.",
  },
  {
    id: 2,
    name: "David K.",
    role: "Family Customer",
    review:
      "Ordering is simple and the eggs are always fresh. I highly recommend DELI EGGS to anyone.",
  },
  {
    id: 3,
    name: "Emily T.",
    role: "Bakery Owner",
    review:
      "Reliable service, affordable prices, and excellent quality. We order every week.",
  },
];

function Testimonials() {
  return (
    <section className="py-24 bg-[#FFF8F2]">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">

          <span className="uppercase tracking-widest font-semibold text-[#785900]">
            Testimonials
          </span>

          <h2
            className="text-4xl font-bold mt-3"
            style={{ fontFamily: "Montserrat" }}
          >
            What Our Customers Say
          </h2>

          <p className="mt-5 text-gray-600 max-w-2xl mx-auto">
            Trusted by families, restaurants and local businesses.
          </p>

        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {testimonials.map((customer) => (

            <div
              key={customer.id}
              className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition"
            >

              <div className="flex mb-5">

                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    size={18}
                    fill="#FBBF24"
                    className="text-yellow-400"
                  />
                ))}

              </div>

              <p className="text-gray-600 leading-7">
                "{customer.review}"
              </p>

              <div className="mt-8">

                <div className="w-14 h-14 rounded-full bg-amber-200 flex items-center justify-center text-xl font-bold text-[#785900]">

                  {customer.name.charAt(0)}

                </div>

                <h3
                  className="mt-4 text-xl font-bold"
                  style={{ fontFamily: "Montserrat" }}
                >
                  {customer.name}
                </h3>

                <p className="text-gray-500">
                  {customer.role}
                </p>

              </div>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}

export default Testimonials;