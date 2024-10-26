import React from 'react';

const InventoryTable = ({ items, onEditClick }) => (
  <table className="min-w-full bg-white border border-gray-300">
    <thead>
      <tr>
        <th className="py-2 px-4 border-b">Name</th>
        <th className="py-2 px-4 border-b">Quantity</th>
        <th className="py-2 px-4 border-b">Price</th>
        <th className="py-2 px-4 border-b">Actions</th>
      </tr>
    </thead>
    <tbody>
      {items.map((item) => (
        <tr key={item.id}>
          <td className="py-2 px-4 border-b">{item.name}</td>
          <td className="py-2 px-4 border-b">{item.hsc_code}</td>
          <td className="py-2 px-4 border-b">{item.price}</td>
          <td className="py-2 px-4 border-b">
            <button 
              onClick={() => onEditClick(item)}
              className="text-blue-600 hover:underline"
            >
              Edit
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default InventoryTable;
