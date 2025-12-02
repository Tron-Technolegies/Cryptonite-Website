import React, { useState } from "react";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  // Optimized compressed image URLs (faster loading)
  const images = [
    "https://img.freepik.com/premium-photo/modern-office-space-with-employees-working-bitcoin-pro-crypto-concept-trending-background-photo_1142283-80303.jpg",
    "https://meta-luban.com/wp-content/uploads/2023/05/437baf3f-8ac3-4066-9094-d4b6e1180aa0.jpg",
    "https://images.financemagnates.com/images/bitcoin%20btc%20mining_id_b6d25679-df18-4ebe-acbc-5380a6838afc_size900.jpg",
    "https://spectrum.ieee.org/media-library/img.jpg?id=25584047&width=800&quality=85",
    "https://assets.rbl.ms/25584048/origin.jpg",
    "https://www.shutterstock.com/image-photo/crypto-farm-under-construction-ethiopiaserver-600nw-2450718191.jpg",
  ];

  return (
    <section className="bg-white py-16 px-6 md:px-16">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-black flex items-center justify-center gap-3">
        <span className="text-yellow-400 text-4xl">🏢</span>
        Our Office & Facilities
      </h2>

      {/* IMAGE GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((img, index) => (
          <div
            key={index}
            className="rounded-xl overflow-hidden shadow-md hover:shadow-xl cursor-pointer transition-all"
            onClick={() => setSelectedImage(img)}
          >
            <img
              src={img}
              loading="lazy"
              alt="Gallery item"
              className="w-full h-56 object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>

      {/* POPUP MODAL */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-[999]"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage.replace("&w=600", "&w=1600")}
            alt="Popup view"
            className="max-w-3xl max-h-[85vh] rounded-lg shadow-2xl border border-gray-700 transition-all"
          />
        </div>
      )}
    </section>
  );
};

export default Gallery;
