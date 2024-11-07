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

    const calculateTotalAmount = (price, gst, cess, discount, quantity) => {
        const gstAmount = (price * gst) / 100;
        const cessAmount = (price * cess) / 100;
        const discountAmount = ((price + gstAmount + cessAmount) * discount) / 100;
        const baseAmount = price * quantity;

        return baseAmount + gstAmount + cessAmount - discountAmount;
    };

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
                        {items.map((item, index) => {
                            const price = parseFloat(item.price.replace(/[₹,\s]/g, '')) || 0;
                            const gst = parseFloat(item.gst.replace(/[%\s]/g, '')) || 0;
                            const cess = parseFloat(item.cess.replace(/[%\s]/g, '')) || 0;
                            const discount = parseFloat(item.discount) || 0;
                            const quantity = parseFloat(item.quantity) || 1;

                            const totalAmountForItem = calculateTotalAmount(price, gst, cess, discount, quantity);

                            return (
                                <tr key={index} className="bg-white">
                                    <td className="p-2 border border-gray-300">{index + 1}</td>
                                    <td className="p-2 border border-gray-300">{item.itemName}</td>
                                    <td className="p-2 border border-gray-300">{item.quantity}</td>
                                    <td className="p-2 border border-gray-300">{item.hsn}</td>
                                    <td className="p-2 border border-gray-300">{item.gst}</td>
                                    <td className="p-2 border border-gray-300">{item.price}</td>
                                    <td className="p-2 border border-gray-300">{formatCurrency(totalAmountForItem)}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                {/* Amount in Words */}
                <div className="text-right">
                    <h3 className="text-lg font-semibold">Amount in Words:</h3>
                    <p>{totalAmountInWords}</p>
                </div>

                {/* Total Amount */}
                <div className="text-right">
                    <p><strong>Total: </strong>{formatCurrency(totalAmount)}</p>
                </div>

                {/* Bank Details */}
                {bankName && (
                    <div>
                        <h3 className="text-lg font-semibold">Bank Details:</h3>
                        <p><strong>Bank Name:</strong> {bankName}</p>
                        <p><strong>Account Holder:</strong> {accountHolderName}</p>
                        <p><strong>Account No:</strong> {accountNumber}</p>
                        <p><strong>IFSC:</strong> {ifsc}</p>
                    </div>
                )}
            </div>

            <div className="flex justify-between pt-5">
                <button onClick={handlePrint} className="bg-blue-500 text-white p-2 rounded-md">Print</button>
                <button onClick={() => setShowTemplateModal(true)} className="bg-blue-500 text-white p-2 rounded-md">Change Template</button>
            </div>
        </div>
    );
};

export default SavedInvoice;
