'use client';
import { useState } from 'react';

const ItemEntry = ({ onTotalChange }) => {
  const [items, setItems] = useState([
    { id: 1, name: '', hsn: '', qty: 0, unit: '', price: 0, discount: 0, gst: 0, cess: 0, total: 0 },
  ]);

  const addItem = () => {
    setItems([
      ...items,
      { id: items.length + 1, name: '', hsn: '', qty: 0, unit: '', price: 0, discount: 0, gst: 0, cess: 0, total: 0 },
    ]);
  };

  const handleInputChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;

    // Recalculate total
    const { qty, price, discount, gst, cess } = updatedItems[index];
    updatedItems[index].total =
      qty * price - discount + parseFloat(gst) + parseFloat(cess);

    setItems(updatedItems);

    // Calculate total amount and pass it to parent component
    const totalAmount = updatedItems.reduce((sum, item) => sum + item.total, 0);
    onTotalChange(totalAmount);
  };

  const removeItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);

    // Update total amount after removing an item
    const totalAmount = updatedItems.reduce((sum, item) => sum + item.total, 0);
    onTotalChange(totalAmount);
  };

  const handleSaveInvoice = () => {
    if (selectedCustomer) {
        setIsInvoiceSaved(true); // Set the state to true on save click
        
        // Construct the query string using URLSearchParams
        const query = new URLSearchParams({
            name: selectedCustomer.name,
            phone: selectedCustomer.phone,
            email: selectedCustomer.email,
            gstin: selectedCustomer.gstin,
        }).toString();

        // Redirect to the next page with customer details
        router.push(`/savedinvoice?${query}`);
    } else {
        alert("Please select a customer before saving the invoice.");
    }
};


  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-xl font-semibold mb-4">Items</h1>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 p-2">#</th>
              <th className="border border-gray-300 p-2">Item Name</th>
              <th className="border border-gray-300 p-2">HSN</th>
              <th className="border border-gray-300 p-2">Quantity</th>
              <th className="border border-gray-300 p-2">Unit</th>
              <th className="border border-gray-300 p-2">Price/Unit</th>
              <th className="border border-gray-300 p-2">Discount</th>
              <th className="border border-gray-300 p-2">GST</th>
              <th className="border border-gray-300 p-2">CESS</th>
              <th className="border border-gray-300 p-2">Total</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={item.id}>
                <td className="border border-gray-300 p-2 text-center">{item.id}</td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="text"
                    className="w-fullrounded-md p-1"
                    value={item.name}
                    onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                    placeholder="Enter item name"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md p-1"
                    value={item.hsn}
                    onChange={(e) => handleInputChange(index, 'hsn', e.target.value)}
                    placeholder="HSN"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded-md p-1"
                    value={item.qty}
                    onChange={(e) => handleInputChange(index, 'qty', parseFloat(e.target.value))}
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md p-1"
                    value={item.unit}
                    onChange={(e) => handleInputChange(index, 'unit', e.target.value)}
                    placeholder="Unit"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded-md p-1"
                    value={item.price}
                    onChange={(e) => handleInputChange(index, 'price', parseFloat(e.target.value))}
                    step="0.01"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded-md p-1"
                    value={item.discount}
                    onChange={(e) => handleInputChange(index, 'discount', parseFloat(e.target.value))}
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded-md p-1"
                    value={item.gst}
                    onChange={(e) => handleInputChange(index, 'gst', parseFloat(e.target.value))}
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded-md p-1"
                    value={item.cess}
                    onChange={(e) => handleInputChange(index, 'cess', parseFloat(e.target.value))}
                  />
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {item.total.toFixed(2)}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  <button
                    onClick={() => removeItem(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        onClick={addItem}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        + Add Item
      </button>
    </div>
  );
};

export default ItemEntry;
