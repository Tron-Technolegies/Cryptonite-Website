import React from "react";
import { FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa";

const ContactForm = () => {
  return (
    <section className="bg-[#000000] text-white py-20 px-6 md:px-16">

      <div className="max-w-6xl mx-auto border border-(--primary-color) rounded-xl p-8 md:p-12">

        <h2 className="text-3xl md:text-4xl font-bold text-(--primary-color)">
          Contact Us
        </h2>

        <p className="mt-3 text-[#d1d7e0]">
          Thank you for getting in touch! <br />
          Kindly fill the form, have a great day!
        </p>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* LEFT FORM */}
          <form className="space-y-5">
            <input
              type="text"
              placeholder="First Name"
              className="w-full p-3 rounded-lg bg-[#0b1c36] border border-[#14324f] text-white outline-none"
            />

            <input
              type="text"
              placeholder="Last Name"
              className="w-full p-3 rounded-lg bg-[#0b1c36] border border-[#14324f] text-white outline-none"
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 rounded-lg bg-[#0b1c36] border border-[#14324f] text-white outline-none"
            />

            <input
              type="text"
              placeholder="+971"
              className="w-full p-3 rounded-lg bg-[#0b1c36] border border-[#14324f] text-white outline-none"
            />

            <textarea
              rows="5"
              placeholder="Message"
              className="w-full p-3 rounded-lg bg-[#0b1c36] border border-[#14324f] text-white outline-none"
            ></textarea>

            <button
              type="submit"
              className="w-full py-3 bg-(--primary-color) text-black font-semibold rounded-full hover:opacity-90"
            >
              Send Message
            </button>
          </form>

          {/* RIGHT CONTACT DETAILS */}
          <div className="space-y-8">

            <div className="flex items-start gap-3">
              <FaMapMarkerAlt className="text-(--primary-color) text-lg mt-1" />
              <p className="text-[#d1d7e0] leading-relaxed">
                Plot 122 Ad Doja 1 St - Musaffah - M40 - Abu Dhabi <br />
                United Arab Emirates
              </p>
            </div>

            <div className="flex items-start gap-3">
              <FaMapMarkerAlt className="text-(--primary-color) text-lg mt-1" />
              <p className="text-[#d1d7e0] leading-relaxed">
                Saif Thamer General Transport Establishment Building, <br />
                Al Jubailah, Liwa, Abu Dhabi
              </p>
            </div>

            <div className="flex items-start gap-3">
              <FaMapMarkerAlt className="text-(--primary-color) text-lg mt-1" />
              <p className="text-[#d1d7e0] leading-relaxed">
                WM92+VCQ Alem Gena, Ethiopia
              </p>
            </div>

            <div className="flex items-start gap-3">
              <FaEnvelope className="text-(--primary-color)  text-lg mt-1" />
              <p className="text-[#d1d7e0]">Rizwan@dahabminers.ae</p>
            </div>

            <div className="flex items-start gap-3">
              <FaPhone className="text-(--primary-color)  text-lg mt-1" />
              <p className="text-[#d1d7e0]">+971509669623</p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default ContactForm;
