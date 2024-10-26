import React, { useState, useEffect } from "react";

const EditItem = ({ item, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    id: item.id || undefined,
    name: item.name || "",
    item_type: item.item_type || "",
    hsn_sac: item.hsn_sac || "",
    price: item.price || "",
    unit: item.unit || "",
    gst_rate: item.gst_rate || "",
    cess_rate: item.cess_rate || "",
    discount: item.discount || "",
  });

  useEffect(() => {
    setFormData({
      id: item.id || undefined,
      name: item.name || "",
      item_type: item.item_type || "",
      hsn_sac: item.hsn_sac || "",
      price: item.price || "",
      unit: item.unit || "",
      gst_rate: item.gst_rate || "",
      cess_rate: item.cess_rate || "",
      discount: item.discount || "",
    });
  }, [item]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // alert(formData.id)

    if (!formData.name || !formData.item_type || !formData.price) {
      alert("Please fill in all required fields.");
      return;
    }

    const editedItem = {
      ...item,
      ...formData,
    };

    if (typeof onSubmit === "function") {
      onSubmit(editedItem);
    } else {
      console.error("onSubmit is not a function");
    }

    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 w-screen h-screen flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-11/12">
        <h2 className="text-xl font-bold mb-4">Edit Item</h2>

        <form onSubmit={handleSubmit}>
        

          <div className="mb-4">
            <label className="block text-gray-700">Item Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          {/* Item Type */}
          <div className="mb-4">
  <label className="block text-gray-700">Item Type</label>
  <select
    name="item_type"
    value={formData.item_type}
    onChange={handleChange}
    className="w-full p-2 border rounded-md"
    required
  >
    <option value="kilograms">Kilograms</option>
    <option value="liters">Liters</option>
    <option value="units">Units</option>
  </select>
</div>

          <div className="grid grid-cols-3 gap-4">
          {/* HSN/SAC Code */}
          <div className="mb-4">
            <label className="block text-gray-700 ">HSN/SAC Code</label>
            <input
              type="text"
              name="hsn_sac"
              value={formData.hsn_sac}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
          </div>

          {/* Price */}
          <div className="mb-4">
            <label className="block text-gray-700">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          {/* Unit */}
          <div className="mb-4">
            <label className="block text-gray-700">Unit</label>
            <input
              type="text"
              name="unit"
              value={formData.unit}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
          </div>
          </div>

          {/* GST Rate */}
          <div className="grid grid-cols-3 gap-4">
          <div className="mb-4">
            <label className="block text-gray-700">GST Rate (%)</label>
            <input
              type="number"
              name="gst_rate"
              value={formData.gst_rate}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
          </div>

          {/* Cess Rate */}
          <div className="mb-4">
            <label className="block text-gray-700">Cess Rate (%)</label>
            <input
              type="number"
              name="cess_rate"
              value={formData.cess_rate}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
          </div>

          {/* Discount */}
          <div className="mb-4">
            <label className="block text-gray-700">Discount</label>
            <input
              type="number"
              name="discount"
              value={formData.discount}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
          </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditItem;
