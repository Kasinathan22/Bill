"use client";
import React, { useState, useEffect } from 'react';
import debounce from 'lodash.debounce'; // Optional: You can use lodash for debouncing

export default function ItemEntry({ setTotalAmount }) {
  const [rows, setRows] = useState([
    {
      itemName: '',
      hsn: '',
      quantity: '',
      unit: '',
      price: '₹ 0.0',
      discount: '0',
      discount_type: '',
      gst: '0',
      cess: '0',
      taxableAmt: '₹ 0',
      amount: '₹ 0',
    },
  ]);

  const [items, setItems] = useState([]);

  // Fetch items from the server
  useEffect(() => {
    fetch('http://localhost/php-backend/get_items.php') // Update this URL to your actual endpoint
      .then((response) => response.json())
      .then((data) => {
        if (data.success) setItems(data.items);
      })
      .catch((error) => console.error('Error fetching items:', error));
  }, []);

  const handleAddRow = () => {
    setRows([
      ...rows,
      {
        itemName: '',
        hsn: '',
        quantity: '',
        unit: '',
        price: '₹ 0.0',
        discount: '0',
        gst: '% 0',
        cess: '% 0',
        taxableAmt: '₹ 0',
        amount: '₹ 0',
      },
    ]);
  };

  const handleDeleteRow = (index) => {
    const newRows = rows.filter((_, i) => i !== index);
    setRows(newRows);
  };

  // Use debounce to limit how often `onItemInputChange` runs
  const onItemInputChange = debounce((index, value) => {
    const selectedItem = items.find((item) => item.name.toLowerCase() === value.toLowerCase());
    const newRows = [...rows];
    if (selectedItem) {
      newRows[index] = {
        ...newRows[index],
        itemName: selectedItem.name,
        hsn: selectedItem.hsn_sac,
        price: `₹ ${selectedItem.price}`,
        discount: `${selectedItem.discount}`,
        discount_type: selectedItem.discount_type,
        gst: `% ${selectedItem.gst_rate}`,
        cess: `% ${selectedItem.cess_rate}`,
        unit: selectedItem.unit,
      };
    } else {
      newRows[index].itemName = value;
    }
    setRows(newRows);
  }, 300); // Adjust debounce timing as needed

  const handleInputChange = (index, field, value) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    setRows(newRows);
  };

  const calculateTotalAmount = (price, gst, cess, discount) => {
    const gstAmount = (price * gst) / 100;
    const cessAmount = (price * cess) / 100;
    const discountAmount = ((price + gstAmount + cessAmount) * discount) / 100;

    return price + gstAmount + cessAmount - discountAmount;
  };
  useEffect(() => {
    const total = rows.reduce((acc, row) => {
      const price = parseFloat(row.price.replace(/[₹,\s]/g, '')) || 0;
      const gst = parseFloat(row.gst.replace(/[%\s]/g, '')) || 0;
      const cess = parseFloat(row.cess.replace(/[%\s]/g, '')) || 0;
      const discount = parseFloat(row.discount) || 0;

      return acc + calculateTotalAmount(price, gst, cess, discount);
    }, 0);
    setTotalAmount(total); // Update the total amount in the parent
  }, [rows, setTotalAmount]);


  return (
    <div className="p-4 bg-white rounded-md shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Items</h2>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="text-left text-gray-500 text-xs">
            <th className="p-2 border border-gray-300 font-medium">#</th>
            <th className="p-2 border border-gray-300 font-medium">ITEM NAME *</th>
            <th className="p-2 border border-gray-300 font-medium">HSN *</th>
            <th className="p-2 border border-gray-300 font-medium">QUANTITY *</th>
            <th className="p-2 border border-gray-300 font-medium">UNIT *</th>
            <th className="p-2 border border-gray-300 font-medium">PRICE/UNIT*</th>
            <th className="p-2 border border-gray-300 font-medium">DISCOUNT</th>
            <th className="p-2 border border-gray-300 font-medium">GST</th>
            <th className="p-2 border border-gray-300 font-medium">CESS</th>
            <th className="p-2 border border-gray-300 font-medium">TAXABLE AMT</th>
            <th className="p-2 border border-gray-300 font-medium">AMOUNT</th>
            <th className="p-2 border border-gray-300 font-medium">ACTIONS</th>
          </tr>
        </thead>
       

          
              <tbody>
              {rows.map((row, index) => {
                const price = parseFloat(row.price.replace(/[₹,\s]/g, '')) || 0;
                const gst = parseFloat(row.gst.replace(/[%\s]/g, '')) || 0;
                const cess = parseFloat(row.cess.replace(/[%\s]/g, '')) || 0;
                const discount = parseFloat(row.discount) || 0;
    
                const totalAmount = calculateTotalAmount(price, gst, cess, discount);
    
                return (
              <tr key={index} className="bg-gray-50 text-gray-700">
                <td className="p-2 border border-gray-300">{index + 1}</td>
                <td className="p-2 border border-gray-300">
                  <input
                    type="text"
                    list={`item-options-${index}`}
                    placeholder="Start by typing first item name here"
                    className="w-full bg-transparent outline-none placeholder-gray-400"
                    value={row.itemName}
                    onChange={(e) => onItemInputChange(index, e.target.value)}
                  />
                  <datalist id={`item-options-${index}`}>
                    {items.map((item) => (
                      <option key={item.id} value={item.name} />
                    ))}
                  </datalist>
                </td>
                <td className="p-2 border border-gray-300">
                  <input
                    type="text"
                    className="w-full bg-transparent outline-none placeholder-gray-400"
                    value={row.hsn}
                    onChange={(e) => handleInputChange(index, 'hsn', e.target.value)}
                  />
                </td>
                <td className="p-2 border border-gray-300">
                  <input
                    type="number"
                    placeholder="Quantity"
                    className="w-full bg-transparent outline-none placeholder-gray-400"
                    value={row.quantity}
                    onChange={(e) => handleInputChange(index, 'quantity', e.target.value)}
                  />
                </td>
                <td className="p-2 border border-gray-300">
                  <input
                    type="text"
                    className="w-full bg-transparent outline-none"
                    value={row.unit}
                    onChange={(e) => handleInputChange(index, 'unit', e.target.value)}
                  />
                </td>
                <td className="p-2 border border-gray-300">
                  <input
                    type="text"
                    className="w-full bg-transparent outline-none"
                    value={row.price}
                    onChange={(e) => handleInputChange(index, 'price', e.target.value)}
                  />
                </td>
                <td className="p-2 border-b border-gray-300  ">
                {/* <input
                    type="text"
                    className="w-full bg-transparent outline-none"
                    value={row.discount_type}
                    onChange={(e) => handleInputChange(index, 'discount_type', e.target.value)}
                  /> */}
                  
                  <input
  type="text"
  className="w-full bg-transparent outline-none"
  value={`${row.discount_type} ${row.discount}`} // Concatenating the discount type and value
  onChange={(e) => {
    const [discountType, discountValue] = e.target.value.split('. ');
    handleInputChange(index, 'discount_type', discountType.trim()); // Update discount type
    handleInputChange(index, 'discount', discountValue ? discountValue.trim() : ''); // Update discount value
  }}
/>

                </td>
                <td className="p-2 border border-gray-300">
                  <input
                    type="text"
                    className="w-36 bg-transparent outline-none"
                    value={row.gst}
                    onChange={(e) => handleInputChange(index, 'gst', e.target.value)}
                  />
                </td>
                <td className="p-2 border border-gray-300">
                  <input
                    type="text"
                    className="w-36 bg-transparent outline-none"
                    value={row.cess}
                    onChange={(e) => handleInputChange(index, 'cess', e.target.value)}
                  />
                </td>
                <td className="p-2 border border-gray-300">{row.price}</td>
                <td className="p-2 border border-gray-300">{totalAmount.toFixed(2)}</td>
                <td className="p-2 border border-gray-300">
                  <button
                    className="text-red-500"
                    onClick={() => handleDeleteRow(index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="p-2 border-t mt-4 text-center">
        <button onClick={handleAddRow} className="text-blue-600">+ ADD ITEM</button>
      </div>
    </div>
  );
}
