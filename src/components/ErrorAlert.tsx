import { AlertCircle } from 'lucide-react';

interface ErrorAlertProps {
  message: string;
}

export const ErrorAlert = ({ message }: ErrorAlertProps) => {
  return (
    <div className="flex items-center gap-2 p-3 bg-danger-400/10 border border-danger-400/30 rounded-lg">
      <AlertCircle className="w-5 h-5 text-danger-500 shrink-0" />
      <p className="text-sm text-danger-500">{message}</p>
    </div>
  );
};
