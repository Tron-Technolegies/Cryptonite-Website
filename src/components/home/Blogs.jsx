import React from "react";
import { FiUser, FiCalendar, FiImage } from "react-icons/fi";

const Blogs = () => {
  const blogPosts = [
    {
      id: 1,
      category: "Industry Insights",
      title: "Why Vienna is Becoming Europe’s Bitcoin Mining Hub",
      author: "Sarah Johnson",
      date: "June 8, 2025",
      image: "/blogimage/firstblog.png",
      description:
        "Discover how Vienna’s strategic location, renewable energy infrastructure, and crypto-friendly regulations make it ideal for large-scale mining operations...",
    },
    {
      id: 2,
      category: "Market Analysis",
      title: "Central European Mining: Austria & Czech Republic Opportunities",
      author: "David Martinez",
      date: "June 5, 2025",
      image: "/blogimage/secondblog.png",
      description:
        "Explore the growing Bitcoin mining ecosystem in Central Europe and why institutional investors are flocking to the region.",
    },
    {
      id: 3,
      category: "Events",
      title: "Meet Us at BTC Prague: Booth #247",
      author: "Emily Zhang",
      date: "June 8, 2025",
      image: "/blogimage/thirdblog.png",
      description:
        "Visit our booth to learn about our enterprise hosting solutions, renewable energy initiatives, and exclusive conference discounts.",
    },
  ];

  return (
    <section className="bg-white py-20 px-6 md:px-16">
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-extrabold text-black uppercase tracking-wide">
          Latest Articles
        </h2>
        <p className="text-gray-600 mt-2 text-base">
          Stay updated with the latest mining insights
        </p>
      </div>

      <div className="grid gap-10 md:grid-cols-3">
        {blogPosts.map((post) => (
          <div
            key={post.id}
            className="border border-gray-200 bg-white rounded-2xl shadow-sm hover:shadow-lg transition overflow-hidden"
          >
            <div className="relative">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-56 object-cover"
              />

              <span className="absolute top-3 left-3 bg-white/90 text-black text-xs font-semibold px-3 py-1 rounded-md shadow">
                {post.category}
              </span>

              <FiImage className="absolute top-3 right-3 text-white text-xl opacity-80" />
            </div>

            <div className="p-6">
              <h3 className="text-lg font-semibold text-black leading-snug">
                {post.title}
              </h3>

              <div className="flex items-center gap-2 text-gray-500 text-sm mt-3">
                <FiUser className="text-(--primary-color)" />
                <span>{post.author}</span>
                <span className="mx-1">—</span>
                <FiCalendar className="text-(--primary-color)" />
                <span>{post.date}</span>
              </div>

              <p className="text-gray-600 mt-3 text-sm leading-relaxed">
                {post.description}
              </p>

              <button className="mt-4 text-(--primary-color) font-semibold text-sm hover:underline">
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-14">
        <button className="border border-gray-300 py-3 px-10 rounded-full text-sm font-medium hover:bg-gray-100 transition flex items-center gap-2 mx-auto">
          Load More Articles →
        </button>
      </div>
    </section>
  );
};

export default Blogs;
