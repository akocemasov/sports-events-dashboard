'use client';

import { Trophy } from 'lucide-react';

interface AuthHeaderProps {
  title: string;
  subtitle: string;
}

export const AuthHeader = ({ title, subtitle }: AuthHeaderProps) => {
  return (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Trophy className="w-10 h-10 text-blue-600 dark:text-blue-400" />
        <span className="text-2xl font-bold text-gray-900 dark:text-white">SportsDash</span>
      </div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{title}</h2>
      <p className="text-gray-600 dark:text-gray-400">{subtitle}</p>
    </div>
  );
};
