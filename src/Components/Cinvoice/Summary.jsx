import React from 'react';

export default function Summary({ totalAmount }) {
  return (
    <div className="p-4 border rounded-md">
      <h2 className="text-lg font-semibold mb-4">Summary</h2>

      <div className="mb-4 flex justify-between">
        <p className="text-sm">Taxable Amount</p>
        <p className="text-xl font-semibold">₹{totalAmount.toFixed(2)}</p>
      </div>

      {/* <div className="flex items-center mb-4">
        <p className="text-sm mr-2">Round Off</p>
        <input type="checkbox" className="toggle-checkbox" />
      </div> */}

      <div className="mb-4">
        <button className="text-indigo-600 text-sm font-medium mb-2">+ Additional Charges</button>
        <button className="text-indigo-600 text-sm font-medium">+ Discount</button>
      </div>

      <div className="border-t pt-2">
        <p className="text-lg font-semibold">Total</p>
        <p className="text-xl font-semibold">₹{totalAmount.toFixed(2)}</p>
      </div>

      <div className="mt-4">
        <h4 className="font-semibold mb-2">For Director</h4>
        <p className="text-sm">Saurav Singh Chaudhary</p>
      </div>
    </div>
  );
}
