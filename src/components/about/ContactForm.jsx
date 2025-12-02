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
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendToWhatsApp(formData);
  };

  return (
    <section className="bg-white text-black py-24 px-6 md:px-16">
      
      {/* Section Heading */}
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold relative inline-block">
          Contact Us
          <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-(--primary-color) rounded-full"></span>
        </h2>
        <p className="mt-4 text-gray-600 text-lg">
          Have a question? We’re here to help with anything related to mining, hosting, or hardware support.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* LEFT — Modern Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-gray-200 shadow-lg rounded-2xl p-10 space-y-6"
        >
          {/* Two Inputs Side by Side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-gray-600">First Name</label>
              <input
                type="text"
                name="firstName"
                required
                onChange={handleChange}
                className="mt-1 w-full p-3 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-(--primary-color) outline-none"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">Last Name</label>
              <input
                type="text"
                name="lastName"
                required
                onChange={handleChange}
                className="mt-1 w-full p-3 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-(--primary-color) outline-none"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              className="mt-1 w-full p-3 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-(--primary-color) outline-none"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="text-sm font-medium text-gray-600">Phone</label>
            <input
              type="text"
              name="phone"
              onChange={handleChange}
              className="mt-1 w-full p-3 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-(--primary-color) outline-none"
            />
          </div>

          {/* Message */}
          <div>
            <label className="text-sm font-medium text-gray-600">Message</label>
            <textarea
              rows="5"
              name="message"
              onChange={handleChange}
              className="mt-1 w-full p-3 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-(--primary-color) outline-none"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-(--primary-color) text-black font-semibold rounded-full hover:bg-(--primary-color) transition"
          >
            Submit
          </button>
        </form>

        {/* RIGHT — Contact Info Cards */}
        <div className="space-y-6">

          {/* Card 1 */}
          <div className="bg-white border border-gray-200 shadow-md rounded-2xl p-6 flex gap-4 items-start">
            <FaMapMarkerAlt className="text-black text-3xl" />
            <div>
              <h4 className="font-semibold text-lg">Germany Office</h4>
              <p className="text-gray-600 mt-1">Cryptonite, Germany</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-gray-200 shadow-md rounded-2xl p-6 flex gap-4 items-start">
            <FaMapMarkerAlt className="text-black text-3xl" />
            <div>
              <h4 className="font-semibold text-lg">Liwa Hosting Facility</h4>
              <p className="text-gray-600 mt-1">
                General Transport Establishment Building, Al Jubailah, Liwa, Germany
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-gray-200 shadow-md rounded-2xl p-6 flex gap-4 items-start">
            <FaMapMarkerAlt className="text-black text-3xl" />
            <div>
              <h4 className="font-semibold text-lg">Ethiopia Facility</h4>
              <p className="text-gray-600 mt-1">WM92+VCQ Alem Gena, Ethiopia</p>
            </div>
          </div>

          {/* Email */}
          <div className="bg-white border border-gray-200 shadow-md rounded-2xl p-6 flex gap-4 items-start">
            <FaEnvelope className="text-(--primary-color)text-3xl" />
            <div>
              <h4 className="font-semibold text-lg">Email</h4>
              <p className="text-gray-600 mt-1">cryptonite@cryptonite.com</p>
            </div>
          </div>

          {/* Phone */}
          <div className="bg-white border border-gray-200 shadow-md rounded-2xl p-6 flex gap-4 items-start">
            <FaPhone className="text-black text-3xl" />
            <div>
              <h4 className="font-semibold text-lg">Phone</h4>
              <p className="text-gray-600 mt-1">+44 123456789</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactForm;
