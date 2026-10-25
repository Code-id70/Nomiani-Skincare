import { ShoppingCart, PackageCheck, Truck } from "lucide-react";

const steps = [
  {
    id: 1,
    icon: ShoppingCart,
    title: "Choose Your Routine",
    description:
      "Browse our selection of clean skincare and add your favourites to your cart.",
  },
  {
    id: 2,
    icon: PackageCheck,
    title: "We Prepare Your Order",
    description:
      "We carefully inspect and package every order to ensure quality and Nomiani Skincare freshness.",
  },
  {
    id: 3,
    icon: Truck,
    title: "Fast Delivery",
    description:
      "Your order is delivered straight to your door, fresh and on time.",
  },
];

function HowItWorks() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">

          <span className="uppercase tracking-widest text-[#7C3AED] font-semibold">
            How To Order
          </span>

          <h2
            className="text-4xl font-bold mt-3"
            style={{ fontFamily: "Montserrat" }}
          >
            Ordering Skincare Is Easy
          </h2>

        </div>

        <div className="grid gap-10 md:grid-cols-3">

          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.id}
                className="text-center bg-[#FFF8F2] rounded-3xl p-10 hover:shadow-xl transition duration-300"
              >

                <div className="w-20 h-20 mx-auto rounded-full bg-violet-100 flex items-center justify-center mb-6">

                  <Icon
                    size={36}
                    className="text-[#7C3AED]"
                  />

                </div>

                <div className="text-sm font-bold text-[#7C3AED] mb-2">
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

