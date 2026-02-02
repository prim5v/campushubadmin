
import React from 'react';
import { Filter } from 'lucide-react';

export function FilterDropdown({ label, options, value, onChange }) {
  return (
    <div className="flex items-center space-x-2">
      <label className="text-sm font-medium text-slate-700 flex items-center">
        <Filter className="w-4 h-4 mr-1 text-slate-400" />
        {label}:
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md bg-white border shadow-sm">

        <option value="">All</option>
        {options.map((option) =>
        <option key={option.value} value={option.value}>
            {option.label}
          </option>
        )}
      </select>
    </div>);

}