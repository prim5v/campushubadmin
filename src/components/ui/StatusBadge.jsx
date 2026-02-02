
import React from 'react';

export function StatusBadge({ status, className = '' }) {
  const normalizedStatus = status.toLowerCase();
  let styles = 'bg-slate-100 text-slate-700';

  if (
  ['verified', 'active', 'confirmed', 'completed', 'approved'].includes(
    normalizedStatus
  ))
  {
    styles = 'bg-emerald-100 text-emerald-700 border border-emerald-200';
  } else if (['pending', 'processing', 'review'].includes(normalizedStatus)) {
    styles = 'bg-amber-100 text-amber-700 border border-amber-200';
  } else if (
  ['failed', 'inactive', 'cancelled', 'rejected', 'banned'].includes(
    normalizedStatus
  ))
  {
    styles = 'bg-rose-100 text-rose-700 border border-rose-200';
  } else if (['info', 'draft'].includes(normalizedStatus)) {
    styles = 'bg-sky-100 text-sky-700 border border-sky-200';
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${styles} ${className}`}>

      {status.replace('_', ' ')}
    </span>);

}