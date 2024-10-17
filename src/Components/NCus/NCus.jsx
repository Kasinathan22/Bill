"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const NewCustomer = () => {
  const router = useRouter();
  const [showBusinessDetails, setShowBusinessDetails] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [gstin, setGstin] = useState("");

  const toggleBusinessDetails = () => setShowBusinessDetails(!showBusinessDetails);

  const handleSave = async (event) => {
    event.preventDefault(); // Prevent default form submission

    try {
      const response = await fetch("http://localhost/php-backend/save_customer.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          name,
          phone,
          email,
          gstin,
        }),
      });

      const data = await response.json();
      console.log(data); // Log the response for debugging

      if (data.success) {
        alert(data.message);
        router.push("/"); // Redirect to home page on success
      } else {
        alert(data.message); // Show error message
      }
    } catch (error) {
      console.error("Error saving customer:", error);
    }
  };

  return (
    <div className="p-8 max-w-xl mx-auto font-sans">
      <h2 className="text-2xl font-bold mb-6">New Customer</h2>

      <form onSubmit={handleSave}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <input
            type="text"
            placeholder="Eg. John Smith"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="+91 Enter phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Enter email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div
          className="cursor-pointer text-blue-600 mb-4"
          onClick={toggleBusinessDetails}
        >
          {showBusinessDetails ? "▾ Business, GSTIN Details" : "▸ Business, GSTIN Details"}
        </div>

        {showBusinessDetails && (
          <div className="mb-6">
            <div className="flex gap-4 mb-4">
              <input
                type="text"
                placeholder="Enter 15-digit GSTIN number"
                value={gstin}
                onChange={(e) => setGstin(e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        )}

        <div className="flex justify-between items-center mt-6">
          <button
            type="button"
            className="px-4 py-2 border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50"
            onClick={() => router.back()}
          >
            Back
          </button>

          <div className="flex gap-4">
            <button
              type="button"
              className="px-4 py-2 border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              onClick={() => router.back()}
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewCustomer;
