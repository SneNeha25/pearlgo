import { NextRequest, NextResponse } from 'next/server';
import { AdminService } from '@/backend/services/AdminService';
import { User } from '@/backend/models/User';

const adminService = new AdminService();

// GET /api/admin/users - Get all users
export async function GET() {
  try {
    const users = await adminService.getAllUsers();
    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

// POST /api/admin/users - Create a new user
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, passwordHash, preferences, role } = body;

    if (!name || !email || !passwordHash) {
      return NextResponse.json({ error: 'Name, email, and password are required' }, { status: 400 });
    }

    const userData: Omit<User, 'id' | 'createdAt'> = {
      name,
      email,
      passwordHash,
      preferences: preferences || [],
      role: role || 'USER',
    };

    const newUser = await adminService.createUser(userData);
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}
