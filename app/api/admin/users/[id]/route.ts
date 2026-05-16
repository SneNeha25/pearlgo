import { NextRequest, NextResponse } from 'next/server';
import { AdminService } from '@/backend/services/AdminService';

const adminService = new AdminService();

interface RouteParams {
  params: {
    id: string;
  };
}

// GET /api/admin/users/[id] - Get a specific user
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params;
    const user = await adminService.getUserById(id);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 });
  }
}

// PUT /api/admin/users/[id] - Update a user
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params;
    const body = await request.json();
    const { name, email, passwordHash, preferences, role } = body;

    const updates: Partial<any> = {};
    if (name !== undefined) updates.name = name;
    if (email !== undefined) updates.email = email;
    if (passwordHash !== undefined) updates.passwordHash = passwordHash;
    if (preferences !== undefined) updates.preferences = preferences;
    if (role !== undefined) updates.role = role;

    const updatedUser = await adminService.updateUser(id, updates);

    if (!updatedUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}

// DELETE /api/admin/users/[id] - Delete a user
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params;
    const success = await adminService.deleteUser(id);

    if (!success) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
  }
}
