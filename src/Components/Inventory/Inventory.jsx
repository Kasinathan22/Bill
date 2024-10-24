"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import AddItems from "./AddItems"; // Ensure the correct import path

const truncateText = (text, maxLength) =>
  text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;

export default function Inventory() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    searchTerm: "",
    goods: false,
    services: false,
    lowQuantity: false,
    outOfStock: false,
  });
  const [items, setItems] = useState([]); // Initialize items state
  const [loading, setLoading] = useState(false); // For loading state
  const [error, setError] = useState(null); // For error handling

  const handleFilterChange = (newFilters) => setFilters(newFilters);

  // Function to fetch items from the backend
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
        // Convert price to number if necessary
        const fetchedItems = data.items.map((item) => ({
          ...item,
          price: parseFloat(item.price),
        }));
        setItems(fetchedItems);
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

  // Fetch items on component mount
  useEffect(() => {
    fetchItems();
  }, []);

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(filters.searchTerm.toLowerCase());
    const matchesType =
      (!filters.goods && !filters.services) ||
      (filters.goods && item.type.toLowerCase() === "goods") ||
      (filters.services && item.type.toLowerCase() === "service");
    const matchesStock =
      (!filters.lowQuantity && !filters.outOfStock) ||
      (filters.lowQuantity && item.unit.toLowerCase() === "unt") || // Example condition for low quantity
      (filters.outOfStock && item.price === 700.0); // Example condition for out of stock

    return matchesSearch && matchesType && matchesStock;
  });

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex space-x-4 pt-20">
      <Sidebar onFilterChange={handleFilterChange} />
      <div className="p-4 w-full">
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm text-gray-500">
            <span className="font-medium">ITEM TYPE</span>
          </div>
          <div>
            <button className="px-4 py-2 bg-gray-100 border rounded-md mr-2">
              Actions
            </button>

            <button
              onClick={openModal}
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Add an Item
            </button>

            {isModalOpen && <AddItems onClose={closeModal} onItemAdded={fetchItems} />}
          </div>
        </div>

        {loading && <p className="text-center">Loading items...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && !error && (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">
                  <input type="checkbox" />
                </th>
                <th className="border px-4 py-2">Item Name</th>
                <th className="border px-4 py-2">Item Type</th>
                <th className="border px-4 py-2">Price/Unit</th>
                <th className="border px-4 py-2">Unit</th>
                <th className="border px-4 py-2">Quantity</th>
                <th className="border px-4 py-2">SKU</th>
                <th className="border px-4 py-2">HSN/SAC</th>
                <th className="border px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.length > 0 ? (
                filteredItems.map((item, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">
                      <input type="checkbox" />
                    </td>
                    <td className="border px-4 py-2">
                      {truncateText(item.name, 20)}
                    </td>
                    <td className="border px-4 py-2">{item.type}</td>
                    <td className="border px-4 py-2">{`₹${item.price.toLocaleString('en-IN', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}`}</td>
                    <td className="border px-4 py-2">{item.unit}</td>
                    <td className="border px-4 py-2">-</td>
                    <td className="border px-4 py-2">-</td>
                    <td className="border px-4 py-2">-</td>
                    <td className="border px-4 py-2">-</td>
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
