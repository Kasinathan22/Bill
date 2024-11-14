// "use client";
// import React, { useState } from "react";
// import Link from "next/link";


// const Hero = () => {


//   const allInvoices = [
//     {
//       number: "KASHGARINV24114",
//       date: "2024-10-14",
//       linkedDocs: "View Docs",
//     },
   
//   ];

//   // State management for filters
//   const [filteredInvoices, setFilteredInvoices] = useState(allInvoices);
//   const [customerName, setCustomerName] = useState("");
//   const [customerGSTIN, setCustomerGSTIN] = useState("");
//   const [statusFilter, setStatusFilter] = useState([]);
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");

//   // Handle checkbox filtering
//   const handleStatusChange = (status) => {
//     setStatusFilter((prev) =>
//       prev.includes(status)
//         ? prev.filter((s) => s !== status)
//         : [...prev, status]
//     );
//   };

//   // Filter logic
//   const applyFilters = () => {
//     let filtered = allInvoices;

//     if (customerName) {
//       filtered = filtered.filter((invoice) =>
//         invoice.customer.toLowerCase().includes(customerName.toLowerCase())
//       );
//     }

//     if (statusFilter.length > 0) {
//       filtered = filtered.filter((invoice) =>
//         statusFilter.includes(invoice.status)
//       );
//     }

//     if (startDate && endDate) {
//       filtered = filtered.filter(
//         (invoice) =>
//           new Date(invoice.date) >= new Date(startDate) &&
//           new Date(invoice.date) <= new Date(endDate)
//       );
//     }

//     setFilteredInvoices(filtered);
//   };

//   // Clear all filters
//   const clearFilters = () => {
//     setCustomerName("");
//     setCustomerGSTIN("");
//     setStatusFilter([]);
//     setStartDate("");
//     setEndDate("");
//     setFilteredInvoices(allInvoices); // Reset to all invoices
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-8">
//       <header className="flex justify-between items-center mb-8">
//         <h1 className="text-3xl font-semibold">Invoices</h1>
        
//         <Link href='/Createinvoice' className="bg-blue-600 text-white px-4 py-2 rounded-md">
//           Create an Invoice
//         </Link>
      
//       </header>

//       <div className="flex space-x-8">
//         {/* Sidebar */}
//         <aside className="w-1/4 space-y-4">
//           <div>
//             <label className="block text-gray-700 mb-2">Date Range</label>
//             <div className="flex space-x-2">
//               <input
//                 type="date"
//                 className="border px-3 py-2 rounded-md"
//                 value={startDate}
//                 onChange={(e) => setStartDate(e.target.value)}
//               />
//               <input
//                 type="date"
//                 className="border px-3 py-2 rounded-md"
//                 value={endDate}
//                 onChange={(e) => setEndDate(e.target.value)}
//               />
//             </div>
//           </div>

//           <div>
//             <label className="block text-gray-700 mb-2">Customer Name</label>
//             <input
//               type="text"
//               className="border w-full px-3 py-2 rounded-md"
//               placeholder="Search here..."
//               value={customerName}
//               onChange={(e) => setCustomerName(e.target.value)}
//             />
//           </div>

//           <div>
//             <label className="block text-gray-700 mb-2">Customer GSTIN</label>
//             <input
//               type="text"
//               className="border w-full px-3 py-2 rounded-md"
//               placeholder="Search here..."
//               value={customerGSTIN}
//               onChange={(e) => setCustomerGSTIN(e.target.value)}
//             />
//           </div>

//           <div>
//             <label className="block text-gray-700 mb-2">Invoice Status</label>
//             <div className="space-y-2">
//               {["Not Sent", "Sent", "Viewed by Customer", "Cancelled"].map(
//                 (status) => (
//                   <div key={status}>
//                     <input
//                       type="checkbox"
//                       className="mr-2"
//                       checked={statusFilter.includes(status)}
//                       onChange={() => handleStatusChange(status)}
//                     />
//                     <label>{status}</label>
//                   </div>
//                 )
//               )}
//             </div>
//           </div>

