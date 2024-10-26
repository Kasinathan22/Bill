import React from 'react';

const FilterSection = ({ filters, onFilterChange, onClearFilters }) => (
  <div>
    <input
      type="text"
      placeholder="Search items"
      value={filters.searchTerm}
      onChange={(e) => onFilterChange({ searchTerm: e.target.value })}
      className="w-full mb-4 p-2 border border-gray-300 rounded-md"
    />
    <div className="flex flex-col gap-2">
      <label>
        <input
          type="checkbox"
          checked={filters.lowQuantity}
          onChange={(e) => onFilterChange({ lowQuantity: e.target.checked })}
        /> Low Quantity
      </label>
      <label>
        <input
          type="checkbox"
          checked={filters.outOfStock}
          onChange={(e) => onFilterChange({ outOfStock: e.target.checked })}
        /> Out of Stock
      </label>
      <label>
        <input
          type="checkbox"
          checked={filters.goods}
          onChange={(e) => onFilterChange({ goods: e.target.checked })}
        /> Goods
      </label>
      <label>
        <input
          type="checkbox"
          checked={filters.services}
          onChange={(e) => onFilterChange({ services: e.target.checked })}
        /> Services
      </label>
    </div>
    <button 
      onClick={onClearFilters}
      className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md"
    >
      Clear Filters
    </button>
  </div>
);

export default FilterSection;
