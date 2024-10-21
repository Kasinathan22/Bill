"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import axios from 'axios';

const Cinvoice = () => {
    const [currentDate, setCurrentDate] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [isInvoiceSaved, setIsInvoiceSaved] = useState(false); // New state to track save click
    const router = useRouter();

    const togglePopup = () => setShowPopup(!showPopup);

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
        const today = new Date();
        const formattedDate = today.toLocaleDateString('en-GB');
        setCurrentDate(formattedDate);
    }, []);

    const handleSelectCustomer = (customer) => {
        setSelectedCustomer(customer);
        setSearchResults([]);
        setSearchQuery("");
    };

    const clearSelectedCustomer = () => {
        setSelectedCustomer(null);
    };

    // const handleSaveInvoice = () => {
    //     if (selectedCustomer) {
    //         setIsInvoiceSaved(true); // Set the state to true on save click
    //     } else {
    //         alert("Please select a customer before saving the invoice.");
    //     }
    // };
   
    const handleSaveInvoice = () => {
        if (selectedCustomer) {
            setIsInvoiceSaved(true); // Set the state to true on save click
            
            // Construct the query string using URLSearchParams
            const query = new URLSearchParams({
                name: selectedCustomer.name,
                phone: selectedCustomer.phone,
                email: selectedCustomer.email,
                gstin: selectedCustomer.gstin,
            }).toString();
    
            // Redirect to the next page with customer details
            router.push(`/savedinvoice?${query}`);
        } else {
            alert("Please select a customer before saving the invoice.");
        }
    };
    

    return (
        <div className="relative bg-gray-50 p-8">
            <header className="flex justify-between items-center mb-8">
                <div className="text-xl font-semibold">Bill From</div>
                <div className="flex items-center space-x-4">
                    <button className="text-blue-500">Preview</button>
                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded-md"
                        onClick={handleSaveInvoice} // Trigger save action
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
                <div className="p-6">
                    <div className="text-white border-blue-800 p-2 text-center w-32 rounded-lg bg-blue-600">
                        <Link href="/NCusapp">New Customer</Link>
                    </div>
                    <h2 className="text-lg font-medium mb-4 pt-5">Bill To</h2>
                    <input
                        type="text"
                        placeholder="Search by Customer Name"
                        className="w-full border px-4 py-2 rounded-md shadow-sm"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchResults.length > 0 && (
                        <ul className="mt-4 bg-white border rounded-md shadow-md">
                            {searchResults.map((customer) => (
                                <li
                                    key={customer.id}
                                    className="p-2 border-b last:border-none cursor-pointer"
                                    onClick={() => handleSelectCustomer(customer)}
                                >
                                    {customer.name}
                                </li>
                            ))}
                        </ul>
                    )}

                    {selectedCustomer && (
                        <div className="mt-4 p-4 relative">
                            <h3 className="font-medium text-lg mb-2">Customer Details</h3>
                            <p><strong>Name:</strong> {selectedCustomer.name}</p>
                            <p><strong>Phone:</strong> {selectedCustomer.phone}</p>
                            <p><strong>Email:</strong> {selectedCustomer.email}</p>
                            <p><strong>GSTIN:</strong> {selectedCustomer.gstin}</p>
                            <button
                                className="text-3xl absolute top-2 right-2 text-red-500 hover:text-red-700"
                                onClick={clearSelectedCustomer}
                            >
                                &times;
                            </button>
                        </div>
                    )}
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
                            <span className="text-blue-600">{currentDate}</span>
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
