import React from "react";

const Leaders = () => {
  const leaders = [
    {
      name: "DI Martin Hekel",
      role: "CEO & Founder",
      quote:
        "System stability is not an accident—it is the result of precise architecture.",
      story: [
        "With nearly 15 years of experience in critical railway infrastructure, DI Martin Hekel understands one thing above all: a system is only as strong as its weakest link.",
        "In a world where every second counts and failure is not an option, he specialized in managing complex network architectures and ensuring maximum stability.",
        "In 2018, Martin recognized that blockchain technology was becoming the next global critical infrastructure. He saw that crypto mining faced the same challenges as the rail sector: massive energy efficiency, absolute reliability, and engineering-grade precision.",
      ],
      missionTitle: "The Mission: Professionalizing the Mining Industry",
      missionPoints: [
        {
          title: "Energy Commitment",
          text: "We consistently strive to use clean energy sources whenever possible.",
        },
        {
          title: "Predictability",
          text: "Applying railway-grade precision to calculable financial models.",
        },
        {
          title: "Operational Excellence",
          text: "Every variable optimized for maximum system efficiency.",
        },
      ],
      closingQuote:
        "We don't build hype; we build digital infrastructure on a solid, predictable foundation.",
      img: "./owners/kohler.jpeg",
    },
    {
      name: "Mag. Michael Köhler",
      role: "Managing Director & Partner",
      quote:
        "Innovation requires security. We make crypto bankable and regulatorily sound.",
      story: [
        "Mag. Michael Köhler is the steady hand ensuring compliance in a fast-moving industry.",
        "As a seasoned tax advisor and partner at Grant Thornton, he guides national and international companies through complex financial structures.",
        "He recognized early that mining projects must be built on transparent, audit-ready legal foundations.",
      ],
      missionTitle: "The Mission: Transparency & Strategic Financial Logic",
      missionPoints: [
        {
          title: "Tax & Compliance Excellence",
          text: "Deep expertise in crypto taxation and digital assets.",
        },
        {
          title: "Strategic Growth",
          text: "Preparing Cryptonite for international scaling through M&A experience.",
        },
        {
          title: "Regulatory Anchor",
          text: "Highest standards in accounting and reporting.",
        },
      ],
      closingQuote:
        "We provide the security needed to scale digital assets with total confidence.",
      img: "./owners/michael.jpeg",
    },
    {
      name: "DI Rene Haas",
      role: "CEO – Operations & Engineering",
      quote:
        "Efficiency means not just consuming energy, but perfecting it.",
      story: [
        "DI Rene Haas leads the technical and operational backbone of Cryptonite.",
        "With decades of experience in electrical engineering and operations management, he ensures safety, order, and uninterrupted performance.",
        "He specializes in sector coupling—integrating mining hardware into energy and heating infrastructure.",
      ],
      missionTitle: "The Mission: Engineering the Future of Energy",
      missionPoints: [
        {
          title: "Electrical Precision",
          text: "Industrial-grade safety standards and system design.",
        },
        {
          title: "Thermal Synergy",
          text: "Converting mining exhaust into usable heat.",
        },
        {
          title: "Operational Safety",
          text: "Fail-safe processes built on decades of leadership.",
        },
      ],
      closingQuote:
        "Electricity doesn’t just create coins—it creates usable heat.",
      img: "./owners/rene.jpeg",
    },
  ];

  return (
    <section className="w-[90%] max-w-7xl mx-auto my-28">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold">Leadership Team</h2>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          Engineering, compliance, and operational excellence behind Cryptonite
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 items-start">
        {leaders.map((leader, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            {/* IMAGE */}
            <img
              src={leader.img}
              alt={leader.name}
              className="w-full h-[340px] object-cover"
            />

            {/* CONTENT */}
            <div className="p-7">
              <h3 className="text-2xl font-semibold">{leader.name}</h3>
              <p className="text-green-600 font-medium mt-1">
                {leader.role}
              </p>

              <p className="italic text-gray-700 mt-4 text-sm">
                “{leader.quote}”
              </p>

              <div className="mt-5 space-y-4 text-gray-700 text-sm leading-relaxed">
                {leader.story.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              <h4 className="mt-6 font-semibold">
                {leader.missionTitle}
              </h4>

              <ul className="mt-3 space-y-2 text-sm text-gray-700">
                {leader.missionPoints.map((point, i) => (
                  <li key={i}>
                    <span className="font-semibold">{point.title}:</span>{" "}
                    {point.text}
                  </li>
                ))}
              </ul>

              <p className="mt-5 italic text-gray-800 text-sm">
                “{leader.closingQuote}”
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Leaders;
