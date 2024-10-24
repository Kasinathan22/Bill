"use client";
import React, { useState, useEffect } from "react";

export default function Sidebar({ onFilterChange, clearFilters }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [lowQuantity, setLowQuantity] = useState(false);
  const [outOfStock, setOutOfStock] = useState(false);
  const [goods, setGoods] = useState(false);
  const [services, setServices] = useState(false);

  // Effect to handle filter changes
  useEffect(() => {
    onFilterChange({
      searchTerm,
      lowQuantity,
      outOfStock,
      goods,
      services,
    });
  }, [searchTerm, lowQuantity, outOfStock, goods, services, onFilterChange]);

  // Function to handle clearing all filters
  const handleClearFilters = () => {
    setSearchTerm("");    // Reset search term
    setLowQuantity(false); // Reset low quantity filter
    setOutOfStock(false);  // Reset out of stock filter
    setGoods(false);       // Reset goods filter
    setServices(false);    // Reset services filter

    // You can also call clearFilters() if you want to notify the parent component
    clearFilters && clearFilters(); // Optional: if passed from parent
  };

  return (
    <div className="sidebar p-4">
      <h3 className="text-lg font-semibold mb-4">Filters</h3>

      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-2 py-1 border rounded-md mb-2"
      />

      {/* Filter checkboxes */}
      <label className="flex items-center mb-2">
        <input
          type="checkbox"
          checked={goods}
          onChange={(e) => setGoods(e.target.checked)}
          className="mr-2"
        />
        Goods
      </label>

      <label className="flex items-center mb-2">
        <input
          type="checkbox"
          checked={services}
          onChange={(e) => setServices(e.target.checked)}
          className="mr-2"
        />
        Services
      </label>

      <button
        onClick={handleClearFilters} // Use the local clear function
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md"
      >
        Clear Filters
      </button>
    </div>
  );
}
