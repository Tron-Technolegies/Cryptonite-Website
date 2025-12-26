import React from "react";

const Leaders = () => {
  const leaders = [
    {
      name: "DI Martin Hekel",
      role: "CEO & Founder",
      quote:
        "System stability is not an accident—it is the result of precise architecture.",
      description:
        "With nearly 15 years of experience in mission-critical railway infrastructure, Martin applies industrial-grade precision to crypto mining. He founded Cryptonite to transform mining into predictable, efficient, and sustainable digital infrastructure.",
      img: "/owners/michael.jpeg",
    },
    {
      name: "Mag. Michael Köhler",
      role: "Managing Director & Partner",
      quote:
        "Innovation requires security. We make crypto bankable and regulatorily sound.",
      description:
        "A seasoned tax advisor and strategic entrepreneur, Michael ensures Cryptonite operates with full legal, tax, and regulatory transparency. His expertise makes mining audit-ready and trusted by institutional partners.",
      img: "/owners/kohler.jpeg",
    },
    {
      name: "DI Rene Haas",
      role: "CEO – Operations & Engineering",
      quote:
        "Efficiency means not just consuming energy, but perfecting it.",
      description:
        "An electrical engineering expert and operations leader, Rene specializes in energy optimization, safety, and heat recovery. He transforms mining infrastructure into smart energy systems through industrial-grade engineering.",
      img: "/owners/rene.jpeg",
    },
  ];

  return (
    <section className="w-[90%] max-w-7xl mx-auto my-24">
      {/* Header */}
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-bold tracking-wide">
          Leadership Team
        </h2>
        <p className="text-gray-600 mt-3 max-w-xl mx-auto">
          Experienced leaders building industrial-grade, reliable, and
          sustainable mining infrastructure
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {leaders.map((leader, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-2"
          >
            {/* Image */}
            <div className="overflow-hidden">
              <img
                src={leader.img}
                alt={leader.name}
                className="w-full h-[360px] object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="text-xl font-semibold">{leader.name}</h3>
              <p className="text-sm text-green-600 font-medium mt-1">
                {leader.role}
              </p>

              <p className="italic text-gray-700 mt-4 text-sm leading-relaxed">
                “{leader.quote}”
              </p>

              <p className="text-gray-600 text-sm mt-4 leading-relaxed">
                {leader.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Leaders;
