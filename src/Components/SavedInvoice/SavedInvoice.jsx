"use client"
import { useRouter, useSearchParams } from 'next/navigation';

const SavedInvoice = () => {
    const router = useRouter(); // Initialize router here
    const searchParams = useSearchParams();
    
    const name = searchParams.get('name');
    const phone = searchParams.get('phone');
    const email = searchParams.get('email');
    const gstin = searchParams.get('gstin');

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-semibold mb-6">Saved Customer Details</h1>
            <div className="p-6 bg-green-100 rounded-md">
                <h3 className="font-medium text-xl mb-4">Customer Information</h3>
                <p><strong>Name:</strong> {name}</p>
                <p><strong>Phone:</strong> {phone}</p>
                <p><strong>Email:</strong> {email}</p>
                <p><strong>GSTIN:</strong> {gstin}</p>
            </div>
            <button
                className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-md"
                onClick={() => router.back()} // Correct usage of router.back()
            >
                Back to Invoice
            </button>
        </div>
    );
};

export default SavedInvoice;
