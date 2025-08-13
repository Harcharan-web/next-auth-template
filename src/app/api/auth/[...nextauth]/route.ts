import NextAuth from 'next-auth';
import { authOptions } from '@/lib/auth';
import type { NextRequest } from 'next/server';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handler = (NextAuth as any)(authOptions);

export const GET = handler as (req: NextRequest) => Promise<Response>;
export const POST = handler as (req: NextRequest) => Promise<Response>;
