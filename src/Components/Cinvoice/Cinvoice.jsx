"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from 'next/navigation';

const Cinvoice = () => {
    const router = useRouter();
  const [showPopup, setShowPopup] = useState(false); // State to manage popup visibility
  const [activeTab, setActiveTab] = useState("General"); // Track main tab
  const [customFieldTab, setCustomFieldTab] = useState("InvoiceDetails"); // Sub-tab for Custom Fields

  const togglePopup = () => setShowPopup(!showPopup);

  const switchTab = (tab) => setActiveTab(tab);

  const switchCustomFieldTab = (tab) => setCustomFieldTab(tab);

  return (
    <div className="relative min-h-screen bg-gray-50 p-8">
         <header className="flex justify-between items-center mb-8 relative z-20">
        <div className="text-xl font-semibold">Bill From</div>
        <div className="flex items-center space-x-4">
          <button className="text-blue-500">Preview</button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md">
            Save Invoice
          </button>
          <button
          className="px-4 py-2 border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50"
          onClick={() => router.back()} // Navigate back
        >
          Back
        </button>
        </div>
      </header>

      <div className="grid grid-cols-2 gap-8 relative z-20">
        <div className="p-6">
          <h2 className="text-lg font-medium mb-4">Bill To</h2>
          <input
            type="text"
            placeholder="Search by Customer Name"
            className="w-full border px-4 py-2 rounded-md shadow-sm"
          />

        <div className="mt-10 text-white border-blue-800 p-2 w-36 rounded-lg bg-blue-600">
          <Link href="/NCusapp">
          New Customber
          </Link>
          </div>
        </div>

        <div className="p-6 bg-white shadow-md rounded-md">
        {showPopup && <div className="fixed inset-0 bg-black bg-opacity-50 z-10"></div>}

          <h2 className="text-lg font-medium mb-4">Invoice Details</h2>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-700">Invoice No.</span>
              <span className="text-blue-600">KASHGARINV54</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-700">Date</span>
              <span className="text-blue-600">16/10/2024</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-700">Vehicle Number</span>
              <input
                type="text"
                placeholder="eg. GA-02-5744"
                className="border px-2 py-1 rounded-md"
              />
            </div>

            <button
              onClick={togglePopup}
              className="text-blue-500 flex items-center mt-4"
            >
              <span className="text-lg mr-1">+</span> Add/Edit Field
            </button>
          </div>
        </div>
      </div>

      <div
        className={`fixed top-0 right-0 h-full w-1/3 bg-white shadow-lg rounded-l-md transform transition-transform duration-300 z-30 ${
          showPopup ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 flex flex-col h-full">
          {/* Main Tabs */}
          <div className="flex border-b mb-4">
            <button
              onClick={() => switchTab("General")}
              className={`flex-1 py-2 text-center ${
                activeTab === "General" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500"
              }`}
            >
              General Settings
            </button>
            <button
              onClick={() => switchTab("Custom")}
              className={`flex-1 py-2 text-center ${
                activeTab === "Custom" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500"
              }`}
            >
              Custom Fields
            </button>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto">
            {activeTab === "General" && (
              <div className="space-y-4">
                <div className="flex justify-between">
                  <label className="text-gray-700">Invoice Prefix</label>
                  <input
                    type="text"
                    defaultValue="KASHGARINV"
                    className="border px-2 py-1 rounded-md"
                  />
                </div>

                <div className="flex justify-between">
                  <label className="text-gray-700">Invoice Number</label>
                  <input
                    type="text"
                    defaultValue="54"
                    className="border px-2 py-1 rounded-md"
                  />
                </div>
              </div>
            )}

            {activeTab === "Custom" && (
              <>
                {/* Sub-tabs for Custom Fields */}
                <div className="flex mb-4">
                  <button
                    onClick={() => switchCustomFieldTab("InvoiceDetails")}
                    className={`flex-1 py-2 text-center ${
                      customFieldTab === "InvoiceDetails" ? "bg-gray-200" : ""
                    }`}
                  >
                    Invoice Details
                  </button>
                  <button
                    onClick={() => switchCustomFieldTab("ItemTable")}
                    className={`flex-1 py-2 text-center ${
                      customFieldTab === "ItemTable" ? "bg-gray-200" : ""
                    }`}
                  >
                    Item Table
                  </button>
                </div>

                {/* Custom Fields Content */}
                {customFieldTab === "InvoiceDetails" && (
                  <div className="space-y-2">
                    {[
                      "Vehicle Number",
                      "Dispatch Number",
                      "PO Date",
                      "Supply Type",
                      "Sales Person",
                      "Transporter",
                      "PO Number",
                    ].map((field) => (
                      <div key={field} className="flex justify-between items-center">
                        <span>{field}</span>
                        <input type="checkbox" className="toggle-checkbox" />
                      </div>
                    ))}

                    <button className="mt-4 text-blue-500 border border-dashed border-blue-500 rounded-md w-full py-2">
                      + New Custom Field
                    </button>
                  </div>
                )}

                {customFieldTab === "ItemTable" && (
                  <div className="space-y-2">
                    <p>Item Table content goes here...</p>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Cancel and Save Buttons */}
          <div className="mt-6 flex justify-end space-x-2">
            <button
              onClick={togglePopup}
              className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={togglePopup}
              className="bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cinvoice;
