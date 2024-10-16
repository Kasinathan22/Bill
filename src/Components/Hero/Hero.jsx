"use client";
import React, { useState } from "react";
import Link from "next/link";


const Hero = () => {


  const allInvoices = [
    {
      number: "KASHGARINV24114",
      status: "Not Sent",
      date: "2024-10-14",
      customer: "I.F. Enterprises",
      amount: "₹10,000.00",
      balance: "₹5,000.00",
      paymentStatus: "Pending",
      linkedDocs: "View Docs",
    },
    {
      number: "KASHGARINV24113",
      status: "Sent",
      date: "2024-10-13",
      customer: "ZEDLOGIC",
      amount: "₹20,000.00",
      balance: "₹20,000.00",
      paymentStatus: "Unpaid",
      linkedDocs: "View Docs",
    },
    {
      number: "KASHGARINV24112",
      status: "Viewed by Customer",
      date: "2024-10-13",
      customer: "Mohd. Rizwan",
      amount: "₹15,000.00",
      balance: "₹10,000.00",
      paymentStatus: "Partially Paid",
      linkedDocs: "View Docs",
    },
  ];

  // State management for filters
  const [filteredInvoices, setFilteredInvoices] = useState(allInvoices);
  const [customerName, setCustomerName] = useState("");
  const [customerGSTIN, setCustomerGSTIN] = useState("");
  const [statusFilter, setStatusFilter] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Handle checkbox filtering
  const handleStatusChange = (status) => {
    setStatusFilter((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  // Filter logic
  const applyFilters = () => {
    let filtered = allInvoices;

    if (customerName) {
      filtered = filtered.filter((invoice) =>
        invoice.customer.toLowerCase().includes(customerName.toLowerCase())
      );
    }

    if (statusFilter.length > 0) {
      filtered = filtered.filter((invoice) =>
        statusFilter.includes(invoice.status)
      );
    }

    if (startDate && endDate) {
      filtered = filtered.filter(
        (invoice) =>
          new Date(invoice.date) >= new Date(startDate) &&
          new Date(invoice.date) <= new Date(endDate)
      );
    }

    setFilteredInvoices(filtered);
  };

  // Clear all filters
  const clearFilters = () => {
    setCustomerName("");
    setCustomerGSTIN("");
    setStatusFilter([]);
    setStartDate("");
    setEndDate("");
    setFilteredInvoices(allInvoices); // Reset to all invoices
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold">Invoices</h1>
        
        <Link href='/Createinvoice' className="bg-blue-600 text-white px-4 py-2 rounded-md">
          Create an Invoice
        </Link>
      
      </header>

      <div className="flex space-x-8">
        {/* Sidebar */}
        <aside className="w-1/4 space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Date Range</label>
            <div className="flex space-x-2">
              <input
                type="date"
                className="border px-3 py-2 rounded-md"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <input
                type="date"
                className="border px-3 py-2 rounded-md"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Customer Name</label>
            <input
              type="text"
              className="border w-full px-3 py-2 rounded-md"
              placeholder="Search here..."
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Customer GSTIN</label>
            <input
              type="text"
              className="border w-full px-3 py-2 rounded-md"
              placeholder="Search here..."
              value={customerGSTIN}
              onChange={(e) => setCustomerGSTIN(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Invoice Status</label>
            <div className="space-y-2">
              {["Not Sent", "Sent", "Viewed by Customer", "Cancelled"].map(
                (status) => (
                  <div key={status}>
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={statusFilter.includes(status)}
                      onChange={() => handleStatusChange(status)}
                    />
                    <label>{status}</label>
                  </div>
                )
              )}
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
              onClick={applyFilters}
            >
              Apply Filters
            </button>
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded-md mt-4"
              onClick={clearFilters}
            >
              Clear All Filters
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="w-3/4 overflow-auto" style={{ maxHeight: "500px" }}>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">Select</th>
                <th className="border px-4 py-2">Invoice Number</th>
                <th className="border px-4 py-2">Invoice Status</th>
                <th className="border px-4 py-2">Invoice Date</th>
                <th className="border px-4 py-2">Customer Name</th>
                <th className="border px-4 py-2">Invoice Amount</th>
                <th className="border px-4 py-2">Balance Due</th>
                <th className="border px-4 py-2">Payment Status</th>
                <th className="border px-4 py-2">Linked Docs</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.number}>
                  <td className="border px-4 py-2">
                    <input type="checkbox" />
                  </td>
                  <td className="border px-4 py-2 text-blue-500">
                    {invoice.number}
                  </td>
                  <td className="border px-4 py-2">
                    <span className="bg-yellow-100 text-yellow-600 px-2 py-1 rounded-md">
                      {invoice.status}
                    </span>
                  </td>
                  <td className="border px-4 py-2">{invoice.date}</td>
                  <td className="border px-4 py-2">{invoice.customer}</td>
                  <td className="border px-4 py-2">{invoice.amount}</td>
                  <td className="border px-4 py-2">{invoice.balance}</td>
                  <td className="border px-4 py-2">{invoice.paymentStatus}</td>
                  <td className="border px-4 py-2 text-blue-500 cursor-pointer">
                    {invoice.linkedDocs}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>
    </div>
  );
};

export default Hero;
