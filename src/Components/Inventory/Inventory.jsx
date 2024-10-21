"use client"
import React from 'react'
import Link from "next/link";

// components/InventoryTable.js
const items = [
    { name: "Air Conditioner | Used Air Conditioner |", type: "Service", price: "₹48,999.00", unit: "GRS", },
    { name: "Prexo Laptop", type: "Goods", price: "₹11,940.00", unit: "UNT", },
    { name: "Air Conditioner | Used", type: "Goods", price: "₹5,300.00", unit: "UNT", },
    { name: "Refrigerator | Used", type: "Goods", price: "₹2,200.00", unit: "UNT" },
    { name: "Microwave | Used", type: "Goods", price: "₹700.00", unit: "UNT" },
    { name: "Reimbursement", type: "Service", price: "₹4,09,000.00", unit: "OTH" },
  ];
  
  export default function Inventory() {
    return (
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm text-gray-500">
            <span className="font-medium">ITEM TYPE:</span> Goods/Service
          </div>
          <div>
            <button className="px-4 py-2 bg-gray-100 border rounded-md mr-2">Actions</button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md">Add an Item</button>
          </div>
        </div>
  
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2"><input type="checkbox" /></th>
              <th className="border px-4 py-2">Item Name</th>
              <th className="border px-4 py-2">Item Type</th>
              <th className="border px-4 py-2">Price/Unit</th>
              <th className="border px-4 py-2">Unit</th>
              <th className="border px-4 py-2">Quantity</th>
              <th className="border px-4 py-2">SKU </th>
             
              <th className="border px-4 py-2">HSN/SAC </th>
              <th className="border px-4 py-2">Action</th>
              
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td className="border px-4 py-2"><input type="checkbox" /></td>
                <td className="border px-4 py-2">{item.name}</td>
                <td className="border px-4 py-2">{item.type}</td>
                <td className="border px-4 py-2">{item.price}</td>
                <td className="border px-4 py-2">{item.unit}</td>
                <td className="border px-4 py-2">{item.SKUCode}</td>
                <td className="border px-4 py-2">{item.HSN }</td>
                <td className="border px-4 py-2">{item.Action}</td>

                <td className="border px-4 py-2">-</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  
  
