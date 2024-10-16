"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter

const NewCustomer = () => {
  const router = useRouter(); // Initialize router
  const [showBusinessDetails, setShowBusinessDetails] = useState(false);

  const toggleBusinessDetails = () => setShowBusinessDetails(!showBusinessDetails);

  return (
    <div className="p-8 max-w-xl mx-auto font-sans">
      <h2 className="text-2xl font-bold mb-6">New Customer</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <input
          type="text"
          placeholder="Eg. John Smith"
          className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="+91 Enter phone number"
          className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          placeholder="Enter email address"
          className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div
        className="cursor-pointer text-blue-600 mb-4"
        onClick={toggleBusinessDetails}
      >
        {showBusinessDetails ? '▾ Business, GSTIN Details' : '▸ Business, GSTIN Details'}
      </div>

      {showBusinessDetails && (
        <div className="mb-6">
          <div className="flex gap-4 mb-4">
            <input
              type="text"
              placeholder="Enter 15-digit GSTIN number"
              className="flex-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="px-4 py-2 text-blue-600 border border-blue-500 rounded-lg hover:bg-blue-50">
              Auto-Fill
            </button>
          </div>
          <input
            type="text"
            placeholder="Eg. John Smith"
            className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}

      <div className="flex justify-between items-center mt-6">
        <button
          className="px-4 py-2 border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50"
          onClick={() => router.back()} // Navigate back
        >
          Back
        </button>

        <div className="flex gap-4">
          <button className="px-4 py-2 border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50">
            Cancel
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewCustomer;
