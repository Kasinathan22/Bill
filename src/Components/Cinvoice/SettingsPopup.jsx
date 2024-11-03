import { useState } from 'react';

const SettingsPopup = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState("Invoice Details");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-end items-start z-50">
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black opacity-50" 
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white w-96 p-6 overflow-y-auto shadow-lg">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-500"
          onClick={onClose}
        >
          &times;
        </button>

        {/* Header */}
        <h2 className="text-xl font-semibold mb-4">Invoice Settings</h2>

        {/* Tabs */}
        <div className="flex border-b mb-4">
          <button
            onClick={() => setActiveTab("Invoice Details")}
            className={`px-4 py-2 ${activeTab === "Invoice Details" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"}`}
          >
            General Settings
          </button>
          <button
            onClick={() => setActiveTab("Item Table")}
            className={`px-4 py-2 ${activeTab === "Item Table" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"}`}
          >
            Item Table
          </button>
        </div>

        {/* Conditional Content */}
        {activeTab === "Invoice Details" && (
          <div className=''>
            <div>
              <h1>Invoice Name</h1>
              <input
                type="text"
                placeholder="Enter invoice name..."
                className="w-full border rounded-md p-2 mb-4"
              />
            </div>
            <div>
              <h1>Invoice Number</h1>
              <input
                type="text"
                placeholder="Enter invoice number..."
                className="w-full border rounded-md p-2 mb-4"
              />
            </div>
          </div>
        )}

        {activeTab === "Item Table" && (
          <div className="space-y-4">
            {["Vehicle Number", "Dispatch Number", "PO Date", "Supply Type", "Sales Person", "Transporter", "PO Number"].map((field, index) => (
              <div key={index} className="flex items-center justify-between">
                <span>{field}</span>
                <input
                  type="checkbox"
                  className="toggle-checkbox"
                />
              </div>
            ))}
          </div>
        )}

        {/* Add Custom Field Button */}
        <button className="mt-6 text-blue-500 flex items-center">
          <span className="text-lg mr-1">+</span> New Custom Field
        </button>
      </div>
    </div>
  );
};

export default SettingsPopup;
