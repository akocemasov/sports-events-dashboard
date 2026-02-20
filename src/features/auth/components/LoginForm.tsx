'use client';

import { Lock, Mail } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

import { ErrorAlert } from '@/components/ErrorAlert';
import { FormInput } from '@/components/FormInput';
import { Button } from '@/components/ui/Button';
import { useAuthStore } from '@/store/authStore';

import { AuthHeader } from './AuthHeader';
import { DemoNotice } from './DemoNotice';

export const LoginForm = () => {
  const router = useRouter();
  const { login } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    const success = await login(email, password);
    setIsLoading(false);

    if (success) {
      toast.success('Successfully logged in!');
      router.push('/');
    } else {
      setError('Login failed. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center px-4 py-6">
      <div className="max-w-md w-full">
        <AuthHeader
          title="Welcome back"
          subtitle="Sign in to access your personalized sports dashboard"
        />

        <div className="bg-surface-card rounded-xl border border-border-subtle p-6 sm:p-8">
          <DemoNotice />

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <ErrorAlert message={error} />}

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

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 bg-brand-600 hover:bg-brand-700 disabled:bg-brand-400 text-white font-medium rounded-lg transition-colors"
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-text-secondary">
              Don&apos;t have an account?{' '}
              <Link href="/register" className="text-link hover:underline font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
