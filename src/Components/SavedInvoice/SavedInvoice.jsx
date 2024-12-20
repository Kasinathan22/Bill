// "use client";
// import React, { useState, useEffect } from "react";
// import { useRouter, useSearchParams } from 'next/navigation';
// import { toWords } from 'number-to-words';
// import axios from "axios";

// const SavedInvoice = () => {
//     const router = useRouter();
//     const searchParams = useSearchParams();
//     const [currentDate, setCurrentDate] = useState('');
//     const [isPaid, setIsPaid] = useState(false);
//     const totalAmount = parseFloat(searchParams.get('totalAmount') || '0');
    
//     const name = searchParams.get('name');
//     const phone = searchParams.get('phone');
//     const email = searchParams.get('email');
//     const gstin = searchParams.get('gstin');
//     const billing_address = searchParams.get('billing_address');
//     const shipping_address = searchParams.get('shipping_address');
//     const shipping_city = searchParams.get('shipping_city');
//     const shipping_state = searchParams.get('shipping_state');
//     const shipping_pincode = searchParams.get('shipping_pincode');
    
//     const invoiceNo = searchParams.get('invoiceNo') || 'KASHGARINV24128';
//     const invoiceName = searchParams.get('invoiceName') || 'KASHGARINV24128';
//     const vechicleNo = searchParams.get('vechicleNo');
//     const vehicleNumberHeading = searchParams.get('vehicleNumberHeading');
//     const DispatchNo = searchParams.get('DispatchNo');
//     const DispatchNoHeading = searchParams.get('DispatchNoHeading');
//     const PODate = searchParams.get('PODate');
//     const PODateHeading = searchParams.get('PODateHeading');
//     const SupplyType = searchParams.get('SupplyType');
//     const SupplyTypeHeading = searchParams.get('SupplyTypeHeading');
//     const Saleperson = searchParams.get('Saleperson');
//     const SalepersonHeading = searchParams.get('SalepersonHeading');
//     const Transporter = searchParams.get('Transporter');
//     const TransporterHeading = searchParams.get('TransporterHeading');
//     const PON = searchParams.get('PON');
//     const PONHeading = searchParams.get('PONHeading');
    
//     const items = JSON.parse(searchParams.get('items') || '[]');
   
//     const bankName = searchParams.get('bankName');
//     const accountHolderName = searchParams.get('accountHolderName');
//     const accountNumber = searchParams.get('accountNumber');
//     const ifsc = searchParams.get('ifsc');

//     const [showTemplateModal, setShowTemplateModal] = useState(false);
//     const [template, setTemplate] = useState('template1');

//     const formatCurrency = (amount) => {
//         return new Intl.NumberFormat('en-IN', {
//             style: 'currency',
//             currency: 'INR'
//         }).format(amount);
//     };

//     const handleTemplateChange = (selectedTemplate) => {
//         setTemplate(selectedTemplate);
//         setShowTemplateModal(false);
//     };

//     const handlePrint = () => {
//         window.print();
//     };

//     const togglePaymentStatus = () => {
//         setIsPaid(!isPaid);
//     };

//     const getAmountInWords = (amount) => {
//         const rupees = Math.floor(amount);
//         const paise = Math.round((amount - rupees) * 100);

//         const rupeesInWords = rupees > 0 ? `${toWords(rupees)} Rupees` : '';
//         const paiseInWords = paise > 0 ? `${toWords(paise)} Paise` : '';

//         if (rupeesInWords && paiseInWords) {
//             return `${rupeesInWords} and ${paiseInWords}`;
//         } else if (rupeesInWords) {
//             return rupeesInWords;
//         } else {
//             return paiseInWords;
//         }
//     };

//     const totalAmountInWords = getAmountInWords(totalAmount);

//     useEffect(() => {
//         const today = new Date();
//         const formattedDate = today.toLocaleDateString('en-GB');
//         setCurrentDate(formattedDate);
//     }, []);

//     const calculateTotalAmount = (price, gst, cess, discount, quantity) => {
//         const gstAmount = (price * gst) / 100;
//         const cessAmount = (price * cess) / 100;
//         const discountAmount = ((price + gstAmount + cessAmount) * discount) / 100;
//         const baseAmount = price * quantity;

