"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import BankDetails from "@/Components/Cinvoice/BankDetails";
import Cinvoice from "@/Components/Cinvoice/Cinvoice";
import ItemEntry from "@/Components/Cinvoice/ItemEntry";
import Summary from "@/Components/Cinvoice/Summary";

const Createinvoice = () => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [items, setItems] = useState([]);
  const [customerDetails, setCustomerDetails] = useState(null);
  const [invoiceDetails, setInvoiceDetails] = useState({});
  const [bankDetails, setBankDetails] = useState({});
  const router = useRouter();

  const handleSaveInvoice = () => {
    if (customerDetails) {
      const query = new URLSearchParams({
        ...customerDetails,
        ...invoiceDetails,
        ...bankDetails,  // Include bank details in the query
        items: JSON.stringify(items),
        totalAmount: totalAmount.toString()
      }).toString();

      router.push(`/savedinvoice?${query}`);
    } else {
      alert("Please select a customer before saving the invoice.");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <Cinvoice 
         onSaveInvoice={handleSaveInvoice}
         onCustomerSelect={setCustomerDetails}
         onInvoiceDetailsChange={setInvoiceDetails}
      />
    
      <ItemEntry 
        setTotalAmount={setTotalAmount} 
        items={items}
        setItems={setItems}
      />
   
      <div className="flex gap-4 mt-8">
        <div className="w-2/3 bg-white rounded-lg shadow-md p-6">
          <BankDetails onBankDetailsChange={setBankDetails} />
        </div>

        <div className="w-1/3 bg-white rounded-lg shadow-md p-6">
          <Summary totalAmount={totalAmount} />
        </div>
      </div>
    </div>
  );
};

export default Createinvoice;
