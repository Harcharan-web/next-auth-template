'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { loginSchema, registerSchema } from '@/lib/validations/auth';

interface AuthFormProps {
  type: 'login' | 'register';
}

export function AuthForm({ type }: AuthFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    try {
      if (type === 'login') {
        const validatedData = loginSchema.parse(data);
        const result = await signIn('credentials', {
          email: validatedData.email,
          password: validatedData.password,
          redirect: false,
        });

        if (result?.error) {
          setErrors({ general: 'Invalid credentials' });
        } else {
          router.push('/');
        }
      } else {
        const validatedData = registerSchema.parse(data);
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(validatedData),
        });

        if (response.ok) {
          router.push('/auth/login?message=Registration successful');
        } else {
          const error = await response.json();
          setErrors({ general: error.message || 'Registration failed' });
        }
      }
    } catch (error: unknown) {
      const err = error as { errors?: { path: string[]; message: string }[] };
      if (err.errors) {
        const fieldErrors: Record<string, string> = {};
        err.errors.forEach((validationErr) => {
          fieldErrors[validationErr.path[0]] = validationErr.message;
        });
        setErrors(fieldErrors);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {type === 'register' && (
        <>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Input name="firstName" type="text" placeholder="First name" required />
              {errors.firstName && <p className="text-sm text-red-400 mt-1">{errors.firstName}</p>}
            </div>
            <div>
              <Input name="lastName" type="text" placeholder="Last name" required />
              {errors.lastName && <p className="text-sm text-red-400 mt-1">{errors.lastName}</p>}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Input name="phone" type="tel" placeholder="Phone (optional)" />
              {errors.phone && <p className="text-sm text-red-400 mt-1">{errors.phone}</p>}
            </div>
            <div>
              <Input name="dateOfBirth" type="date" placeholder="Date of Birth" />
              {errors.dateOfBirth && <p className="text-sm text-red-400 mt-1">{errors.dateOfBirth}</p>}
            </div>
          </div>

          <div>
            <Input name="address" type="text" placeholder="Address (optional)" />
            {errors.address && <p className="text-sm text-red-400 mt-1">{errors.address}</p>}
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Input name="city" type="text" placeholder="City" />
              {errors.city && <p className="text-sm text-red-400 mt-1">{errors.city}</p>}
            </div>
            <div>
              <Input name="state" type="text" placeholder="State" />
              {errors.state && <p className="text-sm text-red-400 mt-1">{errors.state}</p>}
            </div>
            <div>
              <Input name="zipCode" type="text" placeholder="ZIP Code" />
              {errors.zipCode && <p className="text-sm text-red-400 mt-1">{errors.zipCode}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Input name="department" type="text" placeholder="Department (optional)" />
              {errors.department && <p className="text-sm text-red-400 mt-1">{errors.department}</p>}
            </div>
            <div>
              <Input name="position" type="text" placeholder="Position (optional)" />
              {errors.position && <p className="text-sm text-red-400 mt-1">{errors.position}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Input name="employeeId" type="text" placeholder="Employee ID (optional)" />
              {errors.employeeId && <p className="text-sm text-red-400 mt-1">{errors.employeeId}</p>}
            </div>
            <div>
              <select
                name="role"
                className="flex h-11 w-full rounded-lg border-2 border-gray-700 bg-gray-900 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-200"
                defaultValue="employee"
              >
                <option value="employee">Employee</option>
                <option value="client">Client</option>
                <option value="vendor">Vendor</option>
              </select>
              {errors.role && <p className="text-sm text-red-400 mt-1">{errors.role}</p>}
            </div>
          </div>
        </>
      )}
      
      <div>
        <Input name="email" type="email" placeholder="Email address" required />
        {errors.email && <p className="text-sm text-red-400 mt-1">{errors.email}</p>}
      </div>

      <div>
        <Input name="password" type="password" placeholder="Password" required />
        {errors.password && <p className="text-sm text-red-400 mt-1">{errors.password}</p>}
      </div>

      {type === 'register' && (
        <div>
          <Input name="confirmPassword" type="password" placeholder="Confirm password" required />
          {errors.confirmPassword && <p className="text-sm text-red-400 mt-1">{errors.confirmPassword}</p>}
        </div>
      )}

      {errors.general && <p className="text-sm text-red-400">{errors.general}</p>}

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Loading...' : type === 'login' ? 'Sign In' : 'Sign Up'}
      </Button>

      {type === 'login' && (
        <>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-700" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-gray-900 px-2 text-gray-400">Or continue with</span>
            </div>
          </div>
          
          <Button type="button" variant="outline" className="w-full" onClick={() => signIn('google', { callbackUrl: '/', prompt: 'select_account' })}>
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Continue with Google
          </Button>
          
          <div className="text-center">
            <Link href="/auth/forgot-password" className="text-sm text-yellow-400 hover:text-yellow-300 transition-colors">
              Forgot your password?
            </Link>
          </div>
        </>
      )}
    </form>
  );
}