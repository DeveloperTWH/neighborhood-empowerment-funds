import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongodb';
import { User } from '@/lib/models/User';
import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

// Helper to get the user ID from the URL
function extractIdFromUrl(req: NextRequest): string | null {
  const url = new URL(req.url);
  const match = url.pathname.match(/\/api\/users\/([^\/]+)/);
  return match ? match[1] : null;
}

// ─── GET USER ─────────────────────────────────────────────
export async function GET(req: NextRequest) {
  await connectToDB();
  const id = extractIdFromUrl(req);
  if (!id) return NextResponse.json({ error: 'Missing user ID' }, { status: 400 });

  const user = await User.findById(id);
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

  return NextResponse.json(user);
}

// ─── UPDATE USER ─────────────────────────────────────────
export async function PUT(req: NextRequest) {
  await connectToDB();
  const id = extractIdFromUrl(req);
  if (!id) return NextResponse.json({ error: 'Missing user ID' }, { status: 400 });

  const formData = await req.formData();
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const phone = formData.get('phone') as string;
  const removeAvatar = formData.get('removeAvatar') === 'true';
  const avatarFile = formData.get('avatar') as File | null;

  const user = await User.findById(id);
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

  let avatarPath = user.avatar;

  if (removeAvatar && avatarPath?.startsWith('/uploads/avatars')) {
    try {
      await fs.unlink(path.join(process.cwd(), 'public', avatarPath));
    } catch {
      console.warn('Old avatar already deleted or missing.');
    }
    avatarPath = '';
  }

  if (avatarFile && avatarFile.size > 0) {
    const buffer = Buffer.from(await avatarFile.arrayBuffer());
    const fileName = `${uuidv4()}_${avatarFile.name}`;
    const uploadDir = path.join(process.cwd(), 'public/uploads/avatars');
    const fullPath = path.join(uploadDir, fileName);
    const relativePath = `/uploads/avatars/${fileName}`;

    await fs.mkdir(uploadDir, { recursive: true });
    await fs.writeFile(fullPath, buffer);

    if (avatarPath?.startsWith('/uploads/avatars')) {
      try {
        await fs.unlink(path.join(process.cwd(), 'public', avatarPath));
      } catch {
        console.warn('Old avatar already deleted or missing.');
      }
    }

    avatarPath = relativePath;
  }

  user.name = name;
  user.email = email;
  user.phone = phone;
  user.avatar = avatarPath;
  await user.save();

  return NextResponse.json(user);
}

// ─── DELETE USER ────────────────────────────────────────
export async function DELETE(req: NextRequest) {
  await connectToDB();
  const id = extractIdFromUrl(req);
  if (!id) return NextResponse.json({ error: 'Missing user ID' }, { status: 400 });

  const user = await User.findById(id);
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

  if (user.avatar?.startsWith('/uploads/avatars')) {
    try {
      await fs.unlink(path.join(process.cwd(), 'public', user.avatar));
    } catch {
      console.warn('Avatar already deleted or missing.');
    }
  }

  await User.findByIdAndDelete(id);

  return NextResponse.json({ success: true, message: 'User deleted successfully' });
}
