import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/backend/services/AuthService';

// Mock authentication for demo - in real app, use proper session management
export async function GET(request: NextRequest) {
  try {
    // For demo purposes, return admin user
    // In real implementation, check session/cookies
    const mockAdminUser = {
      id: 'admin-1',
      name: 'Admin User',
      email: 'admin@pearlgo.com',
      role: 'ADMIN' as const,
      createdAt: new Date()
    };

    return NextResponse.json(mockAdminUser);
  } catch (error) {
    return NextResponse.json({ error: 'Authentication failed' }, { status: 401 });
  }
}