import React from 'react'


export default function BankDetails() {
    return (
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold mb-2">More Fields</h2>
  
        <div className="bg-indigo-50 p-4 rounded-md mb-4 flex justify-between items-center">
          <div>
            <p className="text-sm">Invoices with payment links get paid 3x faster!</p>
          </div>
          <a href="#" className="text-indigo-600 text-sm font-medium">Enable payment links</a>
        </div>
  
        <div className="border p-4 rounded-md mb-4 flex items-center">
          <div className="mr-4">
            <img src="/bank-icon.png" alt="Bank Icon" className="w-10 h-10" />
          </div>
          <div>
            <h3 className="font-semibold">Bank Account</h3>
            <p className="text-sm">Indusind Bank</p>
            <p className="text-sm text-gray-500">A/C No: 258447587715</p>
            <p className="text-sm text-gray-500">IFSC: INDB0002090</p>
            <a href="#" className="text-indigo-600 text-sm">Go to bank details</a>
          </div>
        </div>
  
        <div className="mb-4">
          <h4 className="font-semibold mb-2">Terms & Conditions</h4>
          <p className="text-sm">
            GOODS ONCE SOLD WILL NOT BE TAKEN BACK.<br />
            ALL DISPUTES WILL BE SUBJECT TO GHAZIABAD JURISDICTION.
          </p>
        </div>
  
        <div>
          <h4 className="font-semibold mb-2">Notes</h4>
          <p className="text-sm">This is computer generated invoice hence no signature required.</p>
        </div>
      </div>
    );
  }
  
