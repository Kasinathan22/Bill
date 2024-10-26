"use client";
import React, { useState, useEffect } from "react";
import AddItems from "./AddItems"; // Ensure correct path
import EditItem from "./EditItem"; // Ensure correct path for EditItem component
import FilterSection from "./FilterSection"; // New component for filters
import InventoryTable from "./InventoryTable"; // New component for inventory table

export default function Inventory() {
  const [filters, setFilters] = useState({
    searchTerm: "",
    lowQuantity: false,
    outOfStock: false,
    goods: false,
    services: false,
  });

  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Fetch items from the backend
  const fetchItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost/php-backend/get_items.php", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (data.success) {
        setItems(data.items);
        setFilteredItems(data.items);
      } else {
        setError(data.message || "Failed to fetch items.");
      }
    } catch (err) {
      console.error("Error fetching items:", err);
      setError("An error occurred while fetching items.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch items when component mounts
  useEffect(() => {
    fetchItems();
  }, []);

  // Apply filters whenever filters or items change
  useEffect(() => {
    applyFilters();
  }, [filters, items]);

  // Function to apply filters to the items
  const applyFilters = () => {
    const { searchTerm, lowQuantity, outOfStock, goods, services } = filters;

    const filtered = items.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLowQuantity = lowQuantity ? item.quantity < 10 : true;
      const matchesOutOfStock = outOfStock ? item.quantity === 0 : true;
      const matchesGoods = goods ? item.item_type.toLowerCase() === "goods" : true;
      const matchesServices = services ? item.item_type.toLowerCase() === "service" : true;

      return (
        matchesSearch &&
        matchesLowQuantity &&
        matchesOutOfStock &&
        matchesGoods &&
        matchesServices
      );
    });

    setFilteredItems(filtered);
  };

  // Handle filter changes from FilterSection
  const handleFilterChange = (newFilters) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      searchTerm: "",
      lowQuantity: false,
      outOfStock: false,
      goods: false,
      services: false,
    });
  };

  // Open the edit modal
  const openEditModal = (item) => {
    setSelectedItem(item);
    setIsEditModalOpen(true);
  };

  // Close the edit modal
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedItem(null);
  };

  // Handle the edit form submission
  const handleEditSubmit = async (editedItem) => {
    const payload = {
      id: editedItem.id, // Make sure the id is included
      name: editedItem.name,
      item_type: editedItem.item_type,
      hsn_sac: editedItem.hsn_sac,
      price: editedItem.price,
      unit: editedItem.unit,
      gst_rate: editedItem.gst_rate,
      cess_rate: editedItem.cess_rate,
      discount: editedItem.discount,
    };

    console.log("Edited Item:", payload); // Log payload for debugging

    try {
      const response = await fetch('http://localhost/php-backend/update_item.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (!result.success) {
        console.error("Failed to update item:", result.message);
      } else {
        console.log("Item updated successfully:", result.message);
        fetchItems(); // Refresh items after edit
        closeEditModal(); // Close modal after updating
      }
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  return (
    <div className="flex space-x-4 pt-20">
      {/* Left Filter Section */}
      <div className="w-1/4 p-4 bg-gray-100 rounded-md">
        <h2 className="text-lg font-bold mb-4">Filters</h2>
        <FilterSection 
          filters={filters} 
          onFilterChange={handleFilterChange} 
          onClearFilters={clearFilters}
        />
      </div>

      {/* Inventory Section */}
      <div className="p-4 w-3/4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Inventory</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Add an Item
          </button>
          {isModalOpen && (
            <AddItems onClose={() => setIsModalOpen(false)} onItemAdded={fetchItems} />
          )}
        </div>

        {loading && <p className="text-center">Loading items...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && !error && (
          <InventoryTable 
            items={filteredItems}
            onEditClick={openEditModal}
          />
        )}
      </div>

      {isEditModalOpen && selectedItem && (
        <EditItem
          item={selectedItem}
          onClose={closeEditModal}
          onSubmit={handleEditSubmit}
        />
      )}
    </div>
  );
}