//           <div className="flex space-x-4">
//             <button
//               className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
//               onClick={applyFilters}
//             >
//               Apply Filters
//             </button>
//             <button
//               className="bg-gray-500 text-white px-4 py-2 rounded-md mt-4"
//               onClick={clearFilters}
//             >
//               Clear All Filters
//             </button>
//           </div>
//         </aside>

//         {/* Main Content */}
//         <main className="w-3/4 overflow-auto" style={{ maxHeight: "500px" }}>
//           <table className="w-full border-collapse border border-gray-300">
//             <thead>
//               <tr className="bg-gray-100">
//                 <th className="border px-4 py-2">Select</th>
//                 <th className="border px-4 py-2">Invoice Number</th>
                
//                 <th className="border px-4 py-2">Invoice Date</th>
//                 <th className="border px-4 py-2">Linked Docs</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredInvoices.map((invoice) => (
//                 <tr key={invoice.number}>
//                   <td className="border px-4 py-2">
//                     <input type="checkbox" />
//                   </td>
//                   <td className="border px-4 py-2 text-blue-500">
//                     {invoice.number}
//                   </td>
//                   <td className="border px-4 py-2">
//                     <span className="bg-yellow-100 text-yellow-600 px-2 py-1 rounded-md">
//                       {invoice.status}
//                     </span>
//                   </td>
//                   <td className="border px-4 py-2">{invoice.date}</td>
                  
//                    <td className="border px-4 py-2">{invoice.paymentStatus}</td>
//                   <td className="border px-4 py-2 text-blue-500 cursor-pointer">
//                     {invoice.linkedDocs}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Hero;






// "use client"

// import React, { useEffect, useState } from 'react'
// import axios from 'axios'
// import Link from "next/link"

// const Hero = () => {
//   const [invoices, setInvoices] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState('')

//   useEffect(() => {
//     const fetchInvoices = async () => {
//       try {
//         const response = await axios.get('http://localhost/php-backend/get_captured_images.php')
//         setInvoices(response.data)
//         setLoading(false)
//       } catch (err) {
//         console.error('Error fetching invoices:', err)
//         setError('Failed to load invoices')
//         setLoading(false)
//       }
//     }

//     fetchInvoices()
//   }, [])


//   const handleDownload = async (invoiceNo, captureDate) => {
//     try {
//       const response = await axios.get(`http://localhost/php-backend/get_image.php?invoice_no=${invoiceNo}`, {
//         responseType: 'blob'
//       });
//       const url = window.URL.createObjectURL(new Blob([response.data]));
//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute('download', `Invoice_${invoiceNo}_${captureDate}.png`);
//       document.body.appendChild(link);
//       link.click();
//       link.parentNode.removeChild(link);
//     } catch (err) {
//       if (err.response && err.response.status === 404) {
//         alert(`Invoice image for ${invoiceNo} not found.`);
//       } else {
//         alert(`Failed to download invoice: ${err.message}`);
//       }
//       console.error('Error downloading invoice:', err);
//     }
//   };
  

//   if (loading) return <p>Loading invoices...</p>
//   if (error) return <p>{error}</p>

//   return (
//     <div className="p-8 bg-gray-100 min-h-screen">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-semibold">Saved Invoices</h1>
//         <Link href='/Createinvoice'>
//           <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//             Create an Invoice
//           </button>
//         </Link>
//       </div>
//       {invoices.length === 0 ? (
//         <p>No invoices found</p>
//       ) : (
//         <table className="min-w-full bg-white border border-gray-300">
//           <thead>
//             <tr>
//               <th className="py-2 px-4 border-b">Invoice No</th>
//               <th className="py-2 px-4 border-b">Capture Date</th>
//               <th className="py-2 px-4 border-b">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {invoices.some(invoice => invoice.invoice_no && invoice.capture_date) ? (
//               invoices.map((invoice) => (
//                 <tr key={invoice.id}>
//                   <td className="py-2 px-4 border-b">{invoice.invoice_no}</td>
//                   <td className="py-2 px-4 border-b">{invoice.capture_date}</td>
//                   <td className="py-2 px-4 border-b">
//                     <button 
//                       onClick={() => handleDownload(invoice.invoice_no, invoice.capture_date)}
//                       className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
//                     >
//                       Download
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan={3} className="py-2 px-4 border-b text-center">No valid invoices found</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       )}
//     </div>
//   )
// }

