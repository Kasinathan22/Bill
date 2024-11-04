import React from 'react';

const SettingsPopup = ({ isOpen, onClose, selectedFields, onFieldChange }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Select Fields to Display</h2>
        <div className="flex flex-col space-y-2">
          {["Vehicle Number", "Dispatch Number", "PO Date", "Supply Type", "Sales Person", "Transporter", "PO Number"].map((field, index) => (
            <div key={index} className="flex items-center justify-between">
              <span>{field}</span>
              <input
                type="checkbox"
                checked={selectedFields.includes(field)}
                onChange={() => onFieldChange(field, selectedFields.includes(field))}
                className="toggle-checkbox"
              />
            </div>
          ))}
        </div>
        <div className="flex justify-end mt-4">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
            onClick={onClose}
          >
            Save Changes
          </button>
          <button
            className="ml-2 text-gray-500"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPopup;