//         return baseAmount + gstAmount + cessAmount - discountAmount;
//     };

//     // const saveInvoiceData = async () => {
//     //     try {
//     //         const response = await axios.post('http://localhost/php-backend/save_invoice.php', {
//     //             name,
//     //             phone,
//     //             gstin,
//     //             invoiceNo: invoiceName + invoiceNo,
//     //             totalAmount,
//     //             paymentStatus: isPaid ? 'Paid' : 'Unpaid'
//     //         }, {
//     //             headers: {
//     //                 'Content-Type': 'application/json'
//     //             }
//     //         });
//     //         console.log(response.data);
//     //         if (response.data.message) {
//     //             alert('Invoice saved successfully!');
//     //         } else if (response.data.error) {
//     //             alert('Error saving invoice: ' + response.data.error);
//     //         }
//     //     } catch (error) {
//     //         console.error("Error saving invoice:", error);
//     //         alert('Error saving invoice. Please check the console for details.');
//     //     }
//     // };


//     function capturePage() {
//         html2canvas(document.body).then(canvas => {
//             const imageData = canvas.toDataURL("image/png"); // Get image data as base64
//             sendImageToBackend(imageData);
//         });
//     }
    
//     function sendImageToBackend(imageData) {
//         fetch('save_image.php', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ image: imageData })
//         })
//         .then(response => response.json())
//         .then(data => {
//             console.log('Image saved:', data);
//         })
//         .catch(error => {
//             console.error('Error:', error);
//         });
//     }
    
//     return (
//         <div className="p-8 bg-gray-100 min-h-screen">
//             <div className={`${template === 'template1' ? 'bg-blue-900' : template === 'template2' ? 'bg-green-900' : 'bg-yellow-900'} text-white p-6 rounded-t-md`}>
//                 <h1 className="text-5xl font-bold py-5">Kashgar Internet Private <br />Limited</h1>
//             </div>

//             <div className="p-6 bg-white shadow-md">
//                 <div className="grid grid-cols-2 py-5 justify-between items-start">
//                     <div className="w-full">
//                         <p>801, F Block, 8th Floor, Charms Castle, Raj Nagar Extension Road, Ghaziabad, Uttar Pradesh - 201017 | State Code - 09</p>
//                         <p>GSTIN: 09AAJCK9877F1ZS</p>
//                     </div>
//                     <div className="text-right px-5">
//                         <h2 className="text-2xl font-semibold">Tax Invoice</h2>
//                         <span>Date: {currentDate}</span>
//                         <p>Invoice No: <strong>{invoiceName}{invoiceNo}</strong></p>
//                     </div>
//                 </div>

//                 <div className="grid grid-cols-2 py-10 mb-4">
//                     <div>
//                         <h3 className="text-lg font-semibold">Bill To:</h3>
//                         <p><strong>{name || "Cash Sale"}</strong></p>
//                         <p className='w-60'>{billing_address}</p>
//                         <p>{phone} || {email}</p>
//                         <p>GSTIN: {gstin}</p>
//                     </div>
//                     <div>
//                         <h3 className="text-lg font-semibold">Ship To:</h3>
//                         <p><strong>{name || "Cash Sale"}</strong></p>
//                         <p className='w-60'>{shipping_address}{shipping_city}{shipping_state}{shipping_pincode}</p>
//                         <p><strong>{vehicleNumberHeading}</strong> {vechicleNo}</p>
//                         <p><strong>{DispatchNoHeading}</strong> {DispatchNo}</p>
//                         <p><strong>{PODateHeading}</strong> {PODate}</p>
//                         <p><strong>{SupplyTypeHeading}</strong> {SupplyType}</p>
//                         <p><strong>{SalepersonHeading}</strong> {Saleperson}</p>
//                         <p><strong>{TransporterHeading}</strong> {Transporter}</p>
//                         <p><strong>{PONHeading}</strong> {PON}</p>
//                     </div>
//                 </div>

