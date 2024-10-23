"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const AddItems = () => {
  const router = useRouter();
  const [itemType, setItemType] = useState("goods");
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [unit, setUnit] = useState("kilograms");
  const [discount, setDiscount] = useState("");
  const [discountType, setDiscountType] = useState("%");

  const handleSave = async (event) => {
    event.preventDefault(); // Prevent form submission refresh
  
    console.log("Save button clicked!"); // Add this to confirm function call
  
    if (!itemName || !price || !unit) {
      alert("Item name, price, and unit are required.");
      return;
    }
  
    const dataToSend = {
      itemType,
      itemName,
      description,
      price,
      unit,
      discount,
      discountType,
    };
  
    try {
      const response = await fetch("http://localhost/php-backend/save_item.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });
  
      console.log("Fetch response:", response); // Debug log
      const data = await response.json(); // Check if JSON parsing works
      console.log("Response from backend:", data);
  
      if (data.success) {
        alert(data.message);
        router.push("/Invenapp");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error saving item:", error);
      alert("An error occurred while saving the item.");
    }
  };
  

  return (
    <div className="p-8 w-full bg-white rounded-lg shadow-md">
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
            placeholder="₹ Eg. 50"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
            required
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

        <div className="flex justify-end space-x-4">
          <Link href="/Invenapp" className="px-6 py-2 border rounded-md text-gray-700">
            Back
          </Link>
          <button onClick={handleSave} className="px-6 py-2 bg-indigo-600 text-white rounded-md">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddItems;
