import { useState } from "react";
import { useNavigate } from "react-router-dom";

import MainMenu from "../components/layout/MainMenu";

import CustomerForm from "../components/checkout/CustomerForm";
import DeliveryMethod from "../components/checkout/DeliveryMethod";
import AddressForm from "../components/checkout/AddressForm";
import OrderNotes from "../components/checkout/OrderNotes";
import OrderSummary from "../components/checkout/OrderSummary";

function Checkout() {
  const navigate = useNavigate();

  const [deliveryMethod, setDeliveryMethod] = useState("collection");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",

    street: "",
    suburb: "",
    city: "",
    postalCode: "",

    notes: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePlaceOrder = () => {
    console.log({
      customer: formData,
      deliveryMethod,
    });

    // Move to payment method selection
    navigate("/payment-method", {
      state: {
        customer: formData,
        deliveryMethod,
      },
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
            />

            <DeliveryMethod
              deliveryMethod={deliveryMethod}
              setDeliveryMethod={setDeliveryMethod}
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