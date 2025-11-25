import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import productApi from "../../api/productApi";

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchProducts = async () => {
      try {
        const res = await productApi.getAll();

        console.log("PRODUCT API RESPONSE:", res.data);

       
        const data = Array.isArray(res.data) ? res.data : [];
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

 
  const backendBase = import.meta.env.VITE_API_BASE.replace("/api/user", "");

  const filteredProducts = (products || [])
    .filter((p) =>
      (p.model_name || "")
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "price-low") return a.price - b.price;
      return b.id - a.id; // newest
    });

  return (
    <div className="bg-[#000000] min-h-screen text-white px-6 md:px-16 py-16 flex gap-10">

      {/* SIDEBAR */}
      <div className="w-64 hidden md:block bg-[#07101f] p-6 rounded-xl h-fit shadow-lg">
        <h2 className="text-xl font-bold mb-4">Filter</h2>

        <label className="text-sm">Sort By</label>
        <select
          className="w-full mt-1 mb-4 bg-[#000000] p-2 rounded-md border border-gray-600"
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="newest">Newest</option>
          <option value="price-low">Price: Low → High</option>
          <option value="price-high">Price: High → Low</option>
        </select>

        <label className="text-sm">Search</label>
        <input
          type="text"
          placeholder="Search item..."
          className="w-full mt-1 mb-4 bg-[#000000] p-2 rounded-md border border-gray-600"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* PRODUCT GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 flex-1">

        {filteredProducts.map((product) => (
          <Link
            to={`/product/${product.id}`}
            key={product.id}
            className="bg-[#0a1628] p-6 rounded-xl hover:-translate-y-2 transition duration-300 shadow-lg block"
          >
            <img
              src={product.image}
              alt={product.model_name}
              className="w-full h-52 object-contain mb-4"
            />

            <h2 className="text-xl font-bold mb-1">
              {product.model_name}
            </h2>

            <p className="mt-2 text-orange-400 text-lg">
              $ {product.price}
            </p>

            <button className="mt-4 bg-green-500 px-4 py-2 rounded-lg font-semibold hover:bg-green-600 w-full">
              Buy Now
            </button>
          </Link>
        ))}

        {/* No results */}
        {filteredProducts.length === 0 && (
          <p className="text-gray-300 text-lg col-span-full text-center">
            No products found.
          </p>
        )}
      </div>
    </div>
  );
};

export default ShopPage;
