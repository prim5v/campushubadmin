
import React from 'react';

export function DataTable({
  columns,
  data,
  onRowClick,
  actions,
  isLoading = false
}) {
  if (isLoading) {
    return (
      <div className="w-full h-64 flex items-center justify-center bg-white rounded-lg border border-slate-200">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>);

  }

  return (
    <div className="overflow-x-auto bg-white rounded-lg border border-slate-200 shadow-sm">
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-slate-50">
          <tr>
            {columns.map((column, index) =>
            <th
              key={index}
              scope="col"
              className={`px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider ${column.className || ''}`}>

                {column.header}
              </th>
            )}
            {actions &&
            <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            }
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-slate-200">
          {data.length === 0 ?
          <tr>
              <td
              colSpan={columns.length + (actions ? 1 : 0)}
              className="px-6 py-12 text-center text-slate-500">

                No data available
              </td>
            </tr> :

          data.map((row) =>
          <tr
            key={row.id}
            className={`hover:bg-slate-50 transition-colors ${onRowClick ? 'cursor-pointer' : ''}`}
            onClick={() => onRowClick && onRowClick(row)}>

                {columns.map((column, colIndex) =>
            <td
              key={colIndex}
              className={`px-6 py-4 whitespace-nowrap text-sm text-slate-700 ${column.className || ''}`}>

                    {column.cell ?
              column.cell(row) :
              typeof column.accessorKey === 'function' ?
              column.accessorKey(row) :
              row[column.accessorKey]}
                  </td>
            )}
                {actions &&
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {actions(row)}
                  </td>
            }
              </tr>
          )
          }
        </tbody>
      </table>
    </div>);

}