import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="bg-[#FFF8F2]">
      <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Side */}
          <div>

            <span className="inline-block bg-amber-100 text-[#785900] px-4 py-2 rounded-full text-sm font-semibold mb-6">
              🥚 Farm Fresh Every Day
            </span>

            <h1
              className="text-5xl lg:text-7xl font-bold leading-tight text-[#201B11]"
              style={{ fontFamily: "Montserrat" }}
            >
              Fresh Eggs
              <br />
              Delivered
              <br />
              To Your Door.
            </h1>

            <p className="mt-8 text-lg text-gray-600 max-w-xl leading-8">
              Premium farm-fresh eggs collected daily and delivered with care.
              Quality you can trust for your family and your business.
            </p>

            <div className="flex flex-wrap gap-4 mt-10">

              <Link
                to="/shop"
                className="bg-[#785900] hover:bg-[#624800] text-white px-8 py-4 rounded-xl font-semibold transition"
              >
                Shop Now
              </Link>

              <Link
                to="/about"
                className="border border-[#785900] text-[#785900] px-8 py-4 rounded-xl font-semibold hover:bg-amber-50 transition"
              >
                Learn More
              </Link>

            </div>

          </div>

          {/* Right Side */}
          <div className="relative">

            <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">

              <img
                src="https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&w=900&q=80"
                alt="Fresh eggs"
                className="w-full h-full object-cover"
              />

            </div>

            {/* Floating Card */}

            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-5">

              <p className="text-sm text-gray-500">
                Today's Collection
              </p>

              <h3
                className="text-3xl font-bold text-[#785900]"
                style={{ fontFamily: "Montserrat" }}
              >
                Fresh
              </h3>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Hero;