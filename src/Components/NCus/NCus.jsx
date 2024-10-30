// "use client";
// import React, { useState } from "react";
// import { useRouter } from "next/navigation";

// const NewCustomer = () => {
//   const router = useRouter();
//   const [showBusinessDetails, setShowBusinessDetails] = useState(false);
//   const [showAddressDetails, setShowAddressDetails] = useState(false);
//   const [showShippingAddressDetails, setshowShippingAddressDetails] = useState(false);

//   const [name, setName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [email, setEmail] = useState("");
//   const [gstin, setGstin] = useState("");
//   const [pincode, setPincode] = useState("");
//   const [city, setCity] = useState("");
//   const [state, setState] = useState("");

//   const toggleBusinessDetails = () =>
//     setShowBusinessDetails(!showBusinessDetails);

//   const toggleAddressDetails = () =>
//     setShowAddressDetails(!showAddressDetails);

//   const toggleShippingAddressDetails = () =>
//     setshowShippingAddressDetails(!showShippingAddressDetails);

  

//   // Fetch pincode details from API
//   const fetchPincodeDetails = async (pin) => {
//     try {
//       const response = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
//       const data = await response.json();
//       if (data[0].Status === "Success") {
//         const { District, State } = data[0].PostOffice[0];
//         setCity(District);
//         setState(State);
//       } else {
//         alert("Invalid PIN code");
//       }
//     } catch (error) {
//       console.error("Error fetching pincode details:", error);
//     }
//   };

//   // Handle PIN code input
//   const handlePincodeChange = (e) => {
//     const pin = e.target.value;
//     setPincode(pin);
//     if (pin.length === 6) {
//       fetchPincodeDetails(pin);
//     }
//   };

//   const handleSave = async (event) => {
//     event.preventDefault();

//     try {
//       const response = await fetch(
//         "http://localhost/php-backend/save_customer.php",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/x-www-form-urlencoded",
//           },
//           body: new URLSearchParams({
//             name,
//             phone,
//             email,
//             gstin,
//             pincode,
//             city,
//             state,
//           }),
//         }
//       );

//       const data = await response.json();
//       console.log(data);

//       if (data.success) {
//         alert(data.message);
//         router.push("/");
//       } else {
//         alert(data.message);
//       }
//     } catch (error) {
//       console.error("Error saving customer:", error);
//       alert("An error occurred while saving the customer.");
//     }
//   };

//   return (
//     <div className="p-8 max-w-xl mx-auto font-sans">
//       <h2 className="text-2xl font-bold mb-6">New Customer</h2>

//       <form onSubmit={handleSave}>
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
//           <input
//             type="text"
//             placeholder="Eg. John Smith"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//           <input
//             type="text"
//             placeholder="+91 Enter phone number"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//             className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//           <input
//             type="email"
//             placeholder="Enter email address"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//         </div>

//         <div
//           className="cursor-pointer text-blue-600 mb-4"
//           onClick={toggleBusinessDetails}
//         >
//           {showBusinessDetails
//             ? "▾ Business, GSTIN Details"
//             : "▸ Business, GSTIN Details"}
//         </div>

//         {showBusinessDetails && (
//           <div className="mb-6">
//             <input
//               type="text"
//               placeholder="Enter 15-digit GSTIN number"
//               value={gstin}
//               onChange={(e) => setGstin(e.target.value)}
//               className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
//             />
            
//           </div>
//         )}

//         <div
//           className="cursor-pointer text-blue-600 mb-4"
//           onClick={toggleAddressDetails}
//         >
//           {showAddressDetails
//             ? "▾ Billing Address"
//             : "▸ Billing Address"}
//         </div>

//         {showAddressDetails && (
//           <div>
//             <div>
//             <input
//               type="Address"
//               placeholder="Address *"
//               className="border border-gray-300 rounded-lg p-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              
//             />

//             </div>
//           <div className="mb-6 flex gap-5">
//             <input
//               type="number"
//               placeholder="Pincode *"
//               value={pincode}
//               onChange={handlePincodeChange}
//               className="border border-gray-300 rounded-lg p-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              
//             />
//             <input
//               type="text"
//               placeholder="City"
//               value={city}
//               readOnly
//               className="border border-gray-300 rounded-lg p-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
//             />
//             <input
//               type="text"
//               placeholder="State"
//               value={state}
//               readOnly
//               className="border border-gray-300 rounded-lg p-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
//             />
//           </div>
//           </div>
//         )}



// <div
//           className="cursor-pointer text-blue-600 mb-4"
//           onClick={toggleShippingAddressDetails}
//         >
//           {showShippingAddressDetails
//             ? "▾ Shipping Address "
//             : "▸ Shipping Address "}
//         </div>

//         {showShippingAddressDetails && (
//           <div>
//             <div>
//             <input
//               type="Address"
//               placeholder="Address *"
//               className="border border-gray-300 rounded-lg p-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              
//             />

