import React from "react";

const Leaders = () => {
  const leaders = [
    {
      name: "DI Martin Hekel",
      role: "CEO & Founder",
      quote:
        "System stability is not an accident—it is the result of precise architecture.",
      story: [
        "15 years in railway infrastructure shaped his mission-critical mindset.",
        "He built highly reliable systems where failure was never an option.",
        "In 2018, he identified blockchain mining as critical infrastructure.",
      ],
      missionTitle: "The Mission: Professionalizing Mining",
      missionPoints: [
        { title: "Energy Commitment", text: "Clean energy wherever possible." },
        { title: "Predictability", text: "Results must be calculable." },
        { title: "Operational Excellence", text: "Every variable optimized." },
      ],
      closingQuote: "No hype. Only reliable digital infrastructure.",
      img: "./owners/kohler.jpeg",
    },
    {
      name: "Mag. Michael Köhler",
      role: "Managing Director & Partner",
      quote:
        "Innovation requires security. We make crypto bankable.",
      story: [
        "Ensures compliance in a fast-moving industry.",
        "Grant Thornton partner with deep tax expertise.",
        "Builds audit-ready legal foundations.",
      ],
      missionTitle: "The Mission: Transparency & Structure",
      missionPoints: [
        { title: "Tax & Compliance", text: "Clear crypto structures." },
        { title: "Strategic Growth", text: "Scaling through M&A." },
        { title: "Regulatory Anchor", text: "Highest reporting standards." },
      ],
      closingQuote: "We remove complexity so clients scale confidently.",
      img: "./owners/michael.jpeg",
    },
    {
      name: "DI Rene Haas",
      role: "CEO – Operations & Engineering",
      quote:
        "Efficiency means perfecting energy.",
      story: [
        "Leads operations and engineering.",
        "Decades of electrical experience.",
        "Integrates mining into energy systems.",
      ],
      missionTitle: "The Mission: Engineering Energy",
      missionPoints: [
        { title: "Electrical Precision", text: "Industrial-grade safety." },
        { title: "Thermal Synergy", text: "Heat reused intelligently." },
        { title: "Operational Safety", text: "Fail-safe by design." },
      ],
      closingQuote: "Electricity creates coins—and usable heat.",
      img: "./owners/rene.jpeg",
    },
  ];

  return (
    <section className="w-[90%] max-w-7xl mx-auto my-28">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold tracking-tight josefin-sans">
          LEADERSHIP TEAM
        </h2>
        <p className="text-black mt-4 max-w-2xl mx-auto">
          Experienced professionals dedicated to your mining success
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 items-stretch">
        {leaders.map((leader, index) => (
          <div
            key={index}
            className="h-full flex flex-col rounded-2xl border border-gray-200 bg-gradient-to-b from-white to-gray-50 shadow-md hover:shadow-xl transition-all duration-300"
          >
            {/* IMAGE */}
            <div className="relative">
              <img
                src={leader.img}
                alt={leader.name}
                className="w-full h-[340px] object-cover rounded-t-2xl"
              />
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            {/* CONTENT */}
            <div className="p-7 flex flex-col flex-grow">
              <h3 className="text-2xl font-semibold tracking-tight">
                {leader.name}
              </h3>
              <p className="text-green-600 font-medium mt-1">
                {leader.role}
              </p>

              <div className="mt-4 border-l-2 border-green-500 pl-4">
                <p className="italic text-gray-700 text-sm">
                  “{leader.quote}”
                </p>
              </div>

              <div className="mt-5 space-y-3 text-gray-700 text-sm">
                {leader.story.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              <div className="mt-6">
                <h4 className="font-semibold text-sm uppercase tracking-wide text-gray-800">
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
              </div>

              {/* FOOTER */}
              <p className="mt-auto pt-6 italic text-gray-800 text-sm border-t border-gray-200">
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
