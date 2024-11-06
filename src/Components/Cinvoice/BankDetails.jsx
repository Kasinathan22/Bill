"use client";
import { useState, useEffect } from 'react';

export default function BankDetails({ onBankDetailsChange }) {
  const [isEditing, setIsEditing] = useState(false);
  const [bankDetails, setBankDetails] = useState({
    bankName: 'Indusind Bank',
    accountHolderName: 'John Doe',
    accountNumber: '258447587715',
    ifsc: 'INDB0002090'
  });

  useEffect(() => {
    onBankDetailsChange(bankDetails); // Update parent with bank details on change
  }, [bankDetails, onBankDetailsChange]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBankDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  return (
    <div className="p-4 border-b">
      <h2 className="text-lg font-semibold mb-2">More Fields</h2>
  
      <div className="flex items-center p-4 border rounded-lg shadow-sm bg-white ">
        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mr-4">
          <img src="/assest/bank/bank.png" alt="Bank Icon" className="w-6 h-6" />
        </div>

        <div className="flex-1">
          <h3 className="text-gray-500 text-sm">Bank Account</h3>
          {isEditing ? (
            <input
              type="text"
              name="bankName"
              value={bankDetails.bankName}
              onChange={handleChange}
              className="border border-gray-300 p-1 rounded w-full"
              placeholder="Bank Name"
            />
          ) : (
            <p className="text-black font-semibold">{bankDetails.bankName}</p>
          )}
        </div>

        <div className="flex-1 pl-4">
          {isEditing ? (
            <input
              type="text"
              name="accountHolderName"
              value={bankDetails.accountHolderName}
              onChange={handleChange}
              className="border border-gray-300 p-1 rounded w-full mb-2"
              placeholder="Account Holder Name"
            />
          ) : (
            <p className="text-sm text-gray-600">A/C Holder: {bankDetails.accountHolderName}</p>
          )}
        </div>

        <div className="flex-1 border-l pl-4">
          {isEditing ? (
            <>
              <input
                type="text"
                name="accountNumber"
                value={bankDetails.accountNumber}
                onChange={handleChange}
                className="border border-gray-300 p-1 rounded w-full mb-2"
                placeholder="Account Number"
              />
              <input
                type="text"
                name="ifsc"
                value={bankDetails.ifsc}
                onChange={handleChange}
                className="border border-gray-300 p-1 rounded w-full"
                placeholder="IFSC Code"
              />
            </>
          ) : (
            <>
              <p className="text-sm text-gray-600">A/C No: {bankDetails.accountNumber}</p>
              <p className="text-sm text-gray-600">IFSC: {bankDetails.ifsc}</p>
            </>
          )}
        </div>

        <div className="flex items-end">
          {isEditing ? (
            <>
              <button onClick={handleSave} className="text-indigo-600 text-sm mr-2">Save</button>
              <button onClick={handleCancel} className="text-red-600 text-sm">Cancel</button>
            </>
          ) : (
            <a href="#" onClick={handleEditClick} className="text-indigo-600 text-sm">
              Go to bank details
            </a>
          )}
        </div>
      </div>
  
      <div className="mb-4 pt-5">
        <h4 className="font-semibold mb-2">Terms & Conditions</h4>
        <p className="text-sm">
          GOODS ONCE SOLD WILL NOT BE TAKEN BACK.<br />
          ALL DISPUTES WILL BE SUBJECT TO GHAZIABAD JURISDICTION.
        </p>
      </div>
  
      <div>
        <h4 className="font-semibold mb-2">Notes</h4>
        <p className="text-sm">This is a computer-generated invoice hence no signature required.</p>
      </div>
    </div>
  );
}
