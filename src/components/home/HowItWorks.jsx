import { ShoppingCart, PackageCheck, Truck } from "lucide-react";

const steps = [
  {
    id: 1,
    icon: ShoppingCart,
    title: "Choose Your Eggs",
    description:
      "Browse our selection of fresh eggs and add your preferred trays to your cart.",
  },
  {
    id: 2,
    icon: PackageCheck,
    title: "We Prepare Your Order",
    description:
      "We carefully inspect and package every order to ensure quality and DELI EGGS freshness.",
  },
  {
    id: 3,
    icon: Truck,
    title: "Fast Delivery",
    description:
      "Your order is delivered straight to your home or business, fresh and on time.",
  },
];

function HowItWorks() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">

          <span className="uppercase tracking-widest text-[#785900] font-semibold">
            How To Order
          </span>

          <h2
            className="text-4xl font-bold mt-3"
            style={{ fontFamily: "Montserrat" }}
          >
            Ordering Fresh Eggs Is Easy
          </h2>

          <p className="mt-5 text-gray-600 max-w-2xl mx-auto">
            Place your order in just a few simple steps and enjoy farm-fresh
            eggs delivered with care.
          </p>

        </div>

        <div className="grid gap-10 md:grid-cols-3">

          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.id}
                className="text-center bg-[#FFF8F2] rounded-3xl p-10 hover:shadow-xl transition duration-300"
              >

                <div className="w-20 h-20 mx-auto rounded-full bg-amber-100 flex items-center justify-center mb-6">

                  <Icon
                    size={36}
                    className="text-[#785900]"
                  />

                </div>

                <div className="text-sm font-bold text-[#785900] mb-2">
                  STEP {step.id}
                </div>

                <h3
                  className="text-2xl font-bold mb-4"
                  style={{ fontFamily: "Montserrat" }}
                >
                  {step.title}
                </h3>

                <p className="text-gray-600">
                  {step.description}
                </p>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}

export default HowItWorks;