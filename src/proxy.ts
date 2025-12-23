import { authMiddleware } from '@/server/middleware/auth.middleware';
import type { NextRequest } from 'next/server';

export default async function proxy(request: NextRequest) {
  return authMiddleware(request);
}