//                 <table className="w-full border-collapse border border-gray-300 mb-6">
//                     <thead>
//                         <tr className={`${template === 'template1' ? 'bg-blue-200' : template === 'template2' ? 'bg-green-200' : 'bg-yellow-200'}`}>
//                             <th className="p-2 border border-gray-300">Sl.No</th>
//                             <th className="p-2 border border-gray-300">Item Name</th>
//                             <th className="p-2 border border-gray-300">Quantity</th>
//                             <th className="p-2 border border-gray-300">HSN Code</th>
//                             <th className="p-2 border border-gray-300">GST</th>
//                             <th className="p-2 border border-gray-300">Price</th>
//                             <th className="p-2 border border-gray-300">Amount</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {items.map((item, index) => {
//                             const price = parseFloat(item.price.replace(/[₹,\s]/g, '')) || 0;
//                             const gst = parseFloat(item.gst.replace(/[%\s]/g, '')) || 0;
//                             const cess = parseFloat(item.cess.replace(/[%\s]/g, '')) || 0;
//                             const discount = parseFloat(item.discount) || 0;
//                             const quantity = parseFloat(item.quantity) || 1;
//                             const total = calculateTotalAmount(price, gst, cess, discount, quantity);

//                             return (
//                                 <tr key={index} className="border-b border-gray-300">
//                                     <td className="p-2 border border-gray-300">{index + 1}</td>
//                                     <td className="p-2 border border-gray-300">{item.itemName}</td>
//                                     <td className="p-2 border border-gray-300">{quantity}</td>
//                                     <td className="p-2 border border-gray-300">{item.hsn}</td>
//                                     <td className="p-2 border border-gray-300">{gst}%</td>
//                                     <td className="p-2 border border-gray-300">{formatCurrency(price)}</td>
//                                     <td className="p-2 border border-gray-300">{formatCurrency(total)}</td>
//                                 </tr>
//                             );
//                         })}
//                     </tbody>
//                 </table>

//                 <div className="text-right">
//                     <p>Total Amount: <strong>{formatCurrency(totalAmount)}</strong></p>
//                     <p>Total Amount (in words): <strong>{totalAmountInWords}</strong></p>
//                 </div>

//                 <div className="py-4">
//                     <label className="mr-2 font-semibold">Payment Status:</label>
//                     <button onClick={togglePaymentStatus} className={`px-4 py-2 rounded ${isPaid ? 'bg-green-500' : 'bg-red-500'} text-white`}>
//                         {isPaid ? 'Paid' : 'Unpaid'}
//                     </button>
//                 </div>

//                 <div className="text-right">
//                     <button onClick={handlePrint} className="bg-blue-500 text-white py-2 px-4 rounded mt-4">Print</button>
//                     <button onClick={saveInvoiceData} className="bg-green-500 text-white py-2 px-4 rounded mt-4 ml-4">Save Invoice</button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default SavedInvoice;


// "use client";
// import React, { useState, useEffect } from "react";
// import { useRouter, useSearchParams } from 'next/navigation';
// import { toWords } from 'number-to-words';
// import axios from "axios";
// import html2canvas from 'html2canvas';
// import { toast } from "sonner"

// const SavedInvoice = () => {
//     const [capturing, setCapturing] = useState(false)
//   const [capturedImages, setCapturedImages] = useState([])
//   const [downloading, setDownloading] = useState(false)
  

//     const router = useRouter();
//     const searchParams = useSearchParams();
//     const [currentDate, setCurrentDate] = useState('');
//     const [isPaid, setIsPaid] = useState(false); // State for payment status
//     const totalAmount = parseFloat(searchParams.get('totalAmount') || '0');
    
//   const [selectedFile, setSelectedFile] = useState(null);
    
//     // Retrieve general invoice and customer details from searchParams
//     const name = searchParams.get('name');
//     const phone = searchParams.get('phone');
//     const email = searchParams.get('email');
//     const gstin = searchParams.get('gstin');
//     const billing_address = searchParams.get('billing_address');
//     const shipping_address = searchParams.get('shipping_address');
//     const shipping_city = searchParams.get('shipping_city');
//     const shipping_state = searchParams.get('shipping_state');
//     const shipping_pincode = searchParams.get('shipping_pincode');
    
