"use client"
import { useRouter, useSearchParams } from 'next/navigation';

const SavedInvoice = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    
    const name = searchParams.get('name');
    const phone = searchParams.get('phone');
    const email = searchParams.get('email');
    const gstin = searchParams.get('gstin');
    const items = JSON.parse(searchParams.get('items') || '[]');
    const totalAmount = parseFloat(searchParams.get('totalAmount') || '0');

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR'
        }).format(amount);
    };

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-semibold mb-6">Saved Invoice Details</h1>
            <div className="p-6 bg-green-100 rounded-md mb-6">
                <h3 className="font-medium text-xl mb-4">Customer Information</h3>
                <p><strong>Name:</strong> {name}</p>
                <p><strong>Phone:</strong> {phone}</p>
                <p><strong>Email:</strong> {email}</p>
                <p><strong>GSTIN:</strong> {gstin}</p>
            </div>
            <div className="p-6 bg-blue-100 rounded-md mb-6">
                <h3 className="font-medium text-xl mb-4">Item Details</h3>
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-blue-200">
                            <th className="p-2 border border-gray-300">Item Name</th>
                            <th className="p-2 border border-gray-300">Quantity</th>
                            <th className="p-2 border border-gray-300">Hsc code</th>
                            <th className="p-2 border border-gray-300">Price</th>
                            <th className="p-2 border border-gray-300">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => (
                            <tr key={index} className="bg-white">
                                <td className="p-2 border border-gray-300">{item.itemName}</td>
                                <td className="p-2 border border-gray-300">{item.quantity}</td>
                                <td className="p-2 border border-gray-300">{item.hsn_sac}</td>
                                <td className="p-2 border border-gray-300">{item.price}</td>
                                <td className="p-2 border border-gray-300">{totalAmount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="text-right text-xl font-semibold">
                Total Amount: {formatCurrency(totalAmount)}
            </div>
            <button
                className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-md"
                onClick={() => router.back()}
            >
                Back to Invoice
            </button>
        </div>
    );
};

export default SavedInvoice;