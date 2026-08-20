import { Link } from "react-router-dom";
import heroBg from "../../assets/images/background-cover.jpg"; // update path to your image
// import logo from "../../assets/logo/logo.jpeg";

function Hero() {
  return (
    <section className="relative bg-[#FFF8F2] overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center blur-xs opacity-80"
        style={{ backgroundImage: `url(${heroBg})` }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-3 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-10 items-center">

          {/* Left Side */}
          <div>

            <h1
              className="text-5xl lg:text-7xl font-bold leading-tight text-[#201B11]"
              style={{ fontFamily: "Montserrat" }}
            >
              Where your
              <br />
              breakfast
              <br />
              starts
            </h1>

            <div className="flex flex-wrap gap-4 mt-10">

              <Link
                to="/shop"
                className="bg-[#785900] hover:bg-[#624800] text-white px-8 py-4 rounded-xl font-semibold transition"
              >
                Shop Now
              </Link>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;