//     const invoiceNo = searchParams.get('invoiceNo') || 'KASHGARINV24128';
//     const invoiceName = searchParams.get('invoiceName') || 'KASHGARINV24128';
//     const vechicleNo = searchParams.get('vechicleNo');
//     const vehicleNumberHeading = searchParams.get('vehicleNumberHeading');
//     const DispatchNo = searchParams.get('DispatchNo');
//     const DispatchNoHeading = searchParams.get('DispatchNoHeading');
//     const PODate = searchParams.get('PODate');
//     const PODateHeading = searchParams.get('PODateHeading');
//     const SupplyType = searchParams.get('SupplyType');
//     const SupplyTypeHeading = searchParams.get('SupplyTypeHeading');
//     const Saleperson = searchParams.get('Saleperson');
//     const SalepersonHeading = searchParams.get('SalepersonHeading');
//     const Transporter = searchParams.get('Transporter');
//     const TransporterHeading = searchParams.get('TransporterHeading');
//     const PON = searchParams.get('PON');
//     const PONHeading = searchParams.get('PONHeading');
    
//     const items = JSON.parse(searchParams.get('items') || '[]');
   
//     // Retrieve bank details from searchParams
//     const bankName = searchParams.get('bankName');
//     const accountHolderName = searchParams.get('accountHolderName');
//     const accountNumber = searchParams.get('accountNumber');
//     const ifsc = searchParams.get('ifsc');

//     const [showTemplateModal, setShowTemplateModal] = useState(false);
//     const [template, setTemplate] = useState('template1');

//     const formatCurrency = (amount) => {
//         return new Intl.NumberFormat('en-IN', {
//             style: 'currency',
//             currency: 'INR'
//         }).format(amount);
//     };

//     const handleTemplateChange = (selectedTemplate) => {
//         setTemplate(selectedTemplate);
//         setShowTemplateModal(false);
//     };

//     const handlePrint = () => {
//         window.print();
//     };

//     const togglePaymentStatus = () => {
//         setIsPaid(!isPaid);
//     };

//     const getAmountInWords = (amount) => {
//         const rupees = Math.floor(amount);
//         const paise = Math.round((amount - rupees) * 100);

//         const rupeesInWords = rupees > 0 ? `${toWords(rupees)} Rupees` : '';
//         const paiseInWords = paise > 0 ? `${toWords(paise)} Paise` : '';

//         if (rupeesInWords && paiseInWords) {
//             return `${rupeesInWords} and ${paiseInWords}`;
//         } else if (rupeesInWords) {
//             return rupeesInWords;
//         } else {
//             return paiseInWords;
//         }
//     };

//     const totalAmountInWords = getAmountInWords(totalAmount);

//     useEffect(() => {
//         const today = new Date();
//         const formattedDate = today.toLocaleDateString('en-GB');
//         setCurrentDate(formattedDate);
//     }, []);

//     const calculateTotalAmount = (price, gst, cess, discount, quantity) => {
//         const gstAmount = (price * gst) / 100;
//         const cessAmount = (price * cess) / 100;
//         const discountAmount = ((price + gstAmount + cessAmount) * discount) / 100;
//         const baseAmount = price * quantity;

//         return baseAmount + gstAmount + cessAmount - discountAmount;
//     };


   
//     const fetchCapturedImages = async () => {
//         try {
//           const response = await fetch('http://localhost/php-backend/get_captured_images.php')
//           if (!response.ok) throw new Error('Failed to fetch images')
//           const images = await response.json()
//           setCapturedImages(images)
//         } catch (error) {
//           toast.error('Failed to load captured images')
//           console.error('Error:', error)
//         }
//       }
    
//       const downloadImage = async (id, format) => {
//         try {
//           setDownloading(true)
//           // First verify the format is supported
//           if (!['png', 'jpeg', 'jpg'].includes(format.toLowerCase())) {
//             throw new Error('Unsupported file format')
//           }
    
//           const response = await fetch(`http://localhost/php-backend/get_image.php?id=${id}&format=${format}`, {
//             headers: {
//               'Accept': `image/${format}`,
//             },
//           })
    
//           if (!response.ok) throw new Error('Failed to download image')
    
//           // Verify the content type
//           const contentType = response.headers.get('content-type')
//           if (!contentType?.startsWith('image/')) {
//             throw new Error('Invalid response format')
//           }
    
//           const blob = await response.blob()
//           const url = window.URL.createObjectURL(blob)
          
