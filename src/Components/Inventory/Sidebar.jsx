"use client";
import React, { useState } from "react";

export default function Sidebar({ onFilterChange }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [lowQuantity, setLowQuantity] = useState(false);
  const [outOfStock, setOutOfStock] = useState(false);
  const [goods, setGoods] = useState(false);
  const [services, setServices] = useState(false);

  const handleClear = () => {
    setSearchTerm("");
    setLowQuantity(false);
    setOutOfStock(false);
    setGoods(false);
    setServices(false);
    onFilterChange({
      searchTerm: "",
      lowQuantity: false,
      outOfStock: false,
      goods: false,
      services: false,
    });
  };

  const handleFilterChange = (newFilters) => {
    onFilterChange({
      searchTerm,
      lowQuantity,
      outOfStock,
      goods,
      services,
      ...newFilters,
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Inventory</h2>

      {/* Search Input */}
      <div className="mb-6">
        <label className="block font-medium mb-2">Item Name</label>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            handleFilterChange({ searchTerm: e.target.value });
          }}
          placeholder="Search here..."
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      {/* Item Type Filters */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Item Type</h3>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="mr-2"
              checked={goods}
              onChange={() => {
                const newValue = !goods;
                setGoods(newValue);
                handleFilterChange({ goods: newValue });
              }}
            />
            Goods
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              className="mr-2"
              checked={services}
              onChange={() => {
                const newValue = !services;
                setServices(newValue);
                handleFilterChange({ services: newValue });
              }}
            />
            Services
          </label>
        </div>
      </div>

      {/* Item Stock Filters */}
      {/* <div className="mb-6">
        <h3 className="font-semibold mb-2">Item Stock</h3>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="mr-2"
              checked={lowQuantity}
              onChange={() => {
                const newValue = !lowQuantity;
                setLowQuantity(newValue);
                handleFilterChange({ lowQuantity: newValue });
              }}
            />
            Low quantity
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              className="mr-2"
              checked={outOfStock}
              onChange={() => {
                const newValue = !outOfStock;
                setOutOfStock(newValue);
                handleFilterChange({ outOfStock: newValue });
              }}
            />
            Out of stock
          </label>
        </div>
      </div> */}

      {/* Clear Button */}
      <div className="flex justify-end">
        <button
          onClick={handleClear}
          className="px-4 py-2 bg-red-500 text-white rounded-md"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
