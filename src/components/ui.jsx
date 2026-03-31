
import React, { forwardRef } from 'react';
import { Loader2, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

// --- Card ---
export function Card({ children, className = '' }) {
  return (
    <div
      className={`bg-white shadow-sm rounded-xl border border-slate-200 overflow-hidden ${className}`}>
      
      {children}
    </div>);

}

export function CardHeader({ children, className = '' }) {
  return (
    <div className={`px-6 py-5 border-b border-slate-100 ${className}`}>
      {children}
    </div>);

}

export function CardTitle({ children, className = '' }) {
  return (
    <h3 className={`text-lg font-semibold text-slate-900 ${className}`}>
      {children}
    </h3>);

}

export function CardContent({ children, className = '' }) {
  return <div className={`px-6 py-5 ${className}`}>{children}</div>;
}

// --- Button ---
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className = '',
  disabled,
  ...props
}) {
  const baseStyles =
  'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
  const variants = {
    primary:
    'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500 shadow-sm',
    secondary:
    'bg-slate-100 text-slate-900 hover:bg-slate-200 focus:ring-slate-500',
    outline:
    'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 focus:ring-indigo-500 shadow-sm',
    ghost:
    'bg-transparent text-slate-700 hover:bg-slate-100 focus:ring-slate-500',
    danger:
    'bg-rose-600 text-white hover:bg-rose-700 focus:ring-rose-500 shadow-sm'
  };
  const sizes = {
    sm: 'h-8 px-3 text-xs',
    md: 'h-10 px-4 text-sm',
    lg: 'h-12 px-6 text-base'
  };
  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}>
      
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </button>);

}

// --- Badge ---
export function Badge({ children, variant = 'default', className = '', ...props }) {
  const variants = {
    success: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
    warning: 'bg-amber-50 text-amber-700 ring-amber-600/20',
    error: 'bg-rose-50 text-rose-700 ring-rose-600/20',
    info: 'bg-indigo-50 text-indigo-700 ring-indigo-600/20',
    default: 'bg-slate-50 text-slate-700 ring-slate-600/20'
  };
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${variants[variant]} ${className}`}
      {...props}>
      
      {children}
    </span>);

}

// --- Form Controls ---
export const Label = forwardRef(({ className = '', ...props }, ref) =>
<label
  ref={ref}
  className={`block text-sm font-medium text-slate-700 mb-1.5 ${className}`}
  {...props} />

);
Label.displayName = 'Label';

export const Input = forwardRef(({ className = '', ...props }, ref) =>
<input
  ref={ref}
  className={`block w-full rounded-lg border-0 py-2 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${className}`}
  {...props} />

);
Input.displayName = 'Input';

export const Textarea = forwardRef(({ className = '', ...props }, ref) =>
<textarea
  ref={ref}
  className={`block w-full rounded-lg border-0 py-2 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${className}`}
  {...props} />

);
Textarea.displayName = 'Textarea';

export const Select = forwardRef(({ className = '', ...props }, ref) =>
<select
  ref={ref}
  className={`block w-full rounded-lg border-0 py-2 pl-3 pr-10 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${className}`}
  {...props} />

);
Select.displayName = 'Select';

// --- Alert ---
export function Alert({ title, message, variant = 'info', onClose }) {
  const variants = {
    success: {
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
      text: 'text-emerald-800',
      icon: <CheckCircle className="h-5 w-5 text-emerald-400" />
    },
    error: {
      bg: 'bg-rose-50',
      border: 'border-rose-200',
      text: 'text-rose-800',
      icon: <XCircle className="h-5 w-5 text-rose-400" />
    },
    info: {
      bg: 'bg-indigo-50',
      border: 'border-indigo-200',
      text: 'text-indigo-800',
      icon: <AlertCircle className="h-5 w-5 text-indigo-400" />
    }
  };
  const active = variants[variant];
  return (
    <div className={`rounded-lg border p-4 ${active.bg} ${active.border}`}>
      <div className="flex">
        <div className="flex-shrink-0">{active.icon}</div>
        <div className="ml-3 flex-1">
          {title &&
          <h3 className={`text-sm font-medium ${active.text}`}>{title}</h3>
          }
          <div className={`text-sm ${title ? 'mt-2' : ''} ${active.text}`}>
            {message}
          </div>
        </div>
        {onClose &&
        <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button
              type="button"
              onClick={onClose}
              className={`inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2 ${active.bg} ${active.text} hover:bg-opacity-80`}>
              
                <span className="sr-only">Dismiss</span>
                <XCircle className="h-5 w-5" />
              </button>
            </div>
          </div>
        }
      </div>
    </div>);

}