//           // Create and trigger download
//           const a = document.createElement('a')
//           a.style.display = 'none'
//           a.href = url
//           // Ensure proper file extension
//           const extension = format.toLowerCase() === 'jpeg' ? 'jpg' : format.toLowerCase()
//           a.download = `invoice-${id}.${extension}`
//           document.body.appendChild(a)
//           a.click()
          
//           // Cleanup
//           window.URL.revokeObjectURL(url)
//           document.body.removeChild(a)
//           toast.success('Image downloaded successfully')
//         } catch (error) {
//           toast.error(`Failed to download image: ${error.message}`)
//           console.error('Download error:', error)
//         } finally {
//           setDownloading(false)
//         }
//       }
    
//       useEffect(() => {
//         fetchCapturedImages()
//       }, [])
    
//     return (
//         <div className="p-8 bg-gray-100 min-h-screen">
//             {/* Header */}
//             <div className={`${template === 'template1' ? 'bg-blue-900' : template === 'template2' ? 'bg-green-900' : 'bg-yellow-900'} text-white p-6 rounded-t-md`}>
//                 <h1 className="text-5xl font-bold py-5">Kashgar Internet Private <br />Limited</h1>
//             </div>

//             {/* Invoice Details */}
//             <div className="p-6 bg-white shadow-md">
//                 <div className="grid grid-cols-2 py-5 justify-between items-start">
//                     <div className="w-full">
//                         <p>801, F Block, 8th Floor, Charms Castle, Raj Nagar Extension Road, Ghaziabad, Uttar Pradesh - 201017 | State Code - 09</p>
//                         <p>GSTIN: 09AAJCK9877F1ZS</p>
//                     </div>
//                     <div className="text-right px-5">
//                         <h2 className="text-2xl font-semibold">Tax Invoice</h2>
//                         <span>Date: {currentDate}</span>
//                         <p>Invoice No: <strong>{invoiceName}{invoiceNo}</strong></p>
//                     </div>
//                 </div>

//                 {/* Customer Details */}
//                 <div className="grid grid-cols-2 py-10 mb-4">
//                     <div>
//                         <h3 className="text-lg font-semibold">Bill To:</h3>
//                         <p><strong>{name || "Cash Sale"}</strong></p>
//                         <p className='w-60'>{billing_address}</p>
//                         <p>{phone} || {email}</p>
//                         <p>GSTIN: {gstin}</p>
//                     </div>
//                     <div>
//                         <h3 className="text-lg font-semibold">Ship To:</h3>
//                         <p><strong>{name || "Cash Sale"}</strong></p>
//                         <p className='w-60'>{shipping_address}{shipping_city}{shipping_state}{shipping_pincode}</p>
//                         <p><strong>{vehicleNumberHeading}</strong> {vechicleNo}</p>
//                         <p><strong>{DispatchNoHeading}</strong> {DispatchNo}</p>
//                         <p><strong>{PODateHeading}</strong> {PODate}</p>
//                         <p><strong>{SupplyTypeHeading}</strong> {SupplyType}</p>
//                         <p><strong>{SalepersonHeading}</strong> {Saleperson}</p>
//                         <p><strong>{TransporterHeading}</strong> {Transporter}</p>
//                         <p><strong>{PONHeading}</strong> {PON}</p>
//                     </div>
//                 </div>

//                 {/* Item Table */}
//                 <table className="w-full border-collapse border border-gray-300 mb-6">
//                     <thead>
//                         <tr className={`${template === 'template1' ? 'bg-blue-200' : template === 'template2' ? 'bg-green-200' : 'bg-yellow-200'}`}>
//                             <th className="p-2 border border-gray-300">Sl.No</th>
//                             <th className="p-2 border border-gray-300">Item Name</th>
//                             <th className="p-2 border border-gray-300">Quantity</th>
//                             <th className="p-2 border border-gray-300">HSN Code</th>
//                             <th className="p-2 border border-gray-300">GST</th>
//                             <th className="p-2 border border-gray-300">Price</th>
//                             <th className="p-2 border border-gray-300">Amount</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {items.map((item, index) => {
//                             const price = parseFloat(item.price.replace(/[₹,\s]/g, '')) || 0;
//                             const gst = parseFloat(item.gst.replace(/[%\s]/g, '')) || 0;
//                             const cess = parseFloat(item.cess.replace(/[%\s]/g, '')) || 0;
//                             const discount = parseFloat(item.discount) || 0;
//                             const quantity = parseFloat(item.quantity) || 1;

