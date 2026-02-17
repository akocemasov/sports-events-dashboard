'use client';

import { AlertCircle } from 'lucide-react';

interface ErrorAlertProps {
  message: string;
}

export const ErrorAlert = ({ message }: ErrorAlertProps) => {
  return (
    <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
      <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0" />
      <p className="text-sm text-red-800 dark:text-red-300">{message}</p>
    </div>
  );
};
