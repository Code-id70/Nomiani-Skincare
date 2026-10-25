import { Flower, MessageCircle, CheckCircle } from "lucide-react";

const steps = [
  {
    number: "01",
    color: "primary",
    icon: Flower,
    title: "Choose Your Products",
    description:
      "Browse our botanical collection and add your favorites to your personal ritual cart.",
  },
  {
    number: "02",
    color: "secondary",
    icon: MessageCircle,
    title: "Send Order via WhatsApp",
    description:
      "Tap checkout; your order summary and delivery details open instantly in WhatsApp with our team.",
  },
  {
    number: "03",
    color: "surface-variant",
    icon: CheckCircle,
    title: "We Deliver to You",
    description:
      "We confirm your order, handcraft your package, and courier fresh to your door nationwide.",
  },
];

const stepColors = {
  primary: { bg: "bg-primary-fixed", text: "text-on-primary-fixed" },
  secondary: { bg: "bg-secondary-fixed", text: "text-on-secondary-fixed" },
  "surface-variant": { bg: "bg-surface-variant", text: "text-on-surface" },
};

export default function HowToOrder() {
  return (
    <section className="px-4 py-8 bg-surface-container-low">
      <div className="text-center mb-6">
        <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-semibold">
          How To Order
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {steps.map((step) => {
          const Icon = step.icon;
          const { bg, text } = stepColors[step.color];
          return (
            <div key={step.number} className="flex items-start gap-3.5 p-4 rounded-2xl bg-surface-container-lowest shadow-sm">
              <div className={`w-10 h-10 rounded-full shrink-0 font-bold font-label-md flex items-center justify-center ${bg} ${text}`}>
                {step.number}
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <Icon className={`text-[18px] ${
                    step.color === "primary"
                      ? "text-primary"
                      : step.color === "secondary"
                      ? "text-secondary"
                      : "text-tertiary"
                  }`} />
                  <h3 className="font-label-lg text-label-lg font-semibold text-on-surface">
                    {step.title}
                  </h3>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
