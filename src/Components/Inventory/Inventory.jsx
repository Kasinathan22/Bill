"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar"; // Ensure correct path
import AddItems from "./AddItems"; // Ensure correct path

export default function Inventory() {
  const [filters, setFilters] = useState({
    searchTerm: "",
    lowQuantity: false,
    outOfStock: false,
    goods: false,
    services: false,
  });

  const [items, setItems] = useState([]); // All fetched items
  const [filteredItems, setFilteredItems] = useState([]); // Filtered items to display
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost/php-backend/get_items.php", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (data.success) {
        setItems(data.items);
        setFilteredItems(data.items); // Set initial filtered items
      } else {
        setError(data.message || "Failed to fetch items.");
      }
    } catch (err) {
      console.error("Error fetching items:", err);
      setError("An error occurred while fetching items.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, items]);

  const applyFilters = () => {
    const { searchTerm, lowQuantity, outOfStock, goods, services } = filters;

    const filtered = items.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLowQuantity = lowQuantity ? item.quantity < 10 : true;
      const matchesOutOfStock = outOfStock ? item.quantity === 0 : true;
      const matchesGoods = goods ? item.item_type.toLowerCase() === "goods" : true;
      const matchesServices = services ? item.item_type.toLowerCase() === "service" : true;

      return (
        matchesSearch &&
        matchesLowQuantity &&
        matchesOutOfStock &&
        matchesGoods &&
        matchesServices
      );
    });

    setFilteredItems(filtered);
  };

  const handleFilterChange = (newFilters) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
  };

  const clearFilters = () => {
    setFilters({
      searchTerm: "",
      lowQuantity: false,
      outOfStock: false,
      goods: false,
      services: false,
    });
  };

  return (
    <div className="flex space-x-4 pt-20">
      <Sidebar onFilterChange={handleFilterChange} clearFilters={clearFilters} />

      <div className="p-4 w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Inventory</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Add an Item
          </button>
          {isModalOpen && (
            <AddItems onClose={() => setIsModalOpen(false)} onItemAdded={fetchItems} />
          )}
        </div>

        {loading && <p className="text-center">Loading items...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && !error && (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">Item Name</th>
                <th className="border px-4 py-2">Item Type</th>
                <th className="border px-4 py-2">HSN/SAC Code</th>
                <th className="border px-4 py-2">Price</th>
                <th className="border px-4 py-2">Unit</th>
                
                <th className="border px-4 py-2">GST Rate (%)</th>
                <th className="border px-4 py-2">Cess Rate (%)</th>
                <th className="border px-4 py-2">Discount</th>
                {/* <th className="border px-4 py-2">Discount Type</th> */}
              </tr>
            </thead>
            <tbody>
  {filteredItems.length > 0 ? (
    filteredItems.map((item, index) => (
      <tr key={index}>
        <td className="border px-4 py-2">{item.name}</td>
        <td className="border px-4 py-2">{item.item_type}</td>
        <td className="border px-4 py-2">{item.hsn_sac || "N/A"}</td>
        <td className="border px-4 py-2">₹{item.price}</td>
        <td className="border px-4 py-2">{item.unit}</td>
        <td className="border px-4 py-2">{item.gst_rate || "0.00"}%</td>
        <td className="border px-4 py-2">{item.cess_rate || "0.00"}%</td>
        <td className="border px-4 py-2">{item.discount || "0.00"}</td>
        {/* <td className="border px-4 py-2">{item.discount_type || "N/A"}</td> */}
      </tr>
    ))
  ) : (
    <tr>
      <td className="border px-4 py-2 text-center" colSpan="9">
        No items found.
      </td>
    </tr>
  )}
</tbody>

          </table>
        )}
      </div>
    </div>
  );
}
