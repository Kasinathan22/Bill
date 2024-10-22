"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";

const items = [
  { name: "Air Conditioner | Used Air Conditioner |", type: "Service", price: "₹48,999.00", unit: "GRS" },
  { name: "Prexo Laptop", type: "Goods", price: "₹11,940.00", unit: "UNT" },
  { name: "Air Conditioner | Used", type: "Goods", price: "₹5,300.00", unit: "UNT" },
  { name: "Refrigerator | Used", type: "Goods", price: "₹2,200.00", unit: "UNT" },
  { name: "Microwave | Used", type: "Goods", price: "₹700.00", unit: "UNT" },
  { name: "Reimbursement", type: "Service", price: "₹4,09,000.00", unit: "OTH" },
];

const truncateText = (text, maxLength) =>
  text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;

const AddItemModal = ({ onClose }) => {
  const [content, setContent] = useState(null);

  // Load the content of the /additem page when the modal is opened
  useEffect(() => {
    const fetchContent = async () => {
      const res = await fetch('/additem');
      const text = await res.text();
      setContent(text);
    };

    fetchContent();
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-3 w-8/12 overflow-y-auto h-5/6">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500">
          &times;
        </button>
        {/* Display the fetched content */}
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  );
};

export default function Inventory() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    searchTerm: "",
    lowQuantity: false,
    outOfStock: false,
  });

  const handleFilterChange = (newFilters) => setFilters(newFilters);

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(filters.searchTerm.toLowerCase());
    const matchesType =
      (!filters.goods && !filters.services) ||
      (filters.goods && item.type === "Goods") ||
      (filters.services && item.type === "Service");
    const matchesStock =
      (!filters.lowQuantity && !filters.outOfStock) ||
      (filters.lowQuantity && item.unit === "UNT") ||  // Example condition for low quantity
      (filters.outOfStock && item.price === "₹700.00"); // Example condition for out of stock

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

            {isModalOpen && <AddItemModal onClose={closeModal} />}
          </div>
        </div>

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
            {filteredItems.map((item, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">
                  <input type="checkbox" />
                </td>
                <td className="border px-4 py-2">
                  {truncateText(item.name, 20)}
                </td>
                <td className="border px-4 py-2">{item.type}</td>
                <td className="border px-4 py-2">{item.price}</td>
                <td className="border px-4 py-2">{item.unit}</td>
                <td className="border px-4 py-2">-</td>
                <td className="border px-4 py-2">-</td>
                <td className="border px-4 py-2">-</td>
                <td className="border px-4 py-2">-</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
