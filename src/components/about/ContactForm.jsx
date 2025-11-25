import React, { useState } from "react";
import { FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa";
import { sendToWhatsApp } from "../../utils/whatsApp";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "+44",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendToWhatsApp(formData); // 🔥 CALL WHATSAPP FUNCTION
  };

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
          <form className="space-y-5" onSubmit={handleSubmit}>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              className="w-full p-3 rounded-lg bg-[#0b1c36] border border-[#14324f] text-white outline-none"
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              className="w-full p-3 rounded-lg bg-[#0b1c36] border border-[#14324f] text-white outline-none"
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full p-3 rounded-lg bg-[#0b1c36] border border-[#14324f] text-white outline-none"
              onChange={handleChange}
            />

            <input
              type="text"
              name="phone"
              placeholder="+44"
              className="w-full p-3 rounded-lg bg-[#0b1c36] border border-[#14324f] text-white outline-none"
              onChange={handleChange}
            />

            <textarea
              rows="5"
              name="message"
              placeholder="Message"
              className="w-full p-3 rounded-lg bg-[#0b1c36] border border-[#14324f] text-white outline-none"
              onChange={handleChange}
            ></textarea>

            <button
              type="submit"
              className="w-full py-3 bg-(--primary-color) text-black font-semibold rounded-full hover:opacity-90"
            >
              Send Message via WhatsApp
            </button>
          </form>

          {/* RIGHT CONTACT DETAILS */}
          <div className="space-y-8">

            <div className="flex items-start gap-3">
              <FaMapMarkerAlt className="text-(--primary-color) text-lg mt-1" />
              <p className="text-[#d1d7e0] leading-relaxed">
                Cryptonite, Germany
              </p>
            </div>

            <div className="flex items-start gap-3">
              <FaMapMarkerAlt className="text-(--primary-color) text-lg mt-1" />
              <p className="text-[#d1d7e0] leading-relaxed">
                General Transport Establishment Building, <br />
                Al Jubailah, Liwa, Germany
              </p>
            </div>

            <div className="flex items-start gap-3">
              <FaMapMarkerAlt className="text-(--primary-color) text-lg mt-1" />
              <p className="text-[#d1d7e0] leading-relaxed">
                WM92+VCQ Alem Gena, Ethiopia
              </p>
            </div>

            <div className="flex items-start gap-3">
              <FaEnvelope className="text-(--primary-color) text-lg mt-1" />
              <p className="text-[#d1d7e0]">cryptonite@cryptonite.com</p>
            </div>

            <div className="flex items-start gap-3">
              <FaPhone className="text-(--primary-color) text-lg mt-1" />
              <p className="text-[#d1d7e0]">+44123456789</p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
