"use client"
import React from 'react'
import Link from "next/link";



// components/Sidebar.js
export default function Sidebar() {
    return (
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">Inventory</h2>
        <div className="mb-6">
          <label className="block font-medium mb-2">Item Name</label>
          <input
            type="text"
            placeholder="Search here..."
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
  
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Item Type</h3>
          <div className="space-y-2">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" checked readOnly />
              Goods
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" checked readOnly />
              Service
            </label>
          </div>
        </div>
  
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Item Stock</h3>
          <div className="space-y-2">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Low quantity
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Out of stock
            </label>
          </div>
        </div>
      </div>
    );
  }
  
  