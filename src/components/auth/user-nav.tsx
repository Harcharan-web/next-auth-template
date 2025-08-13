'use client';

import { useSession, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';

export function UserNav() {
  const { data: session, status } = useSession();

  if (status === 'loading') return <div>Loading...</div>;

  if (!session) {
    return (
      <div className="flex gap-3">
        <Button variant="outline" size="sm" onClick={() => window.location.href = '/auth/login'}>
          Sign In
        </Button>
        <Button size="sm" onClick={() => window.location.href = '/auth/register'}>
          Sign Up
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <div className="text-sm">
        <div className="text-white font-medium">Welcome, {session.user?.name || session.user?.email}</div>
        {(session.user as { role?: string })?.role && (
          <div className="text-xs text-yellow-400 capitalize font-medium">{(session.user as { role?: string }).role?.replace('_', ' ')}</div>
        )}
      </div>
      <Button variant="outline" size="sm" onClick={() => signOut({ callbackUrl: '/auth/login' })}>
        Sign Out
      </Button>
    </div>
  );
}