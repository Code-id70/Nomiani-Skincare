import { Link } from "react-router-dom";

function CTA() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">

        <div className="bg-[#7C3AED] rounded-[40px] p-12 lg:p-20 text-center text-white">

          <h2
            className="text-4xl lg:text-5xl font-bold"
            style={{ fontFamily: "Montserrat" }}
          >
            Radiant Skin Delivered
            <br />
            Straight To Your Door
          </h2>

          <p className="mt-6 text-lg text-violet-100 max-w-2xl mx-auto">
            Order premium skincare today and enjoy quality,
            efficacy, and reliable delivery.
          </p>

          <Link
            to="/shop"
            className="inline-block mt-10 bg-white text-[#7C3AED] px-10 py-4 rounded-xl font-bold hover:scale-105 transition"
          >
            Shop Now
          </Link>

        </div>

      </div>
    </section>
  );
}

export default CTA;

