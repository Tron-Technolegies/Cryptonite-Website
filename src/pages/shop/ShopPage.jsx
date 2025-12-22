import React, { useState, useEffect } from "react";
import productApi from "../../api/productApi";
import { Link } from "react-router-dom";
import { FiSearch, FiPackage } from "react-icons/fi";
import { getImageUrl } from "../../utils/imageUtils";

const ShopPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const [products, setProducts] = useState([]);
  const [bundles, setBundles] = useState([]);
  const [search, setSearch] = useState("");
  const [manufacturer, setManufacturer] = useState("All Manufacturers");
  const [priceFilter, setPriceFilter] = useState("All prices");
  const [productType, setProductType] = useState("All"); // "All", "Products", "Bundles"
  const [loading, setLoading] = useState(true);

  /* ================= FETCH PRODUCTS & BUNDLES ================= */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, bundlesRes] = await Promise.all([
          productApi.getAll(),
          productApi.getBundles()
        ]);
        
        setProducts(Array.isArray(productsRes.data) ? productsRes.data : []);
        setBundles(Array.isArray(bundlesRes.data) ? bundlesRes.data : []);
      } catch (error) {
        console.error("Error fetching data:", error);
        setProducts([]);
        setBundles([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getPriceValue = (price) => Number(price ?? 0);

  /* ================= FILTERING ================= */
  const brands = ["All Manufacturers", "Bitmain", "Whatsminer"];

  // Combine products and bundles for filtering
  const allItems = [
    ...products.map(p => ({ ...p, type: 'product' })),
    ...bundles.map(b => ({ ...b, type: 'bundle' }))
  ];

  const filteredItems = allItems
    .filter((item) => {
      // Filter by product type (All/Products/Bundles)
      if (productType === "Products") return item.type === 'product';
      if (productType === "Bundles") return item.type === 'bundle';
      return true;
    })
    .filter((item) => {
      // Search filter
      const searchTerm = search.toLowerCase();
      const name = item.model_name || item.bundle_name || "";
      return name.toLowerCase().includes(searchTerm);
    })
    .filter((item) => {
      // Manufacturer filter (only applies to products)
      if (manufacturer === "All Manufacturers") return true;
      if (item.type === 'bundle') return true; // Don't filter bundles by manufacturer
      return item?.model_name?.toLowerCase().includes(manufacturer.toLowerCase());
    })
    .filter((item) => {
      // Price filter
      const val = getPriceValue(item?.price || item?.discounted_price);
      if (priceFilter === "Below 2000") return val < 2000;
      if (priceFilter === "2000-4000") return val >= 2000 && val <= 4000;
      if (priceFilter === "Above 4000") return val > 4000;
      return true;
    });

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl font-semibold">
        Loading products...
      </div>
    );
  }

  return (
    <div className="bg-[#F9FAFB] min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* ================= HEADER ================= */}
        <h1 className="text-5xl font-extrabold tracking-tight josefin-sans text-gray-900 leading-tight">
          MINING <br /> EQUIPMENT
        </h1>

        <p className="text-black text-lg mt-4 max-w-2xl font-medium">
          Professional grade ASIC miners and bundle offers from industry leading manufacturers.
        </p>

        {/* ================= FILTER BAR ================= */}
        <div className="mt-10 flex flex-col md:flex-row gap-6">
          {/* SEARCH */}
          <div className="relative w-full md:w-[40%]">
            <FiSearch className="absolute left-5 top-4 text-gray-400 text-xl" />
            <input
              type="text"
              placeholder="Search equipment..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-full px-14 py-3.5 shadow-sm focus:ring-2 focus:ring-black"
            />
          </div>

          {/* PRODUCT TYPE FILTER */}
          <select
            value={productType}
            onChange={(e) => setProductType(e.target.value)}
            className="bg-white border border-gray-200 rounded-full px-6 py-3.5 shadow-sm text-gray-700"
          >
            <option>All</option>
            <option>Products</option>
            <option>Bundles</option>
          </select>

          {/* BRAND FILTER */}
          <select
            value={manufacturer}
            onChange={(e) => setManufacturer(e.target.value)}
            className="bg-white border border-gray-200 rounded-full px-6 py-3.5 shadow-sm text-gray-700"
            disabled={productType === "Bundles"}
          >
            {brands.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>

          {/* PRICE FILTER */}
          <select
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
            className="bg-white border border-gray-200 rounded-full px-6 py-3.5 shadow-sm text-gray-700"
          >
            <option>All prices</option>
            <option>Below 2000</option>
            <option>2000-4000</option>
            <option>Above 4000</option>
          </select>
        </div>

        {/* ================= PRODUCTS GRID ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-14">
          {filteredItems.map((item) => {
            const isBundle = item.type === 'bundle';
            const itemName = isBundle ? item.bundle_name : item.model_name;
            const itemPrice = isBundle ? item.discounted_price : item.price;
            const originalPrice = isBundle ? item.original_price : null;
            const itemId = item.id;
            const itemImage = item.image;
            const itemDescription = item.description;

            return (
              <div
                key={`${item.type}-${itemId}`}
                className="bg-white rounded-3xl border border-gray-200 shadow-md hover:shadow-xl transition p-8 relative"
              >
                {/* BUNDLE BADGE */}
                {isBundle && (
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                    <FiPackage className="text-sm" />
                    BUNDLE
                  </div>
                )}

                {/* IMAGE */}
                <div className="flex justify-center">
                  <img
                    src={getImageUrl(itemImage)}
                    alt={itemName}
                    loading="lazy"
                    className="h-[260px] object-contain"
                  />
                </div>

                {/* TITLE & PRICE */}
                <div className="flex justify-between items-center mt-5">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {itemName}
                  </h2>
                  <div className="flex flex-col items-end">
                    {isBundle && originalPrice && (
                      <span className="text-gray-400 text-xs line-through">
                        ${originalPrice}
                      </span>
                    )}
                    <span className={`${isBundle ? 'bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700' : 'bg-[#E7F8E7] text-green-600'} font-semibold px-4 py-1 rounded-full`}>
                      ${itemPrice}
                    </span>
                  </div>
                </div>

                {/* DESCRIPTION */}
                <p className="text-gray-600 text-sm mt-2">
                  {itemDescription?.substring(0, 110)}...
                </p>

                {/* SPECS */}
                {!isBundle && (
                  <div className="mt-4 text-sm space-y-1">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Hashrate</span>
                      <span className="font-medium">{item.hashrate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Power</span>
                      <span className="font-medium">{item.power}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Algorithm</span>
                      <span className="font-medium">{item.algorithm}</span>
                    </div>
                  </div>
                )}

                {/* BUNDLE INFO */}
                {isBundle && (
                  <div className="mt-4 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">Discount</span>
                      <span className="font-semibold text-purple-600">
                        {item.discount_percentage}% OFF
                      </span>
                    </div>
                  </div>
                )}

                {/* SINGLE CTA BUTTON */}
                <div className="mt-6">
                  <Link
                    to={isBundle ? `/bundle/${itemId}` : `/product/${itemId}`}
                    className={`block w-full ${isBundle ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700' : 'bg-green-600 hover:bg-green-700'} text-white rounded-full py-2.5 text-center font-semibold transition`}
                  >
                    Know More
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* NO RESULTS MESSAGE */}
        {filteredItems.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No products found matching your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopPage;