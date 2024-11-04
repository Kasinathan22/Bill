"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import SettingsPopup from '../Cinvoice/SettingsPopup';

const Cinvoice = ({ onSaveInvoice, onCustomerSelect, onInvoiceDetailsChange }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState('');
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isInvoiceSaved, setIsInvoiceSaved] = useState(false);
  const [invoiceName, setInvoiceName] = useState("KASHGARINV"); // Default invoice name
  const [invoiceNo, setInvoiceNo] = useState(""); // State for invoice number
  const [selectedFields, setSelectedFields] = useState([]); // State to hold selected fields
  const router = useRouter();

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  useEffect(() => {
    const fetchCustomers = async () => {
      if (searchQuery.trim() === "") {
        setSearchResults([]);
        return;
      }
      try {
        const response = await axios.get(
          "http://localhost/php-backend/searchCustomer.php",
          { params: { name: searchQuery } }
        );
        setSearchResults(response.data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };
    fetchCustomers();
  }, [searchQuery]);

  useEffect(() => {
    onInvoiceDetailsChange({
      invoiceName,
      invoiceNo,
      currentDate,
    });
  }, [invoiceName, invoiceNo, currentDate]);

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-GB');
    setCurrentDate(formattedDate);
  }, []);

  const handleSelectCustomer = (customer) => {
    setSelectedCustomer(customer);
    setSearchResults([]);
    setSearchQuery("");
    onCustomerSelect(customer);
  };

  const clearSelectedCustomer = () => {
    setSelectedCustomer(null);
    onCustomerSelect(null);
  };

  const handleSaveInvoice = () => {
    if (selectedCustomer) {
      setIsInvoiceSaved(true);
      onSaveInvoice();
    } else {
      alert("Please select a customer before saving the invoice.");
    }
  };

  const handleFieldSelection = (field, isSelected) => {
    if (isSelected) {
      setSelectedFields(prev => prev.filter(f => f !== field));
    } else {
      setSelectedFields(prev => [...prev, field]);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-8 mb-8">
      <header className="flex justify-between items-center mb-8">
        <div className="text-xl font-semibold">Bill From</div>
        <div className="flex items-center space-x-4">
          <button className="text-blue-500">Preview</button>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
            onClick={handleSaveInvoice}
          >
            Save Invoice
          </button>
          <button
            className="px-4 py-2 border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50"
            onClick={() => router.back()}
          >
            Back
          </button>
        </div>
      </header>

      <div className="grid grid-cols-2 gap-8">
        <div>
          <div className="bg-blue-600 text-white p-2 text-center w-32 rounded-lg mb-4">
            <Link href="/NCusapp">New Customer</Link>
          </div>
          <h2 className="text-lg font-medium mb-4">Bill To</h2>
          <input
            type="text"
            placeholder="Search by Customer Name"
            className="w-full border px-4 py-2 rounded-md shadow-sm mb-4"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchResults.length > 0 && (
            <ul className="bg-white border rounded-md shadow-md mb-4">
              {searchResults.map((customer) => (
                <li
                  key={customer.id}
                  className="p-2 border-b last:border-none cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSelectCustomer(customer)}
                >
                  {customer.name}
                </li>
              ))}
            </ul>
          )}

          {selectedCustomer && (
            <div className="bg-gray-100 p-4 rounded-md relative">
              <h3 className="font-medium text-lg mb-2">Customer Details</h3>
              <p><strong>Name:</strong> {selectedCustomer.name}</p>
              <p><strong>Phone:</strong> {selectedCustomer.phone}</p>
              <p><strong>Email:</strong> {selectedCustomer.email}</p>
              <p><strong>GSTIN:</strong> {selectedCustomer.gstin}</p>
              <p><strong>Billing Address:</strong> {selectedCustomer.billing_address}</p>
              <p><strong>Shipping Address:</strong> {selectedCustomer.shipping_address}, {selectedCustomer.shipping_city}, {selectedCustomer.shipping_state}, {selectedCustomer.shipping_pincode}</p>
              <button
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                onClick={clearSelectedCustomer}
              >
                &times;
              </button>
            </div>
          )}
        </div>

        <div className="bg-gray-50 p-6 rounded-md">
          <h2 className="text-lg font-medium mb-4">Invoice Details</h2>
          <div className="space-y-4">
          <div className="flex justify-between">
          <span className="text-gray-700">Invoice No</span>
          <input
            type="text"
            className="border px-2 py-1 rounded-md border-black"
            value={invoiceNo}
            onChange={(e) => setInvoiceNo(e.target.value)}
          />
        </div>
        <div className="flex justify-between">
          <span className="text-gray-700">Date</span>
          <span className="text-blue-600">{currentDate}</span>
        </div>
           
            <div className="flex justify-between">
              <span className="text-gray-700">Full Invoice Identifier</span>
              <span className="text-blue-600">{`${invoiceName}${invoiceNo}`}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Date</span>
              <span className="text-blue-600">{currentDate}</span>
            </div>

            {selectedFields.includes("Vehicle Number") && (
              <div className="flex justify-between">
                <span className="text-gray-700">Vehicle Number</span>
                <input
                  type="text"
                  placeholder="eg. GA-02-5744"
                  className="border px-2 py-1 rounded-md"
                  value={vechicleNo}
                  onChange={(e) => setvechicleNo(e.target.value)}
                />
              </div>
            )}
            {selectedFields.includes("Dispatch Number") && (
              <div className="flex justify-between">
                <span className="text-gray-700">Dispatch Number</span>
                <input
                  type="text"
                  placeholder=""
                  className="border px-2 py-1 rounded-md"
                />
              </div>
            )}
            {selectedFields.includes("PO Date") && (
              <div className="flex justify-between">
                <span className="text-gray-700">PO Date</span>
                <input
                  type="date"
                  className="border px-2 py-1 rounded-md"
                />
              </div>
            )}
            {selectedFields.includes("Supply Type") && (
              <div className="flex justify-between">
                <span className="text-gray-700">Supply Type</span>
                <input
                  type="text"
                  placeholder=""
                  className="border px-2 py-1 rounded-md"
                />
              </div>
            )}
            {selectedFields.includes("Sales Person") && (
              <div className="flex justify-between">
                <span className="text-gray-700">Sales Person</span>
                <input
                  type="text"
                  placeholder=""
                  className="border px-2 py-1 rounded-md"
                />
              </div>
            )}
            {selectedFields.includes("Transporter") && (
              <div className="flex justify-between">
                <span className="text-gray-700">Transporter</span>
                <input
                  type="text"
                  placeholder=""
                  className="border px-2 py-1 rounded-md"
                />
              </div>
            )}
            {selectedFields.includes("PO Number") && (
              <div className="flex justify-between">
                <span className="text-gray-700">PO Number</span>
                <input
                  type="text"
                  placeholder=""
                  className="border px-2 py-1 rounded-md"
                />
              </div>
            )}

            <button
              onClick={togglePopup}
              className="text-blue-500 flex items-center mt-4"
            >
              <span className="text-lg mr-1">+</span> Add/Edit Field
            </button>
          </div>
        </div>
      </div>
      
      <SettingsPopup 
        isOpen={isPopupOpen} 
        onClose={togglePopup} 
        selectedFields={selectedFields}
        onFieldChange={handleFieldSelection}
      />
    </div>
  );
};

export default Cinvoice;
