"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import axios from 'axios'; // Add axios for API requests

const Cinvoice = () => {
    const router = useRouter();
    const [showPopup, setShowPopup] = useState(false);
    const [activeTab, setActiveTab] = useState("General");
    const [customFieldTab, setCustomFieldTab] = useState("InvoiceDetails");
    const [searchQuery, setSearchQuery] = useState(""); // State for search input
    const [searchResults, setSearchResults] = useState([]); // State for storing search results

    const togglePopup = () => setShowPopup(!showPopup);
    const switchTab = (tab) => setActiveTab(tab);
    const switchCustomFieldTab = (tab) => setCustomFieldTab(tab);

    // Fetch customers from PHP backend based on search input
    useEffect(() => {
        const fetchCustomers = async () => {
            if (searchQuery.trim() === "") {
                setSearchResults([]);
                return;
            }

            try {
                const response = await axios.get(
                    "http://localhost/php-backend/searchCustomer.php", // Replace with your actual path
                    { params: { name: searchQuery } }
                );
                setSearchResults(response.data);
            } catch (error) {
                console.error("Error fetching search results:", error);
            }
        };

        fetchCustomers();
    }, [searchQuery]);

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
                        onClick={() => router.back()}
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
                        value={searchQuery} // Bind input value to searchQuery
                        onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery on input change
                    />

                    {/* Render search results */}
                    {searchResults.length > 0 && (
                        <ul className="mt-4 bg-white border rounded-md shadow-md">
                            {searchResults.map((customer) => (
                                <li key={customer.id} className="p-2 border-b last:border-none">
                                    {customer.name}
                                </li>
                            ))}
                        </ul>
                    )}
                    

                    <div className="mt-10 text-white border-blue-800 p-2 w-36 rounded-lg bg-blue-600">
                        <Link href="/NCusapp">
                            New Customer
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
        </div>
    );
};

export default Cinvoice;
