"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const AddItems = ({ onClose, onItemAdded }) => {
  const router = useRouter();

  const [itemType, setItemType] = useState("goods");
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [unit, setUnit] = useState("kilograms");
  const [discount, setDiscount] = useState("");
  const [discountType, setDiscountType] = useState("%");
  const [loading, setLoading] = useState(false); // For submission state
  const [error, setError] = useState(null); // For error handling

  const handleSave = async (event) => {
    event.preventDefault(); // Prevent page refresh
    console.log("Form submitted!"); // Confirm the function is called

    // Basic validation
    if (!itemName || !price || !unit) {
      alert("Item name, price, and unit are required.");
      return;
    }

    const dataToSend = {
      itemType,
      itemName,
      description,
      price: parseFloat(price),
      unit,
      discount: discount ? parseFloat(discount) : 0,
      discountType,
    };

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost/php-backend/save_item.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      const data = await response.json(); // Ensure JSON parsing

      console.log("Response from backend:", data);

      if (data.success) {
        alert(data.message);
        onItemAdded(); // Trigger refetching items
        onClose(); // Close the modal after submission
      } else {
        alert(data.message || "Failed to save item.");
      }
    } catch (error) {
      console.error("Error saving item:", error);
      setError("An error occurred while saving the item.");
      alert("An error occurred while saving the item.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 w-full max-w-lg rounded-lg shadow-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-6">Add Item</h2>

        <form onSubmit={handleSave}>
          <div className="flex space-x-6 mb-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="itemType"
                value="goods"
                checked={itemType === "goods"}
                onChange={() => setItemType("goods")}
                className="form-radio h-5 w-5 text-indigo-600"
                required
              />
              <span className="ml-2 text-sm font-medium">Goods</span>
            </label>

            <label className="flex items-center">
              <input
                type="radio"
                name="itemType"
                value="service"
                checked={itemType === "service"}
                onChange={() => setItemType("service")}
                className="form-radio h-5 w-5 text-indigo-600"
                required
              />
              <span className="ml-2 text-sm font-medium">Service</span>
            </label>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Item Name *</label>
            <input
              type="text"
              placeholder="Eg. Potato"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              placeholder="Description (Optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Price per unit *</label>
            <input
              type="number"
              placeholder="50"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
              required
              min="0"
              step="0.01"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Unit *</label>
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
              required
            >
              <option value="kilograms">Kilograms</option>
              <option value="liters">Liters</option>
              <option value="units">Units</option>
            </select>
          </div>

          <div className="flex space-x-4 mb-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium mb-1">Discount</label>
              <input
                type="number"
                placeholder="0"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
                min="0"
                step="0.01"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium mb-1">Discount Type</label>
              <select
                value={discountType}
                onChange={(e) => setDiscountType(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
              >
                <option value="%">%</option>
                <option value="₹">₹</option>
              </select>
            </div>
          </div>

          {loading && <p className="text-center text-blue-500">Saving item...</p>}
          {error && <p className="text-center text-red-500">{error}</p>}

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border rounded-md text-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 text-white rounded-md"
              disabled={loading}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItems;
