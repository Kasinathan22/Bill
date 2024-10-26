import React from 'react';

const InventoryTable = ({ items, onEditClick }) => (
  <table className="min-w-full bg-white border border-gray-300">
  <thead>
    <tr>
      <th className="py-2 px-4 border-b border-r">Name</th>
      <th className="py-2 px-4 border-b border-r">Price</th>
      <th className="py-2 px-4 border-b border-r">Item Type</th>
      <th className="py-2 px-4 border-b border-r">Unit</th>
      <th className="py-2 px-4 border-b border-r">hsn_sac</th>
      <th className="py-2 px-4 border-b">Actions</th>
    </tr>
  </thead>
  <tbody>
    {items.map((item) => (
      <tr key={item.id}>
        <td className="py-2 px-4 border-b border-r">{item.name}</td>
        <td className="py-2 px-4 border-b border-r">{item.price}</td>
        <td className="py-2 px-4 border-b border-r">{item.item_type}</td>
        <td className="py-2 px-4 border-b border-r">{item.unit}</td>
        <td className="py-2 px-4 border-b border-r">{item.hsn_sac}</td>
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
