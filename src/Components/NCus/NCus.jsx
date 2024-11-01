"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewCustomer() {
  const router = useRouter();
  const [showBusinessDetails, setShowBusinessDetails] = useState(false);
  const [showBillingAddress, setShowBillingAddress] = useState(false);
  const [showShippingAddress, setShowShippingAddress] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [gstin, setGstin] = useState("");
  const [gstDetails, setGstDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Billing Address States
  const [billingAddress, setBillingAddress] = useState("");
  const [billingPincode, setBillingPincode] = useState("");
  const [billingCity, setBillingCity] = useState("");
  const [billingState, setBillingState] = useState("");

  // Shipping Address States
  const [shippingAddress, setShippingAddress] = useState("");
  const [shippingPincode, setShippingPincode] = useState("");
  const [shippingCity, setShippingCity] = useState("");
  const [shippingState, setShippingState] = useState("");

  const toggleBusinessDetails = () => setShowBusinessDetails(!showBusinessDetails);
  const toggleBillingAddress = () => setShowBillingAddress(!showBillingAddress);
  const toggleShippingAddress = () => setShowShippingAddress(!showShippingAddress);

  const fetchGSTDetails = async (gstNumber) => {
    try {
      console.log("Fetching GST details for:", gstNumber);
      const response = await fetch(`https://gst-insights-api.p.rapidapi.com/getGSTDetailsUsingGST/${gstNumber}`, {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': 'd19bffd16amshdcbeaa380e587c9p1c2fa5jsn4283a8f66662',
          'X-RapidAPI-Host': 'gst-insights-api.p.rapidapi.com'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Received GST details:", data);

      if (data && data.data) {
        setGstDetails(data.data);
        console.log("Updated GST details state:", data.data);

        // Set billing address fields with full address
        const address = data.data.principalAddress?.address;
        const fullAddress = [
          address?.buildingNumber,
          address?.buildingName,
          address?.floorNumber,
          address?.street,
          address?.location,
          address?.district,
          address?.city,
          address?.state,
          address?.stateCode,
          address?.pincode
        ].filter(Boolean).join(', ');

        setBillingAddress(fullAddress);
        setBillingPincode(address?.pincode || '');
        setBillingCity(address?.city || '');
        setBillingState(address?.state || '');
      } else {
        console.error("Unexpected API response format:", data);
        alert("Received an unexpected response format from the GST API.");
      }
    } catch (error) {
      console.error("Error fetching GST details:", error);
      alert("An error occurred while fetching GST details. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGstinChange = (e) => {
    const gstNumber = e.target.value;
    setGstin(gstNumber);
    if (gstNumber.length === 15) {
      setIsLoading(true);
      fetchGSTDetails(gstNumber);
    } else {
      setGstDetails(null);
      // Clear billing address fields when GSTIN is changed
      setBillingAddress('');
      setBillingPincode('');
      setBillingCity('');
      setBillingState('');
    }
  };

  const fetchPincodeDetails = async (pin, setCity, setState) => {
    try {
      const response = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
      const data = await response.json();
      if (data[0].Status === "Success") {
        const { District, State } = data[0].PostOffice[0];
        setCity(District);
        setState(State);
      } else {
        alert("Invalid PIN code");
      }
    } catch (error) {
      console.error("Error fetching pincode details:", error);
    }
  };

  const handleBillingPincodeChange = (e) => {
    const pin = e.target.value;
    setBillingPincode(pin);
    if (pin.length === 6) {
      fetchPincodeDetails(pin, setBillingCity, setBillingState);
    }
  };

  const handleShippingPincodeChange = (e) => {
    const pin = e.target.value;
    setShippingPincode(pin);
    if (pin.length === 6) {
      fetchPincodeDetails(pin, setShippingCity, setShippingState);
    }
  };

  const handleSave = async (event) => {
    event.preventDefault();
    console.log("Sending data:", {
      name,
      phone,
      email,
      gstin,
      billingAddress,
      billingPincode,
      billingCity,
      billingState,
      shippingAddress,
      shippingPincode,
      shippingCity,
      shippingState,
    });
    try {
      const response = await fetch(
        "http://localhost/php-backend/save_customer.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            name,
            phone,
            email,
            gstin,
            billingAddress,
            billingPincode,
            billingCity,
            billingState,
            shippingAddress,
            shippingPincode,
            shippingCity,
            shippingState,
          }),
        }
      );

      const data = await response.json();
      console.log(data);

      if (data.success) {
        alert(data.message);
        router.push("/");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error saving customer:", error);
      alert("An error occurred while saving the customer.");
    }
  };

  return (
    <div className="p-8 max-w-xl mx-auto font-sans">
      <h2 className="text-2xl font-bold mb-6">New Customer</h2>

      <form onSubmit={handleSave}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <input
            type="text"
            placeholder="Eg. John Smith"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            placeholder="+91 Enter phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="email"
            placeholder="Enter email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div
          className="cursor-pointer text-blue-600 mb-4"
          onClick={toggleBusinessDetails}
        >
          {showBusinessDetails ? "▾ Business, GSTIN Details" : "▸ Business, GSTIN Details"}
        </div>
        {showBusinessDetails && (
          <div className="mb-6">
            <div className="flex gap-5">
              <input
                type="text"
                placeholder="Enter 15-digit GSTIN number"
                value={gstin}
                onChange={handleGstinChange}
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
              <input
                type="text"
                placeholder="Legal Name"
                value={gstDetails?.legalName}
                readOnly
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
            </div>
            {isLoading && <p className="mt-2 text-sm text-blue-600">Loading GST details...</p>}
            {!isLoading && gstDetails && (
              <div className="mt-2 text-sm text-gray-600">
                {/* GST details display */}
              </div>
            )}
          </div>
        )}

        <div
          className="cursor-pointer text-blue-600 mb-4"
          onClick={toggleBillingAddress}
        >
          {showBillingAddress ? "▾ Billing Address" : "▸ Billing Address"}
        </div>
        {showBillingAddress && gstDetails && (
          <div className="py-2 max-w-md mx-auto">
            <div className="border border-gray-300 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-md font-medium">Billing Address</h3>
              </div>
              <p className="text-gray-700">
                {billingAddress}
              </p>
              <p className="text-gray-700 mt-1 font-semibold">
                PIN: {billingPincode || 'N/A'}
              </p>
            </div>
          </div>
        )}


        <div
          className="cursor-pointer text-blue-600 mb-4"
          onClick={toggleShippingAddress}
        >
          {showShippingAddress ? "▾ Shipping Address" : "▸ Shipping Address"}
        </div>
        {showShippingAddress && (
          <div className="mb-6">
            <input
              type="text"
              placeholder="Shipping Address"
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 mb-2 w-full"
            />
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Pincode"
                value={shippingPincode}
                onChange={handleShippingPincodeChange}
                className="border border-gray-300 rounded-lg p-2 w-1/3"
              />
              <input
                type="text"
                placeholder="City"
                value={shippingCity}
                readOnly
                className="border border-gray-300 rounded-lg p-2 w-1/3"
              />
              <input
                type="text"
                placeholder="State"
                value={shippingState}
                readOnly
                className="border border-gray-300 rounded-lg p-2 w-1/3"
              />
            </div>
          </div>
        )}

        <div className="flex justify-between items-center mt-6">
          <button
            type="button"
            className="px-4 py-2 border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50"
            onClick={() => router.back()}
          >
            Back
          </button>

          <div className="flex gap-4">
            <button
              type="button"
              className="px-4 py-2 border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50"
              onClick={() => {
                setName("");
                setPhone("");
                setEmail("");
                setGstin("");
                setBillingAddress("");
                setBillingPincode("");
                setBillingCity("");
                setBillingState("");
                setShippingAddress("");
                setShippingPincode("");
                setShippingCity("");
                setShippingState("");
                setGstDetails(null);
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}