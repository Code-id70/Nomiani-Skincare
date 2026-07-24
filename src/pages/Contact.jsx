import MainMenu from "../components/layout/MainMenu";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

function Contact() {
  return (
    <MainMenu>

      {/* Hero */}
      <section className="bg-[#FFF8F2] py-24">

        <div className="max-w-7xl mx-auto px-6 text-center">

          <span className="inline-block bg-amber-100 text-[#785900] px-5 py-2 rounded-full text-sm font-semibold mb-6">
            Contact DELI EGGS
          </span>

          <h1
            className="text-5xl md:text-6xl font-bold"
            style={{ fontFamily: "Montserrat" }}
          >
            We'd Love To
            <br />
            Hear From You
          </h1>

          <p className="max-w-2xl mx-auto mt-8 text-lg text-gray-600">
            Have a question, want to place a bulk order or need assistance?
            Get in touch with us.
          </p>

        </div>

      </section>

      {/* Contact Section */}

      <section className="py-24 bg-white">

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16">

          {/* Contact Details */}

          <div>

            <h2
              className="text-4xl font-bold mb-10"
              style={{ fontFamily: "Montserrat" }}
            >
              Contact Information
            </h2>

            <div className="space-y-8">

              <div className="flex gap-5">

                <div className="w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center">
                  <Phone className="text-[#785900]" />
                </div>

                <div>

                  <h3 className="font-bold text-lg">
                    Phone
                  </h3>

                  <p className="text-gray-600">
                    +27 XX XXX XXXX
                  </p>

                </div>

              </div>

              <div className="flex gap-5">

                <div className="w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center">
                  <Mail className="text-[#785900]" />
                </div>

                <div>

                  <h3 className="font-bold text-lg">
                    Email
                  </h3>

                  <p className="text-gray-600">
                    orders@delieggs.co.za
                  </p>

                </div>

              </div>

              <div className="flex gap-5">

                <div className="w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center">
                  <MapPin className="text-[#785900]" />
                </div>

                <div>

                  <h3 className="font-bold text-lg">
                    Collection Address
                  </h3>

                  <p className="text-gray-600">
                    123 Main Street
                    <br />
                    Mamelodi East
                    <br />
                    Pretoria
                    <br />
                    0122
                  </p>

                </div>

              </div>

              <div className="flex gap-5">

                <div className="w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center">
                  <Clock className="text-[#785900]" />
                </div>

                <div>

                  <h3 className="font-bold text-lg">
                    Business Hours
                  </h3>

                  <p className="text-gray-600">
                    Monday - Friday
                    <br />
                    08:00 - 17:00
                    <br /><br />
                    Saturday
                    <br />
                    08:00 - 13:00
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* Contact Form */}

          <div className="bg-[#FFF8F2] rounded-3xl p-10 shadow-sm">

            <h2
              className="text-3xl font-bold mb-8"
              style={{ fontFamily: "Montserrat" }}
            >
              Send Us a Message
            </h2>

            <form className="space-y-6">

              <input
                type="text"
                placeholder="Full Name"
                className="w-full border rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#785900]"
              />

              <input
                type="email"
                placeholder="Email Address"
                className="w-full border rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#785900]"
              />

              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full border rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#785900]"
              />

              <textarea
                rows="6"
                placeholder="Your Message..."
                className="w-full border rounded-xl px-5 py-4 resize-none focus:outline-none focus:ring-2 focus:ring-[#785900]"
              />

              <button
                type="submit"
                className="w-full bg-[#785900] text-white py-4 rounded-xl hover:bg-[#5d4400] transition font-semibold"
              >
                Send Message
              </button>

            </form>

          </div>

        </div>

      </section>

    </MainMenu>
  );
}

export default Contact;