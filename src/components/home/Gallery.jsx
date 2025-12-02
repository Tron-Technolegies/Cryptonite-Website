import React, { useState } from "react";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  // Optimized compressed image URLs (faster loading)
  const images = [
    "https://images.pexels.com/photos/1024248/pexels-photo-1024248.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/269077/pexels-photo-269077.jpeg?auto=compress&cs=tinysrgb&w=600",
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
