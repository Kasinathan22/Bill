"use client";
import React, { useState, useEffect } from 'react';
import debounce from 'lodash.debounce';

export default function ItemEntry({ setTotalAmount = () => {}, items = [], setItems = () => {} }) {
  const [rows, setRows] = useState(items.length > 0 ? items : [{
    itemName: '',
    hsn: '',
    quantity: '1',
    unit: '',
    price: '₹ 0.0',
    discount: '0',
    discount_type: '',
    gst: '0',
    cess: '0',
    taxableAmt: '₹ 0',
    amount: '₹ 0',
  }]);

  const [availableItems, setAvailableItems] = useState([]);

  useEffect(() => {
    fetch('http://localhost/php-backend/get_items.php')
      .then((response) => response.json())
      .then((data) => {
        if (data.success) setAvailableItems(data.items);
      })
      .catch((error) => console.error('Error fetching items:', error));
  }, []);

  const handleAddRow = () => {
    setRows([
      ...rows,
      {
        itemName: '',
        hsn: '',
        quantity: '1',
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

  const onItemInputChange = debounce((index, value) => {
    const selectedItem = availableItems.find((item) => item.name.toLowerCase() === value.toLowerCase());
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
        totalAmount: selectedItem.totalAmount
      };
    } else {
      newRows[index].itemName = value;
    }
    setRows(newRows);
  }, 300);

  const handleInputChange = (index, field, value) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    setRows(newRows);
  };

  const calculateTotalAmount = (price, gst, cess, discount, quantity) => {
    const gstAmount = (price * gst) / 100;
    const cessAmount = (price * cess) / 100;
    const discountAmount = ((price + gstAmount + cessAmount) * discount) / 100;
    const baseAmount = price * quantity;

    return baseAmount + gstAmount + cessAmount - discountAmount;
  };

  useEffect(() => {
    setItems(rows);
    const total = rows.reduce((acc, row) => {
      const price = parseFloat(row.price.replace(/[₹,\s]/g, '')) || 0;
      const gst = parseFloat(row.gst.replace(/[%\s]/g, '')) || 0;
      const cess = parseFloat(row.cess.replace(/[%\s]/g, '')) || 0;
      const discount = parseFloat(row.discount) || 0;
      const quantity = parseFloat(row.quantity) || 1; // Default to 1 if no quantity is provided

      return acc + calculateTotalAmount(price, gst, cess, discount, quantity);
    }, 0);
    setTotalAmount(total);
  }, [rows, setTotalAmount, setItems]);

  return (
    <div className="p-4 bg-white rounded-md shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Items</h2>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="text-left text-gray-500 text-xs">
            <th className="p-2 border border-gray-300 font-medium">Sl.No</th>
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
            const quantity = parseFloat(row.quantity) || 1;

            const totalAmount = calculateTotalAmount(price, gst, cess, discount, quantity);

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
                    {availableItems.map((item) => (
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
                <td className="p-2 border-b border-gray-300">
                  <input
                    type="text"
                    className="w-full bg-transparent outline-none"
                    value={`${row.discount_type} ${row.discount}`}
                    onChange={(e) => {
                      const [discountType, discountValue] = e.target.value.split(' ');
                      handleInputChange(index, 'discount_type', discountType.trim());
                      handleInputChange(index, 'discount', discountValue ? discountValue.trim() : '');
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
                  <button onClick={() => handleDeleteRow(index)} className="text-red-500">Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button onClick={handleAddRow} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">Add Row</button>
    </div>
  );
}
