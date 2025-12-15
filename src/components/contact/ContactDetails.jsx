import React from "react";
import { FiClock, FiHeadphones, FiMapPin } from "react-icons/fi";

const ContactDetails = () => {
  return (
    <section className="w-full bg-[#f8fbf8] py-16 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT : FORM */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl p-6 md:p-8">
          <h3 className="text-xl font-semibold mb-1">Send us a Message</h3>
          <p className="text-gray-500 text-sm mb-6">
            Fill out the form and we’ll get back to you within 24 hours.
          </p>

          <form className="space-y-5">
            {/* Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="John"
                  className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="text-sm font-medium">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Doe"
                  className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                />
              </div>
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="text-sm font-medium">
                  Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="+1234567890"
                  className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                />
              </div>
            </div>

            {/* Subject */}
            <div>
              <label className="text-sm font-medium">Subject</label>
              <select className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-green-500">
                <option>Select a topic</option>
                <option>Mining Hardware</option>
                <option>Hosting</option>
                <option>Support</option>
              </select>
            </div>

            {/* Message */}
            <div>
              <label className="text-sm font-medium">Message</label>
              <textarea
                rows="4"
                placeholder="Tell us about your mining needs..."
                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
              />
            </div>

            {/* Button */}
            <button className="w-full bg-green-500 text-white py-2.5 rounded-md text-sm font-semibold hover:bg-green-600 transition">
              Send Message
            </button>
          </form>
        </div>

        {/* RIGHT : INFO */}
        <div className="space-y-6">

          {/* Business Hours */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <FiClock className="text-green-500" />
              <h4 className="font-semibold">Business Hours</h4>
            </div>

            <div className="text-sm text-gray-600 space-y-1">
              <div className="flex justify-between">
                <span>Monday – Friday</span>
                <span>9:00 AM – 6:00 PM PST</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday</span>
                <span>10:00 AM – 4:00 PM PST</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday</span>
                <span>Closed</span>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 bg-green-100 text-green-700 px-3 py-2 rounded-md text-sm">
              <FiHeadphones />
              24/7 Technical Support for existing customers
            </div>
          </div>

          {/* Locations */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <FiMapPin className="text-green-500" />
              <h4 className="font-semibold">Our Locations</h4>
            </div>

            <div className="text-sm text-gray-600 space-y-4">
              <div>
                <p className="font-medium text-black">San Francisco</p>
                <p>1234 Blockchain Ave, Suite 500</p>
                <p>California, 94102</p>
                <p>United States</p>
              </div>

              <div>
                <p className="font-medium text-black">Reykjavík</p>
                <p>Laugavegur 28</p>
                <p>101 Reykjavík</p>
                <p>Iceland</p>
              </div>

              <div>
                <p className="font-medium text-black">Singapore</p>
                <p>1 Marina Boulevard, #20-01</p>
                <p>Singapore 018989</p>
                <p>Singapore</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactDetails;
