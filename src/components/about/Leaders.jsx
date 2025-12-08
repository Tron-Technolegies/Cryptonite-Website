import React from "react";

const Leaders = () => {
  const leaders = [
    {
      name: "Michael Chen",
      role: "CEO & Founder",
      img: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&w=600&q=80",
    },
    {
      name: "David Martinez",
      role: "CTO",
      img: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=600&q=80",
    },
    {
      name: "Thomas Reed",
      role: "Head of Operations",
      img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80",
    },
    {
      name: "Robert Hayes",
      role: "Head of Customer Success",
      img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80",
    },
  ];

  return (
    <div className="w-[90%] mx-auto my-20 text-center">
      <h2 className="text-3xl font-bold josefin-sans">LEADERSHIP TEAM</h2>
      <p className="text-gray-600 mt-2">
        Experienced professionals dedicated to your mining success
      </p>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {leaders.map((leader, index) => (
          <div key={index} className="relative rounded-xl overflow-hidden shadow-md">
            
            {/* Image */}
            <img
              src={leader.img}
              alt={leader.name}
              className="w-full h-64 object-cover"
            />

            {/* Dark gradient for visibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

            {/* Text Overlay */}
            <div className="absolute bottom-4 left-4 text-white z-10">
              <h3 className="text-lg font-bold drop-shadow-xl tracking-wide">
                {leader.name}
              </h3>
              <p className="text-sm opacity-95 drop-shadow-xl">{leader.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaders;
