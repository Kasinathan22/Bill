"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import { toWords } from 'number-to-words';




const SavedInvoice = () => {
    
    const router = useRouter();
    const searchParams = useSearchParams();
    const [currentDate, setCurrentDate] = useState('');
    const totalAmount = parseFloat(searchParams.get('totalAmount') || '0');
    
    // Retrieve general invoice and customer details from searchParams
    const name = searchParams.get('name');
    const phone = searchParams.get('phone');
    const email = searchParams.get('email');
    const gstin = searchParams.get('gstin');
    const billing_address = searchParams.get('billing_address');
    const shipping_address = searchParams.get('shipping_address');
    const shipping_city = searchParams.get('shipping_city');
    const shipping_state = searchParams.get('shipping_state');
    const shipping_pincode = searchParams.get('shipping_pincode');
    
    const invoiceNo = searchParams.get('invoiceNo') || 'KASHGARINV24128';
    const invoiceName = searchParams.get('invoiceName') || 'KASHGARINV24128';
    const vechicleNo = searchParams.get('vechicleNo');
    const vehicleNumberHeading = searchParams.get('vehicleNumberHeading');
    const DispatchNo = searchParams.get('DispatchNo');
    const DispatchNoHeading = searchParams.get('DispatchNoHeading');
    const PODate = searchParams.get('PODate');
    const PODateHeading = searchParams.get('PODateHeading');
    const SupplyType = searchParams.get('SupplyType');
    const SupplyTypeHeading = searchParams.get('SupplyTypeHeading');
    const Saleperson = searchParams.get('Saleperson');
    const SalepersonHeading = searchParams.get('SalepersonHeading');
    const Transporter = searchParams.get('Transporter');
    const TransporterHeading = searchParams.get('TransporterHeading');
    const PON = searchParams.get('PON');
    const PONHeading = searchParams.get('PONHeading');
    
    const items = JSON.parse(searchParams.get('items') || '[]');
   
    
    // Retrieve bank details from searchParams
    const bankName = searchParams.get('bankName');
    const accountHolderName = searchParams.get('accountHolderName');
    const accountNumber = searchParams.get('accountNumber');
    const ifsc = searchParams.get('ifsc');

    const [showTemplateModal, setShowTemplateModal] = useState(false);
    const [template, setTemplate] = useState('template1');

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR'
        }).format(amount);
    };

    const handleTemplateChange = (selectedTemplate) => {
        setTemplate(selectedTemplate);
        setShowTemplateModal(false);
    };

    const handlePrint = () => {
        window.print();
    };


    const getAmountInWords = (amount) => {
        const rupees = Math.floor(amount);
        const paise = Math.round((amount - rupees) * 100);

        const rupeesInWords = rupees > 0 ? `${toWords(rupees)} Rupees` : '';
        const paiseInWords = paise > 0 ? `${toWords(paise)} Paise` : '';

        if (rupeesInWords && paiseInWords) {
            return `${rupeesInWords} and ${paiseInWords}`;
        } else if (rupeesInWords) {
            return rupeesInWords;
        } else {
            return paiseInWords;
        }
    };
    const totalAmountInWords = getAmountInWords(totalAmount);

    useEffect(() => {
        const today = new Date();
        const formattedDate = today.toLocaleDateString('en-GB');
        setCurrentDate(formattedDate);
    }, []);

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            {/* Header */}
            <div className={`${template === 'template1' ? 'bg-blue-900' : template === 'template2' ? 'bg-green-900' : 'bg-yellow-900'} text-white p-6 rounded-t-md`}>
                <h1 className="text-5xl font-bold py-5">Kashgar Internet Private <br />Limited</h1>
            </div>

            {/* Invoice Details */}
            <div className="p-6 bg-white shadow-md">
                <div className="grid grid-cols-2 py-5 justify-between items-start">
                    <div className="w-full">
                        <p>801, F Block, 8th Floor, Charms Castle, Raj Nagar Extension Road, Ghaziabad, Uttar Pradesh - 201017 | State Code - 09</p>
                        <p>GSTIN: 09AAJCK9877F1ZS</p>
                    </div>
                    <div className="text-right px-5">
                        <h2 className="text-2xl font-semibold">Tax Invoice</h2>
                        <span>Date: {currentDate}</span>
                        <p>Invoice No: <strong>{invoiceName}{invoiceNo}</strong></p>
                    </div>
                </div>

                {/* Customer Details */}
                <div className="grid grid-cols-2 py-10 mb-4">
                    <div>
                        <h3 className="text-lg font-semibold">Bill To:</h3>
                        <p><strong>{name || "Cash Sale"}</strong></p>
                        <p className='w-60'>{billing_address}</p>
                        <p>{phone} || {email}</p>
                        <p>GSTIN: {gstin}</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">Ship To:</h3>
                        <p><strong>{name || "Cash Sale"}</strong></p>
                        <p className='w-60'>{shipping_address}{shipping_city}{shipping_state}{shipping_pincode}</p>
                        <p><strong>{vehicleNumberHeading}</strong> {vechicleNo}</p>
                        <p><strong>{DispatchNoHeading}</strong> {DispatchNo}</p>
                        <p><strong>{PODateHeading}</strong> {PODate}</p>
                        <p><strong>{SupplyTypeHeading}</strong> {SupplyType}</p>
                        <p><strong>{SalepersonHeading}</strong> {Saleperson}</p>
                        <p><strong>{TransporterHeading}</strong> {Transporter}</p>
                        <p><strong>{PONHeading}</strong> {PON}</p>
                    </div>
                </div>

                {/* Item Table */}
                <table className="w-full border-collapse border border-gray-300 mb-6">
                    <thead>
                        <tr className={`${template === 'template1' ? 'bg-blue-200' : template === 'template2' ? 'bg-green-200' : 'bg-yellow-200'}`}>
                            <th className="p-2 border border-gray-300">Sl.No</th>
                            <th className="p-2 border border-gray-300">Item Name</th>
                            <th className="p-2 border border-gray-300">Quantity</th>
                            <th className="p-2 border border-gray-300">HSN Code</th>
                            <th className="p-2 border border-gray-300">GST</th>
                            <th className="p-2 border border-gray-300">Price</th>
                            <th className="p-2 border border-gray-300">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => (
                            <tr key={index} className="bg-white">
                                <td className="p-2 border border-gray-300">{index + 1}</td>
                                <td className="p-2 border border-gray-300">{item.itemName}</td>
                                <td className="p-2 border border-gray-300">{item.quantity}</td>
                                <td className="p-2 border border-gray-300">{item.hsn}</td>
                                <td className="p-2 border border-gray-300">{item.gst}</td>
                                <td className="p-2 border border-gray-300">{item.price}</td>
                                <td className="p-2 border border-gray-300">{totalAmount.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="text-right text-xl font-semibold">
                Total Amount: {formatCurrency(totalAmount)}
            </div>
            <div className="text-right text-base ml-auto w-80 py-">
    <h1>Total Amount in Words: {totalAmountInWords} Rupees only</h1>
</div>


                {/* Bank Details Section */}
                <div className="mt-6  ">
                    <h3 className="text-lg font-semibold">Bank Details</h3>
                    <p><strong>Bank Name:</strong> {bankName}</p>
                    <p><strong>Account Holder:</strong> {accountHolderName}</p>
                    <p><strong>Account Number:</strong> {accountNumber}</p>
                    <p><strong>IFSC:</strong> {ifsc}</p>
                </div>
                <div className="grid grid-cols-2 py-5">
      <div className="mb-4">
        <h4 className="font-semibold mb-2">Terms & Conditions</h4>
        <p className="text-sm">
          GOODS ONCE SOLD WILL NOT BE TAKEN BACK.<br />
          ALL DISPUTES WILL BE SUBJECT TO GHAZIABAD JURISDICTION.
        </p>
      </div>
      <div className="flex flex-col items-end justify-end">
        
        <h1>Authorized Signatory</h1>
      </div>

      <div className="py-5">
      <h4 className="font-semibold mb-2">Notes</h4>
      <p className="text-sm">This is a computer-generated invoice hence no signature required.</p>
      </div>
    </div>
     
            </div>

            {/* Actions */}
            <div className="mt-8 flex justify-between items-center">
                <button
                    className="bg-blue-600 text-white px-4 py-2 rounded-md"
                    onClick={() => router.back()}
                >
                    Back to Invoice
                </button>
                <button
                    className="bg-gray-200 text-black px-4 py-2 rounded-md"
                    onClick={() => setShowTemplateModal(true)}
                >
                    Change Template
                </button>
                <button
                    className="bg-green-600 text-white px-4 py-2 rounded-md"
                    onClick={handlePrint}
                >
                    Print Invoice
                </button>
                <div className="text-sm text-gray-600">
                    <p>Your customers can download the invoice using this link:</p>
                    <a href={`/invoices/${invoiceNo}`} className="text-blue-600 underline">
                        Download Invoice
                    </a>
                </div>
            </div>
        </div>
    );
};

export default SavedInvoice;