//             </div>
//           <div className="mb-6 flex gap-5">
//             <input
//               type="number"
//               placeholder="Pincode *"
//               value={pincode}
//               onChange={handlePincodeChange}
//               className="border border-gray-300 rounded-lg p-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              
//             />
//             <input
//               type="text"
//               placeholder="City"
//               value={city}
//               readOnly
//               className="border border-gray-300 rounded-lg p-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
//             />
//             <input
//               type="text"
//               placeholder="State"
//               value={state}
//               readOnly
//               className="border border-gray-300 rounded-lg p-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
//             />
//           </div>
//           </div>
//         )}

//         <div className="flex justify-between items-center mt-6">
//           <button
//             type="button"
//             className="px-4 py-2 border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50"
//             onClick={() => router.back()}
//           >
//             Back
//           </button>

//           <div className="flex gap-4">
//             <button
//               type="button"
//               className="px-4 py-2 border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50"
//               onClick={() => {
//                 setName("");
//                 setPhone("");
//                 setEmail("");
//                 setGstin("");
//                 setPincode("");
//                 setCity("");
//                 setState("");
//               }}
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//             >
//               Save
//             </button>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default NewCustomer;
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewCustomer() {
  const router = useRouter();
  const [showBusinessDetails, setShowBusinessDetails] = useState(false);
  const [showAddressDetails, setShowAddressDetails] = useState(false);
  const [showShippingAddressDetails, setShowShippingAddressDetails] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [gstin, setGstin] = useState("");
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [gstDetails, setGstDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const toggleBusinessDetails = () => setShowBusinessDetails(!showBusinessDetails);
  const toggleAddressDetails = () => setShowAddressDetails(!showAddressDetails);
  const toggleShippingAddressDetails = () => setShowShippingAddressDetails(!showShippingAddressDetails);

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
      } else {
        console.error("Unexpected API response format:", data);
        alert("Received an unexpected response format from the GST API.");
      }
    } catch (error) {
      console.error("Error fetching GST details:", error);
      alert("An error occurred while fetching GST details. Please try again later.");
    }
  };

  const handleGstinChange = (e) => {
    const gstNumber = e.target.value;
    setGstin(gstNumber);
    if (gstNumber.length === 15) {
      setIsLoading(true);
      fetchGSTDetails(gstNumber).finally(() => setIsLoading(false));
    } else {
      setGstDetails(null);
    }
  };

  const fetchPincodeDetails = async (pin) => {
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

  const handlePincodeChange = (e) => {
    const pin = e.target.value;
    setPincode(pin);
    if (pin.length === 6) {
      fetchPincodeDetails(pin);
    }
  };

  const handleSave = async (event) => {
    event.preventDefault();

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
            pincode,
            city,
            state,
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
          {showBusinessDetails
            ? "▾ Business, GSTIN Details"
            : "▸ Business, GSTIN Details"}
        </div>

        {showBusinessDetails && (
          <div className="mb-6">
            <input
              type="text"
              placeholder="Enter 15-digit GSTIN number"
              value={gstin}
              onChange={handleGstinChange}
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
            {isLoading && <p className="mt-2 text-sm text-blue-600">Loading GST details...</p>}
            {!isLoading && gstDetails && (
              <div className="mt-2 text-sm text-gray-600">
                <p>Legal Name: {gstDetails.legalName || 'N/A'}</p>
                <p>Trade Name: {gstDetails.tradeName || 'N/A'}</p>
                <p>Status: {gstDetails.status || 'N/A'}</p>
                <p>Last Updated: {new Date().toLocaleString()}</p>
              </div>
            )}
          </div>
        )}

        <div
          className="cursor-pointer text-blue-600 mb-4"
          onClick={toggleAddressDetails}
        >
          {showAddressDetails
            ? "▾ Billing Address"
            : "▸ Billing Address"}
        </div>

        {showAddressDetails && (
          <div>
            <div>
              <input
                type="text"
                placeholder="Address *"
                className="border border-gray-300 rounded-lg p-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
            </div>
            <div className="mb-6 flex gap-5">
              <input
                type="number"
                placeholder="Pincode *"
                value={pincode}
                onChange={handlePincodeChange}
                className="border border-gray-300 rounded-lg p-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
              <input
                type="text"
                placeholder="City"
                value={city}
                readOnly
                className="border border-gray-300 rounded-lg p-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
              <input
                type="text"
                placeholder="State"
                value={state}
                readOnly
                className="border border-gray-300 rounded-lg p-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
            </div>
          </div>
        )}

        <div
          className="cursor-pointer text-blue-600 mb-4"
          onClick={toggleShippingAddressDetails}
        >
          {showShippingAddressDetails
            ? "▾ Shipping Address "
            : "▸ Shipping Address "}
        </div>

        {showShippingAddressDetails && (
          <div>
            <div>
              <input
                type="text"
                placeholder="Address *"
                className="border border-gray-300 rounded-lg p-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
            </div>
            <div className="mb-6 flex gap-5">
              <input
                type="number"
                placeholder="Pincode *"
                value={pincode}
                onChange={handlePincodeChange}
                className="border border-gray-300 rounded-lg p-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
              <input
                type="text"
                placeholder="City"
                value={city}
                readOnly
                className="border border-gray-300 rounded-lg p-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
              <input
                type="text"
                placeholder="State"
                value={state}
                readOnly
                className="border border-gray-300 rounded-lg p-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
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
                setPincode("");
                setCity("");
                setState("");
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