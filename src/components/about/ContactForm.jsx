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
      {/* TOP CTA BANNER */}
      <section className="w-full bg-black py-24 flex justify-center px-4">
        <div
          className="
            relative w-full max-w-4xl 
            rounded-3xl 
            p-14 
            text-center 
            overflow-hidden
            border border-white/10
            bg-[#0a0a0a]/40
            backdrop-blur-2xl
          "
        >
          {/* BLURRED GRADIENT BACKGROUND */}
          <div
            className="
              absolute inset-0 
              bg-[radial-gradient(circle_at_25%_30%,#ffffff90,#000000_70%)]
              opacity-70
              blur-[60px]
            "
          ></div>

          {/* CONTENT */}
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-semibold text-white">
              Still Have Questions?
            </h2>

            <p className="text-gray-300 mt-2 text-sm md:text-base">
              Our expert team is ready to help you get started
            </p>

            <button
              onClick={() => (window.location.href = "#contact")}
              className="
                mt-6 
                bg-white text-black 
                px-8 py-2.5 
                rounded-full 
                font-semibold 
                shadow 
                hover:opacity-90 
                transition
              "
            >
              Get’s Started
            </button>
          </div>
        </div>
      </section>

      {/* MAIN CONTACT SECTION */}
      <section id="contact" className="bg-white py-28 px-6 md:px-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">

          {/* LEFT SIDE */}
          <div>
            <h2 className="text-3xl font-bold mb-4 tracking-wide">
              GET IN TOUCH
            </h2>

            <p className="text-gray-600 mb-10">
              Ready to start mining? Let’s discuss how we can help you succeed
            </p>

            <div className="space-y-8">

              {/* Phone */}
              <div className="flex items-start gap-4">
                <FaPhone className="text-black text-xl mt-1" />
                <p className="font-semibold">+436802442479</p>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <FaEnvelope className="text-black text-xl mt-1" />
                <p className="font-semibold">office@cryptonite.at</p>
              </div>

              {/* Location */}
              <div className="flex items-start gap-4">
                <FaMapMarkerAlt className="text-black text-xl mt-1" />
                <p className="font-semibold">Austria</p>
              </div>

              {/* Social Icons */}
              <div className="flex gap-5 mt-6 text-gray-800 text-xl">
                <i className="fab fa-twitter"></i>
                <i className="fab fa-facebook"></i>
                <i className="fab fa-instagram"></i>
                <i className="fab fa-youtube"></i>
              </div>

            </div>
          </div>

          {/* RIGHT SIDE — FORM */}
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Full Name */}
            <div>
              <label className="text-sm font-medium text-gray-600">Full Name</label>
              <input
                type="text"
                name="fullName"
                onChange={handleChange}
                required
                className="
                  mt-1 w-full p-3 
                  border border-gray-200 
                  rounded-md 
                  bg-[#f8fdf8]
                  focus:ring-2 focus:ring-green-500 
                  outline-none
                "
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium text-gray-600">Email Address</label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                required
                className="
                  mt-1 w-full p-3 
                  border border-gray-200 
                  rounded-md 
                  bg-[#f8fdf8]
                  focus:ring-2 focus:ring-green-500 
                  outline-none
                "
              />
            </div>

            {/* Message */}
            <div>
              <label className="text-sm font-medium text-gray-600">Message</label>
              <textarea
                rows="5"
                name="message"
                onChange={handleChange}
                className="
                  mt-1 w-full p-3 
                  border border-gray-200 
                  rounded-md 
                  bg-[#f8fdf8]
                  focus:ring-2 focus:ring-green-500 
                  outline-none
                "
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="
                w-full py-3 
                bg-green-600 
                text-white 
                font-semibold 
                rounded-full 
                hover:bg-green-700 
                transition
              "
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
