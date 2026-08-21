import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import MainMenu from "../components/layout/MainMenu";

import CustomerForm from "../components/checkout/CustomerForm";
import DeliveryMethod from "../components/checkout/DeliveryMethod";
import AddressForm from "../components/checkout/AddressForm";
import OrderNotes from "../components/checkout/OrderNotes";
import OrderSummary from "../components/checkout/OrderSummary";

function Checkout() {
  const navigate = useNavigate();

  const [deliveryMethod, setDeliveryMethod] = useState(() => {
    try {
      const saved = sessionStorage.getItem("checkoutData");
      if (saved) return JSON.parse(saved).deliveryMethod || "";
    } catch {}
    return "";
  });

  const [formData, setFormData] = useState(() => {
    try {
      const saved = sessionStorage.getItem("checkoutData");
      if (saved) return JSON.parse(saved).customer || {
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        street: "",
        suburb: "",
        city: "",
        postalCode: "",
        notes: "",
      };
    } catch {}
    return {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      street: "",
      suburb: "",
      city: "",
      postalCode: "",
      notes: "",
    };
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";

    if (!deliveryMethod) newErrors.deliveryMethod = "Please select a delivery method";

    if (deliveryMethod === "delivery") {
      if (!formData.street.trim()) newErrors.street = "Street address is required";
      if (!formData.suburb.trim()) newErrors.suburb = "Suburb is required";
      if (!formData.city.trim()) newErrors.city = "City is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const firstError = document.querySelector("[data-error]");
      if (firstError) {
        firstError.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [errors]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePlaceOrder = () => {
    if (!validate()) return;

    const checkoutData = {
      customer: formData,
      deliveryMethod,
    };

    sessionStorage.setItem("checkoutData", JSON.stringify(checkoutData));

    navigate("/payment-method", {
      state: checkoutData,
    });
  };

  return (
    <MainMenu>
      <div className="max-w-7xl mx-auto px-6 py-20">

        {/* Page Heading */}

        <div className="mb-12">

          <h1
            className="text-5xl font-bold"
            style={{ fontFamily: "Montserrat" }}
          >
            Checkout
          </h1>

          <p className="text-gray-500 mt-3">
            Complete your order below.
          </p>

        </div>

        <div className="grid lg:grid-cols-3 gap-10">

          {/* Left Side */}

          <div className="lg:col-span-2">

            <CustomerForm
              formData={formData}
              handleChange={handleChange}
              errors={errors}
            />

            <DeliveryMethod
              deliveryMethod={deliveryMethod}
              setDeliveryMethod={setDeliveryMethod}
              errors={errors}
            />

            {/* Collection */}

            {deliveryMethod === "collection" && (

              <div className="bg-white rounded-3xl shadow-sm p-8 mt-8">

                <h2
                  className="text-3xl font-bold mb-6"
                  style={{ fontFamily: "Montserrat" }}
                >
                  Collection Address
                </h2>

                <div className="space-y-2 text-gray-700">

                  <p className="font-semibold text-lg">
                    DELI EGGS
                  </p>

                  <p>
                    123 Main Street
                  </p>

                  <p>
                    Mamelodi East
                  </p>

                  <p>
                    Pretoria
                  </p>

                  <p>
                    0122
                  </p>

                </div>

                <div className="mt-6">

                  <h3 className="font-semibold mb-2">
                    Collection Hours
                  </h3>

                  <p>Monday - Friday: 08:00 - 17:00</p>

                  <p>Saturday: 08:00 - 13:00</p>

                </div>

              </div>

            )}

            {/* Delivery */}

            {deliveryMethod === "delivery" && (

              <AddressForm
                formData={formData}
                handleChange={handleChange}
                errors={errors}
              />

            )}

            <OrderNotes
              formData={formData}
              handleChange={handleChange}
            />

          </div>

          {/* Right Side */}

          <OrderSummary
            deliveryMethod={deliveryMethod}
            onPlaceOrder={handlePlaceOrder}
          />

        </div>

      </div>
    </MainMenu>
  );
}

export default Checkout;