import React, { useState } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { sendToWhatsApp } from "../../utils/whatsApp";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendToWhatsApp(formData);
  };

  return (
    <>
      {/* TOP GREEN CTA SECTION */}
      <section className="w-full bg-gradient-to-r from-green-600 to-green-400 text-white py-16 text-center">
        <h2 className="text-2xl md:text-3xl font-bold">STILL HAVE QUESTIONS?</h2>
        <p className="mt-2 opacity-90">
          Our expert team is ready to help you get started
        </p>

        <button
          className="mt-6 bg-white text-black px-6 py-3 rounded-full font-semibold shadow hover:opacity-90 transition"
          onClick={() => (window.location.href = "#contact")}
        >
          Contact Support →
        </button>
      </section>

      {/* MAIN CONTACT SECTION */}
      <section id="contact" className="bg-white py-24 px-6 md:px-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* LEFT SIDE */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">GET IN TOUCH</h2>
            <p className="text-gray-600 mb-10">
              Ready to start mining? Let’s discuss how we can help you succeed
            </p>

            <div className="space-y-6">

              {/* Phone */}
              <div className="flex items-start gap-4">
                <FaPhone className="text-green-600 text-2xl mt-1" />
                <div>
                  <p className="font-semibold">+49 941 20083376</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <FaEnvelope className="text-green-600 text-2xl mt-1" />
                <div>
                  <p className="font-semibold">office@cryptonite.at</p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-4">
                <FaMapMarkerAlt className="text-green-600 text-2xl mt-1" />
                <div>
                  <p className="font-semibold">Regensburg, Germany</p>
                </div>
              </div>

              {/* SOCIAL ICONS */}
              <div className="flex gap-4 mt-8 text-gray-700 text-xl">
                <i className="fab fa-twitter"></i>
                <i className="fab fa-facebook"></i>
                <i className="fab fa-instagram"></i>
                <i className="fab fa-youtube"></i>
              </div>

            </div>
          </div>

          {/* RIGHT SIDE — WHITE FORM BOX */}
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl p-10 shadow-xl border border-gray-100 space-y-6"
          >
            {/* Full Name */}
            <div>
              <label className="text-sm font-medium text-gray-600">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                onChange={handleChange}
                required
                className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium text-gray-600">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                required
                className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>

            {/* Message */}
            <div>
              <label className="text-sm font-medium text-gray-600">
                Message
              </label>
              <textarea
                rows="5"
                name="message"
                onChange={handleChange}
                className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 outline-none"
              ></textarea>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full py-3 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition"
            >
              Send Message →
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default ContactForm;
