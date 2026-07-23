import { Link } from "react-router-dom";

function CTA() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">

        <div className="bg-[#785900] rounded-[40px] p-12 lg:p-20 text-center text-white">

          <h2
            className="text-4xl lg:text-5xl font-bold"
            style={{ fontFamily: "Montserrat" }}
          >
            Fresh Eggs Delivered
            <br />
            Straight To Your Door
          </h2>

          <p className="mt-6 text-lg text-amber-100 max-w-2xl mx-auto">
            Order premium farm-fresh eggs today and enjoy quality,
            affordability, and reliable delivery.
          </p>

          <Link
            to="/shop"
            className="inline-block mt-10 bg-white text-[#785900] px-10 py-4 rounded-xl font-bold hover:scale-105 transition"
          >
            Shop Now
          </Link>

        </div>

      </div>
    </section>
  );
}

export default CTA;