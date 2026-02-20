'use client';

import { LucideIcon } from 'lucide-react';

import { Input } from '@/components/ui/Input';

interface FormInputProps {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  icon: LucideIcon;
}

export const FormInput = ({
  id,
  label,
  type,
  value,
  onChange,
  placeholder,
  icon: Icon,
}: FormInputProps) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-text-secondary mb-2">
        {label}
      </label>
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
        <Input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-2.5 border border-border-subtle rounded-lg placeholder-text-muted focus-visible:border-brand-500 focus-visible:ring-brand-500/30"
        />
      </div>
    </div>
  );
};
