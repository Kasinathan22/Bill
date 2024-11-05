"use client";
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const SavedInvoice = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    
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
    const totalAmount = parseFloat(searchParams.get('totalAmount') || '0');

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

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            {/* Header */}
            <div className={`${template === 'template1' ? 'bg-blue-900' : template === 'template2' ? 'bg-green-900' : 'bg-yellow-900'} text-white p-6 rounded-t-md`}>
                <h1 className="text-3xl font-bold">Kashgar Internet Private Limited</h1>
                <p>F801, F Block, 8th Floor, Charms Castle, Ghaziabad, UP 201017 | State Code: 09</p>
                <p>GSTIN: 09AAJCK9877F1ZS</p>
                <p>{vechicleNo}</p>
            </div>

            {/* Invoice Details */}
            <div className="p-6 bg-white shadow-md">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h2 className="text-xl font-semibold">Tax Invoice</h2>
                        <p>Invoice No: <strong>KASHGARINV24128</strong></p>
                        <p>Date: 28-10-2024</p>
                        <p>Invoice No: <strong>{invoiceName}{invoiceNo}</strong></p>
                        <p></p>
                      

                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">Bill To:</h3>
                        <p><strong>{name || "Cash Sale"}</strong></p>
                        <p>{phone}</p>
                        <p>{email}</p>
                        <p>GSTIN: {gstin}</p>
                        <p>{billing_address}</p>
                    </div>
                    <div>
                        <p>{shipping_address}{shipping_city}{shipping_state}{shipping_pincode}</p>
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
                                <td className="p-2 border border-gray-300">{item.itemName}</td>
                                <td className="p-2 border border-gray-300">{item.quantity}</td>
                                <td className="p-2 border border-gray-300">{item.hsn}</td>
                                <td className="p-2 border border-gray-300">{item.gst}</td>
                                <td className="p-2 border border-gray-300">{item.price}</td>
                                <td className="p-2 border border-gray-300">{totalAmount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="text-right text-xl font-semibold">
                    Total Amount: {formatCurrency(totalAmount)}
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
                    <input
                        type="text"
                        readOnly
                        value="https://one.clear.in/p/LggxMX"
                        className="p-2 border border-gray-300 rounded w-full"
                    />
                </div>
            </div>

            {/* Template Selection Modal */}
            {showTemplateModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-md shadow-lg max-w-md w-full">
                        <h3 className="text-xl font-semibold mb-4">Select Template</h3>
                        <ul className="space-y-2">
                            <li><button onClick={() => handleTemplateChange('template1')} className="w-full text-left p-2 rounded-md hover:bg-gray-100">Template 1</button></li>
                            <li><button onClick={() => handleTemplateChange('template2')} className="w-full text-left p-2 rounded-md hover:bg-gray-100">Template 2</button></li>
                            <li><button onClick={() => handleTemplateChange('template3')} className="w-full text-left p-2 rounded-md hover:bg-gray-100">Template 3</button></li>
                        </ul>
                        <button
                            className="mt-4 bg-gray-300 text-black px-4 py-2 rounded-md"
                            onClick={() => setShowTemplateModal(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SavedInvoice;
