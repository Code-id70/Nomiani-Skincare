import MainMenu from "../components/layout/MainMenu";
import { Egg, Truck, BadgeDollarSign, ShieldCheck, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function About() {
  return (
    <MainMenu>

      {/* Hero */}
      <section className="bg-[#FFF8F2] py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">

          <span className="inline-block bg-amber-100 text-[#785900] px-5 py-2 rounded-full text-sm font-semibold mb-6">
            About DELI EGGS
          </span>

          <h1
            className="text-5xl md:text-6xl font-bold text-gray-900"
            style={{ fontFamily: "Montserrat" }}
          >
            Fresh Eggs.
            <br />
            Reliable Service.
          </h1>

          <p className="max-w-3xl mx-auto mt-8 text-lg text-gray-600 leading-8">
            DELI EGGS supplies fresh, quality eggs to households,
            restaurants and businesses while making ordering simple,
            affordable and convenient.
          </p>

        </div>
      </section>

      {/* Story */}
      <section className="py-24 bg-white">

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

          <div className="bg-amber-50 rounded-3xl h-[450px] flex items-center justify-center">
            <span className="text-gray-400 text-xl">
              Business Image
            </span>
          </div>

          <div>

            <h2
              className="text-4xl font-bold mb-8"
              style={{ fontFamily: "Montserrat" }}
            >
              Our Story
            </h2>

            <p className="text-gray-600 leading-8 mb-6">
              DELI EGGS was founded with one simple goal: provide fresh,
              affordable eggs backed by friendly customer service.
            </p>

            <p className="text-gray-600 leading-8 mb-6">
              Whether you're buying for your family, your shop or your
              restaurant, we make it easy to order quality eggs with confidence.
            </p>

            <p className="text-gray-600 leading-8">
              We believe every customer deserves reliable service, quality
              products and honest pricing.
            </p>

          </div>

        </div>

      </section>

      {/* Why Choose Us */}

      <section className="py-24 bg-[#FFF8F2]">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-16">

            <h2
              className="text-4xl font-bold"
              style={{ fontFamily: "Montserrat" }}
            >
              Why Choose DELI EGGS?
            </h2>

            <p className="text-gray-600 mt-4">
              Fresh products, honest pricing and customer satisfaction are at
              the heart of everything we do.
            </p>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

            <div className="bg-white rounded-3xl p-8 text-center shadow-sm hover:shadow-xl transition">
              <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-6">
                <Egg className="text-[#785900]" size={32} />
              </div>

              <h3 className="text-xl font-bold mb-3">
                Farm Fresh
              </h3>

              <p className="text-gray-600">
                Fresh quality eggs selected for every customer.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 text-center shadow-sm hover:shadow-xl transition">
              <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-6">
                <Truck className="text-[#785900]" size={32} />
              </div>

              <h3 className="text-xl font-bold mb-3">
                Reliable Delivery
              </h3>

              <p className="text-gray-600">
                Fast and dependable delivery to your location.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 text-center shadow-sm hover:shadow-xl transition">
              <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-6">
                <BadgeDollarSign className="text-[#785900]" size={32} />
              </div>

              <h3 className="text-xl font-bold mb-3">
                Affordable Prices
              </h3>

              <p className="text-gray-600">
                Competitive prices without compromising on quality.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 text-center shadow-sm hover:shadow-xl transition">
              <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="text-[#785900]" size={32} />
              </div>

              <h3 className="text-xl font-bold mb-3">
                Trusted Quality
              </h3>

              <p className="text-gray-600">
                Eggs you can trust every single time.
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* Mission & Vision */}

      <section className="py-24 bg-white">

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-10">

          <div className="bg-[#FFF8F2] rounded-3xl p-10">

            <h2
              className="text-3xl font-bold mb-6"
              style={{ fontFamily: "Montserrat" }}
            >
              Our Mission
            </h2>

            <p className="text-gray-600 leading-8">
              To provide households and businesses with fresh, affordable
              eggs while delivering exceptional customer service and
              making ordering simple and convenient.
            </p>

          </div>

          <div className="bg-[#785900] text-white rounded-3xl p-10">

            <h2
              className="text-3xl font-bold mb-6"
              style={{ fontFamily: "Montserrat" }}
            >
              Our Vision
            </h2>

            <p className="leading-8 text-amber-100">
              To become one of South Africa's trusted egg suppliers,
              recognised for quality products, excellent service and
              dependable delivery.
            </p>

          </div>

        </div>

      </section>

      {/* CTA */}

      <section className="py-24 bg-[#FFF8F2]">

        <div className="max-w-4xl mx-auto text-center px-6">

          <h2
            className="text-5xl font-bold mb-6"
            style={{ fontFamily: "Montserrat" }}
          >
            Ready to Order Fresh Eggs?
          </h2>

          <p className="text-gray-600 text-lg mb-10">
            Browse our range of fresh eggs and place your order in just a few clicks.
          </p>

          <Link
            to="/shop"
            className="inline-flex items-center gap-3 bg-[#785900] text-white px-8 py-4 rounded-xl hover:bg-[#5d4400] transition"
          >
            Shop Now
            <ArrowRight size={20} />
          </Link>

        </div>

      </section>

    </MainMenu>
  );
}

export default About;