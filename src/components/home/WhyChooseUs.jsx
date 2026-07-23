import {
  Egg,
  Truck,
  ShieldCheck,
  Clock3,
} from "lucide-react";

const features = [
  {
    icon: Egg,
    title: "Farm Fresh",
    description:
      "Collected daily to ensure every tray reaches you fresh.",
  },
  {
    icon: ShieldCheck,
    title: "Quality Guaranteed",
    description:
      "Carefully inspected before delivery.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description:
      "Reliable delivery straight to your doorstep.",
  },
  {
    icon: Clock3,
    title: "Always Available",
    description:
      "Order whenever you need fresh eggs.",
  },
];

function WhyChooseUs() {
  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">

          <span className="text-[#785900] font-semibold uppercase tracking-wider">
            Why Choose Us
          </span>

          <h2
            className="text-4xl font-bold mt-3"
            style={{ fontFamily: "Montserrat" }}
          >
            Fresh Eggs You Can Trust
          </h2>

          <p className="mt-5 text-gray-600 max-w-2xl mx-auto">
          We are committed to delivering premium-quality eggs with
          reliable service and exceptional DELI EGGS freshness.
          </p>

        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-2xl border border-amber-100 bg-[#FFF8F2] p-8 hover:shadow-xl transition duration-300"
              >
                <div className="w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center mb-6">
                  <Icon
                    size={28}
                    className="text-[#785900]"
                  />
                </div>

                <h3
                  className="text-xl font-bold mb-3"
                  style={{ fontFamily: "Montserrat" }}
                >
                  {feature.title}
                </h3>

                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;