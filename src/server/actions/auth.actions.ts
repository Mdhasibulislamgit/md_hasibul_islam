'use server';

import { AuthService } from '../services/features/auth.service';

export async function loginAdminAction(credentials: { username: string; password: string }) {
  return AuthService.login(credentials);
}