//                             const totalAmountForItem = calculateTotalAmount(price, gst, cess, discount, quantity);

//                             return (
//                                 <tr key={index} className="bg-white">
//                                     <td className="p-2 border border-gray-300">{index + 1}</td>
//                                     <td className="p-2 border border-gray-300">{item.itemName}</td>
//                                     <td className="p-2 border border-gray-300">{item.quantity}</td>
//                                     <td className="p-2 border border-gray-300">{item.hsnCode}</td>
//                                     <td className="p-2 border border-gray-300">{item.gst}</td>
//                                     <td className="p-2 border border-gray-300">{item.price}</td>
//                                     <td className="p-2 border border-gray-300">{formatCurrency(totalAmountForItem)}</td>
//                                 </tr>
//                             );
//                         })}
//                     </tbody>
//                     <tfoot>
//                         <tr>
//                             <td colSpan="6" className="p-2 border border-gray-300 font-semibold">Total</td>
//                             <td className="p-2 border border-gray-300 font-semibold">{formatCurrency(totalAmount)}</td>
//                         </tr>
//                         <tr>
//                             <td colSpan="6" className="p-2 border border-gray-300 font-semibold">Amount in Words</td>
//                             <td className="p-2 border border-gray-300 font-semibold">{totalAmountInWords}</td>
//                         </tr>
//                     </tfoot>
//                 </table>
                
//                 {/* Payment Status Toggle */}
//                 <div className="flex justify-between items-center mt-4">
//                     <span className="text-lg font-semibold">Payment Status: {isPaid ? 'Paid' : 'Unpaid'}</span>
//                     <button 
//                         onClick={togglePaymentStatus} 
//                         className={`px-4 py-2 rounded ${isPaid ? 'bg-green-500' : 'bg-red-500'} text-white`}
//                     >
//                         Mark as {isPaid ? 'Unpaid' : 'Paid'}
//                     </button>
//                 </div>

//                 {/* Bank Details */}
//                 <div className="text-center mt-6">
//                     <h3 className="text-lg font-semibold">Bank Details</h3>
//                     <p>Bank Name: {bankName}</p>
//                     <p>Account Holder: {accountHolderName}</p>
//                     <p>Account Number: {accountNumber}</p>
//                     <p>IFSC: {ifsc}</p>
//                 </div>

//                 <div className="p-6 bg-white shadow-md">
//                 <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
//         <div className="p-6">
//           <h2 className="text-xl font-bold mb-4">Captured Invoices</h2>
//           {capturedImages.length === 0 ? (
//             <p className="text-muted-foreground">No captured invoices found</p>
//           ) : (
//             <ul className="space-y-4">
//               {capturedImages.map((image) => (
//                 <li 
//                   key={image.id} 
//                   className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
//                 >
//                   <span className="font-medium">Invoice #{image.invoice_no}</span>
//                   <div className="flex gap-2">
//                     <button
//                       onClick={() => downloadImage(image.id, 'png')}
//                       disabled={downloading}
//                       className="inline-flex items-center justify-center rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
//                     >
//                       {downloading ? 'Downloading...' : 'Download PNG'}
//                     </button>
//                     <button
//                       onClick={() => downloadImage(image.id, 'jpg')}
//                       disabled={downloading}
//                       className="inline-flex items-center justify-center rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
//                     >
//                       {downloading ? 'Downloading...' : 'Download JPG'}
//                     </button>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//       </div>
//       </div>



//             </div>
//         </div>
//     );
// };

// export default SavedInvoice;





'use client'

import React, { useState, useEffect } from "react"
import { useSearchParams } from 'next/navigation'
import { toWords } from 'number-to-words'
import axios from "axios"
import html2canvas from 'html2canvas'
import { toast } from "sonner"
import Link from "next/link"



