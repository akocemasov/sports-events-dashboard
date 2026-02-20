'use client';

import { Lock, Mail, User } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

import { ErrorAlert } from '@/components/ErrorAlert';
import { FormInput } from '@/components/FormInput';
import { Button } from '@/components/ui/Button';
import { APP_NAME } from '@/config/appConfig';
import { useAuthStore } from '@/store/authStore';

import { AuthHeader } from './AuthHeader';
import { DemoNotice } from './DemoNotice';

export const RegisterForm = () => {
  const router = useRouter();
  const { register } = useAuthStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);
    const success = await register(email, password, name);
    setIsLoading(false);

    if (success) {
      toast.success('Account created successfully!');
      router.push('/');
    } else {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center px-4 py-6">
      <div className="max-w-md w-full">
        <AuthHeader
          title="Create an account"
          subtitle={`Join ${APP_NAME} to track your favorite events`}
        />

        <div className="bg-surface-card rounded-xl border border-border-subtle p-6 sm:p-8">
          <DemoNotice />

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <ErrorAlert message={error} />}

            <FormInput
              id="name"
              label="Full Name"
              type="text"
              value={name}
              onChange={setName}
              placeholder="John Doe"
              icon={User}
            />

            <FormInput
              id="email"
              label="Email"
              type="email"
              value={email}
              onChange={setEmail}
              placeholder="you@example.com"
              icon={Mail}
            />

            <FormInput
              id="password"
              label="Password"
              type="password"
              value={password}
              onChange={setPassword}
              placeholder="••••••••"
              icon={Lock}
            />

            <FormInput
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={setConfirmPassword}
              placeholder="••••••••"
              icon={Lock}
            />

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 bg-brand-600 hover:bg-brand-700 disabled:bg-brand-400 text-white font-medium rounded-lg transition-colors"
            >
              {isLoading ? 'Creating account...' : 'Create account'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-text-secondary">
              Already have an account?{' '}
              <Link href="/login" className="text-link hover:underline font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
