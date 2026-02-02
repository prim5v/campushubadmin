
import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

export function StatCard({
  title,
  value,
  icon,
  trend,
  color = 'indigo'
}) {
  const colorStyles = {
    indigo: 'bg-indigo-50 text-indigo-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    amber: 'bg-amber-50 text-amber-600',
    rose: 'bg-rose-50 text-rose-600',
    sky: 'bg-sky-50 text-sky-600'
  };

  return (
    <div className="bg-white overflow-hidden rounded-lg border border-slate-200 shadow-sm p-5">
      <div className="flex items-center">
        <div className={`flex-shrink-0 rounded-md p-3 ${colorStyles[color]}`}>
          {icon}
        </div>
        <div className="ml-5 w-0 flex-1">
          <dl>
            <dt className="truncate text-sm font-medium text-slate-500">
              {title}
            </dt>
            <dd>
              <div className="text-2xl font-semibold text-slate-900">
                {value}
              </div>
            </dd>
          </dl>
        </div>
      </div>
      {trend &&
      <div className="mt-4 flex items-center text-sm">
          {trend.positive ?
        <ArrowUpRight className="mr-1.5 h-4 w-4 flex-shrink-0 text-emerald-500" /> :
        trend.positive === false ?
        <ArrowDownRight className="mr-1.5 h-4 w-4 flex-shrink-0 text-rose-500" /> :

        <Minus className="mr-1.5 h-4 w-4 flex-shrink-0 text-slate-400" />
        }
          <span
          className={`font-medium ${trend.positive ? 'text-emerald-600' : trend.positive === false ? 'text-rose-600' : 'text-slate-500'}`}>

            {Math.abs(trend.value)}%
          </span>
          <span className="ml-2 text-slate-500">{trend.label}</span>
        </div>
      }
    </div>);

}