export default function SavedInvoice() {
  const [capturing, setCapturing] = useState(false)
  const [capturedImages, setCapturedImages] = useState([])
  const [downloading, setDownloading] = useState(false)
  const [currentDate, setCurrentDate] = useState('')
  const [isPaid, setIsPaid] = useState(false)
  const [template, setTemplate] = useState('template1')

  const searchParams = useSearchParams()
  const totalAmount = parseFloat(searchParams.get('totalAmount') || '0')

  // Retrieve invoice and customer details from searchParams
  const name = searchParams.get('name') || 'Cash Sale'
  const phone = searchParams.get('phone') || ''
  const email = searchParams.get('email') || ''
  const gstin = searchParams.get('gstin') || ''
  const billing_address = searchParams.get('billing_address') || ''
  const shipping_address = searchParams.get('shipping_address') || ''
  const shipping_city = searchParams.get('shipping_city') || ''
  const shipping_state = searchParams.get('shipping_state') || ''
  const shipping_pincode = searchParams.get('shipping_pincode') || ''
  
  const invoiceNo = searchParams.get('invoiceNo') || 'KASHGARINV24128'
  const vechicleNo = searchParams.get('vechicleNo') || ''
  const DispatchNo = searchParams.get('DispatchNo') || ''
  const PODate = searchParams.get('PODate') || ''
  const SupplyType = searchParams.get('SupplyType') || ''
  const Saleperson = searchParams.get('Saleperson') || ''
  const Transporter = searchParams.get('Transporter') || ''
  const PON = searchParams.get('PON') || ''

  const items = JSON.parse(searchParams.get('items') || '[]')
  
  // Retrieve bank details from searchParams
  const bankName = searchParams.get('bankName') || ''
  const accountHolderName = searchParams.get('accountHolderName') || ''
  const accountNumber = searchParams.get('accountNumber') || ''
  const ifsc = searchParams.get('ifsc') || ''

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount)
  }

  const togglePaymentStatus = () => setIsPaid(!isPaid)

  const getAmountInWords = (amount) => {
    const rupees = Math.floor(amount)
    const paise = Math.round((amount - rupees) * 100)

    const rupeesInWords = rupees > 0 ? `${toWords(rupees)} Rupees` : ''
    const paiseInWords = paise > 0 ? `${toWords(paise)} Paise` : ''

    if (rupeesInWords && paiseInWords) {
      return `${rupeesInWords} and ${paiseInWords}`
    }
    return rupeesInWords || paiseInWords
  }

  const totalAmountInWords = getAmountInWords(totalAmount)

  const calculateTotalAmount = (price, gst, cess, discount, quantity) => {
    const numericPrice = parseFloat(price.replace(/[^0-9.-]+/g, ""))
    const gstAmount = (numericPrice * gst) / 100
    const cessAmount = (numericPrice * cess) / 100
    const discountAmount = ((numericPrice + gstAmount + cessAmount) * discount) / 100
    const baseAmount = numericPrice * quantity

    return baseAmount + gstAmount + cessAmount - discountAmount
  }

  const captureAndStoreWebpage = async () => {
    setCapturing(true)
    try {
      const element = document.getElementById('invoice-content')
      if (!element) {
        throw new Error('Invoice content not found')
      }
      const canvas = await html2canvas(element)
      const imageDataUrl = canvas.toDataURL('image/png')
      
      const formData = new FormData()
      formData.append('screenshot', imageDataUrl)
      formData.append('invoiceNo', invoiceNo)
      formData.append('totalAmount', totalAmount.toString())
      formData.append('name', name)
      formData.append('paidStatus', isPaid ? 'Paid' : 'Unpaid')

      const response = await axios.post('http://localhost/php-backend/save_webpage.php', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })

      if (response.data.success) {
        toast.success('Invoice captured and saved successfully!')
        fetchCapturedImages()
      } else {
        throw new Error(response.data.error || 'Error saving invoice')
      }
    } catch (error) {
      console.error("Error capturing invoice:", error)
      let errorMessage = "An unexpected error occurred"
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error("Error data:", error.response.data)
          console.error("Error status:", error.response.status)
          console.error("Error headers:", error.response.headers)
          errorMessage = error.response.data.error || errorMessage
        } else if (error.request) {
          console.error("No response received:", error.request)
          errorMessage = "No response received from the server"
        } else {
          console.error("Error message:", error.message)
          errorMessage = error.message
        }
      } else if (error instanceof Error) {
        errorMessage = error.message
      }
      toast.error(`Failed to capture invoice: ${errorMessage}`)
    } finally {
      setCapturing(false)
    }
  }

  const fetchCapturedImages = async () => {
    try {
      const response = await axios.get('http://localhost/php-backend/get_captured_images.php')
      setCapturedImages(response.data)
    } catch (error) {
      console.error('Error fetching images:', error)
      toast.error('Failed to load captured invoices')
    }
  }

  useEffect(() => {
    setCurrentDate(new Date().toLocaleDateString('en-GB'))
    fetchCapturedImages()
  }, [])

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div id="invoice-content" className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
        <div className={`${template === 'template1' ? 'bg-blue-600' : 'bg-green-600'} text-white p-6`}>
          <h1 className="text-4xl font-bold">Kashgar Internet Private Limited</h1>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p>801, F Block, 8th Floor, Charms Castle, Ghaziabad, UP</p>
              <p>GSTIN: 09AAJCK9877F1ZS</p>
            </div>
            <div className="text-right">
              <h2 className="text-2xl font-semibold">Tax Invoice</h2>
              <p>Date: {currentDate}</p>
              <p>Invoice No: <strong>{invoiceNo}</strong></p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <h3 className="text-lg font-semibold">Bill To:</h3>
              <p><strong>{name}</strong></p>
              <p>{billing_address}</p>
              <p>{phone} | {email}</p>
              <p>GSTIN: {gstin}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Ship To:</h3>
              <p><strong>{name}</strong></p>
              <p>{shipping_address} {shipping_city} {shipping_state} {shipping_pincode}</p>
            </div>
          </div>

          <table className="w-full border-collapse border border-gray-300 mb-6">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">Sl.No</th>
                <th className="p-2 border">Item Name</th>
                <th className="p-2 border">Quantity</th>
                <th className="p-2 border">HSN Code</th>
                <th className="p-2 border">GST</th>
                <th className="p-2 border">Price</th>
                <th className="p-2 border">Amount</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => {
                const price = parseFloat(item.price.replace(/[^0-9.-]+/g, "")) || 0
                const gst = parseFloat(item.gst.replace(/[^0-9.-]+/g, "")) || 0
                const cess = parseFloat(item.cess.replace(/[^0-9.-]+/g, "")) || 0
                const discount = parseFloat(item.discount) || 0
                const quantity = parseFloat(item.quantity) || 1

                const total = calculateTotalAmount(item.price, gst, cess, discount, quantity)

                return (
                  <tr key={index}>
                    <td className="p-2 border">{index + 1}</td>
                    <td className="p-2 border">{item.itemName}</td>
                    <td className="p-2 border">{quantity}</td>
                    <td className="p-2 border">{item.hsn}</td>
                    <td className="p-2 border">{`${gst}%`}</td>
                    <td className="p-2 border">{formatCurrency(price)}</td>
                    <td className="p-2 border">{formatCurrency(total)}</td>
                  </tr>
                )
              })}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="6" className="p-2 border font-semibold">Total</td>
                <td className="p-2 border font-semibold">{formatCurrency(totalAmount)}</td>
              </tr>
            </tfoot>
          </table>

          <div className="text-right font-semibold mb-4">
            Total in Words: {totalAmountInWords}
          </div>
        </div>
        <div className="bg-gray-100 p-4">
          <p className="text-sm text-center">
            Bank Details: {bankName} | Account Holder: {accountHolderName} | Account Number: {accountNumber} | IFSC: {ifsc}
            <br />Thank you for your business!
          </p>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <button
          onClick={captureAndStoreWebpage}
          disabled={capturing}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
        >
          {capturing ? "Capturing..." : "Capture and Save"}
        </button>

        <div className="flex items-center space-x-2">
          <label htmlFor="paid-status" className="font-medium">Payment Status:</label>
          <button
            id="paid-status"
            onClick={togglePaymentStatus}
            className={`py-2 px-4 rounded font-bold ${
              isPaid 
                ? 'bg-green-500 hover:bg-green-600 text-white' 
                : 'bg-red-500 hover:bg-red-600 text-white'
            }`}
          >
            {isPaid ? 'Paid' : 'Unpaid'}
          </button>
        </div>
        <div>
        <Link href='/Createinvoice'>
           <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Back
         </button>
        </Link>
        </div>
      </div>

     
    </div>
  )
}