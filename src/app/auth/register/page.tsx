import Link from 'next/link';
import { AuthForm } from '@/components/auth/auth-form';

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden py-12">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-900/10 via-black to-yellow-800/5"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(255,215,0,0.1),transparent_50%)]"></div>
      
      <div className="max-w-3xl w-full space-y-8 p-8 relative z-10">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl flex items-center justify-center mb-6 shadow-2xl">
            <svg className="h-8 w-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent mb-2">Join Our Platform</h2>
          <p className="text-gray-400">
            Already have an account?{' '}
            <Link href="/auth/login" className="font-semibold text-yellow-400 hover:text-yellow-300 transition-colors">
              Sign in
            </Link>
          </p>
        </div>
        
        <div className="bg-gray-900/50 backdrop-blur-xl py-8 px-8 shadow-2xl rounded-2xl border border-gray-800">
          <AuthForm type="register" />
        </div>
      </div>
    </div>
  );
}