// export default Hero






// "use client";
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const Hero = () => {
//   const [invoices, setInvoices] = useState([]);

//   useEffect(() => {
//     const fetchInvoices = async () => {
//       try {
//         const response = await axios.get('http://localhost/php-backend/get_captured_images.php');
//         setInvoices(response.data);
//       } catch (error) {
//         console.error('Error fetching invoices:', error);
//       }
//     };

//     fetchInvoices();
//   }, []);

//   return (
//     <div className="p-8">
//       <h1 className="text-2xl font-bold mb-4">Captured Invoices</h1>
//       <table className="min-w-full border-collapse border border-gray-300">
//         <thead>
//           <tr className="bg-gray-200">
//             <th className="border p-2">Invoice No</th>
//             <th className="border p-2">Date</th>
//             <th className="border p-2">Image</th>
//           </tr>
//         </thead>
//         <tbody>
//           {invoices.map((invoice) => (
//             <tr key={invoice.id} className="bg-white">
//               <td className="border p-2">{invoice.invoice_no}</td>
//               <td className="border p-2">{invoice.capture_date}</td>
//               <td className="border p-2">
//                 <a
//                   href={`data:image/png;base64,${invoice.image_data}`}
//                   download={`${invoice.invoice_no}.png`}
//                   className="text-blue-500 hover:underline"
//                 >
//                   Download
//                 </a>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Hero;







'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Link from "next/link"

export default function Hero() {
  const [invoices, setInvoices] = useState([])
  const [loading, setLoading] = useState(true)
  const [filterDate, setFilterDate] = useState('')
  const [customerName, setCustomerName] = useState('')

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        setLoading(true)
        const response = await axios.get('http://localhost/php-backend/get_captured_images.php')
        setInvoices(response.data)
      } catch (error) {
        console.error('Error fetching invoices:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchInvoices()
  }, [])

  const filteredInvoices = invoices.filter((invoice) =>
    (!filterDate || invoice.capture_date.startsWith(filterDate)) &&
    (!customerName || (invoice.customer_name && invoice.customer_name.toLowerCase().includes(customerName.toLowerCase())))
  )
  
  const clearFilters = () => {
    setFilterDate('')
    setCustomerName('')
  }

  return (
    <div className=" min-h-screen bg-white">
      {/* Left sidebar */}

      <div className='pt-5'>
      <h1 className='text-xl pl-5 '>Invoice</h1>
      </div>
      <div className=" "></div>
<h1 className=" border-t border-gray-300 w-full">

</h1>
      <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-64 p-4 bg-white shadow-md">
        <h2 className="text-lg font-thin mb-4 pt-5">Filter Invoices</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="date-filter" className="block text-sm font-medium text-gray-700">
              Select Date
            </label>
            <input
              type="date"
              id="date-filter"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="w-full font-thin  px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="customer-name" className="block text-sm font-medium text-gray-700">
              Customer Name
            </label>
            <input
              type="text"
              id="customer-name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Search here..."
            />
          </div>
          <button
            onClick={clearFilters}
            className="w-full px-4 py-2 mt-4 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-4 md:p-8">
        <div className="pb-3">
          <Link href="/Createinvoice">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Create an Invoice
            </button>
          </Link>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">Captured Invoices</h1>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <div className="bg-white  shadow-md rounded-lg overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">Invoice No</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">Total Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">Customer Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">Paid Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice Image</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredInvoices.map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-200">{invoice.invoice_no}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-r border-gray-200">{invoice.capture_date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-200">{invoice.total_amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-r border-gray-200">{invoice.customer_name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-r border-gray-200">{invoice.paid_status}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <a
                        href={`data:image/png;base64,${invoice.image_data}`}
                        download={`${invoice.invoice_no}.png`}
                        className="text-blue-600 hover:text-blue-900 hover:underline"
                      >
                        Download
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      </div>
    </div>
  )
}
