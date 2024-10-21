"use client"
import BankDetails from "@/Components/Cinvoice/BankDetails";
import Cinvoice from "@/Components/Cinvoice/Cinvoice";
import ItemEntry from "@/Components/Cinvoice/ItemEntry";
import Summary from "@/Components/Cinvoice/Summary";
import React, { useState } from 'react'; 

const Createinvoice = () => {
  const [totalAmount, setTotalAmount] = useState(0);
  return (
    <div>

      <Cinvoice />
      <ItemEntry onTotalChange={setTotalAmount}  />

      <div className="flex gap-4 p-8">
      {/* Left Section */}
      <div className="w-2/3">
        <BankDetails />
      </div>

      {/* Right Section */}
      <div className="w-1/3">
        <Summary totalAmount={totalAmount}/>
      </div>
    </div>
      
    </div>
  );
};

export default Createinvoice;
