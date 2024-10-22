"use client";
import Link from 'next/link';
import React, { useState } from 'react';

const AddItems = () => {

  const [itemType, setItemType] = useState('goods');
  

 

  return (
    <div className="p-8 w-full bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6">Edit Item</h2>

      <div className="flex space-x-6 mb-4">
        <label className="flex items-center">
          <input
            type="radio"
            name="itemType"
            value="goods"
            checked={itemType === 'goods'}
            onChange={() => setItemType('goods')}
            className="form-radio h-5 w-5 text-indigo-600"
          />
          <span className="ml-2 text-sm font-medium">Goods</span>
        </label>

        <label className="flex items-center">
          <input
            type="radio"
            name="itemType"
            value="service"
            checked={itemType === 'service'}
            onChange={() => setItemType('service')}
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
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Description (Optional)
        </label>
        <textarea
          placeholder="Type about the item here"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
        ></textarea>
      </div>

      <div className="flex border-b mb-4">
        <button className="px-4 py-2 font-semibold border-b-2 border-indigo-500">
          Pricing Details
        </button>
        <button className="px-4 py-2 font-semibold">Stock Details</button>
        <button className="px-4 py-2 font-semibold">Stock History</button>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Price per unit *</label>
        <input
          type="number"
          placeholder="₹ Eg. 66"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
        />
      </div>

      <div className="flex space-x-4 mb-4">
        <div className="w-1/2">
          <label className="block text-sm font-medium mb-1">Unit *</label>
          <select className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300">
            <option value="kilograms">Kilograms</option>
            <option value="liters">Liters</option>
            <option value="units">Units</option>
          </select>
        </div>

        <div className="w-1/2">
          <label className="block text-sm font-medium mb-1">Discount</label>
          <div className="flex">
            <input
              type="number"
              placeholder="0"
              className="w-2/3 px-4 py-2 border rounded-l-md focus:outline-none focus:ring focus:ring-indigo-300"
            />
            <select className="w-1/3 px-4 py-2 border rounded-r-md focus:outline-none focus:ring focus:ring-indigo-300">
              <option value="%">%</option>
              <option value="₹">₹</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
       
        
         <Link href={'/Invenapp'} className="px-6 py-2 text-gray-700 border rounded-md hover:bg-gray-100">
          Back
          </Link>
        
        <button className="px-6 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
          Save
        </button>
      </div>
    </div>
  );
};

export default AddItems;
