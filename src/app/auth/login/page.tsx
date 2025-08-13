import Link from 'next/link';
import { AuthForm } from '@/components/auth/auth-form';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-900/10 via-black to-yellow-800/5"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,215,0,0.1),transparent_50%)]"></div>
      
      <div className="max-w-md w-full space-y-8 p-8 relative z-10">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl flex items-center justify-center mb-6 shadow-2xl">
            <svg className="h-8 w-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent mb-2">Welcome Back</h2>
          <p className="text-gray-400">
            Don&apos;t have an account?{' '}
            <Link href="/auth/register" className="font-semibold text-yellow-400 hover:text-yellow-300 transition-colors">
              Sign up
            </Link>
          </p>
        </div>
        
        <div className="bg-gray-900/50 backdrop-blur-xl py-8 px-6 shadow-2xl rounded-2xl border border-gray-800">
          <AuthForm type="login" />
        </div>
      </div>
    </div>
  );
}