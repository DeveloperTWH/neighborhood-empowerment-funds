import { connectToDB } from '@/lib/mongodb';
import Testimonial from '@/lib/models/Testimonial';
import { NextResponse, NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';


export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const formData = await req.formData();

    const name = formData.get('name')?.toString() || '';
    const role = formData.get('role')?.toString() || '';
    const quote = formData.get('quote')?.toString() || '';
    const rating = parseFloat(formData.get('rating')?.toString() || '0');
    const newFile = formData.get('photo') as File | null;

    await connectToDB();

    const existing = await Testimonial.findById(id);
    if (!existing) {
      return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
    }

    let photoPath = existing.photo;

    if (newFile && newFile.size > 0) {
      const oldImagePath = path.join(process.cwd(), 'public', photoPath);
      try {
        await fs.unlink(oldImagePath);
      } catch (e) {
        console.warn('Failed to delete old image (may not exist):', e);
      }

      const buffer = Buffer.from(await newFile.arrayBuffer());
      const fileName = `${uuidv4()}-${newFile.name}`;
      photoPath = path.join('/uploads/testimonials', fileName).replace(/\\/g, '/');
      const fullPath = path.join(process.cwd(), 'public', photoPath);
      await fs.writeFile(fullPath, buffer);
    }

    existing.name = name;
    existing.role = role;
    existing.quote = quote;
    existing.rating = rating;
    existing.photo = photoPath;
    await existing.save();

    return NextResponse.json({ message: 'Testimonial updated', testimonial: existing });
  } catch (err) {
    console.error('[TESTIMONIAL_PUT_ERROR]', err);
    return NextResponse.json({ error: 'Failed to update testimonial' }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    await connectToDB();

    const testimonial = await Testimonial.findById(id);
    if (!testimonial) {
      return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
    }

    const imagePath = path.join(process.cwd(), 'public', testimonial.photo);
    try {
      await fs.unlink(imagePath);
    } catch (e) {
      console.warn('Failed to delete testimonial image (may not exist):', e);
    }

    await testimonial.deleteOne();

    return NextResponse.json({ message: 'Testimonial deleted successfully' });
  } catch (err) {
    console.error('[TESTIMONIAL_DELETE_ERROR]', err);
    return NextResponse.json({ error: 'Failed to delete testimonial' }, { status: 500 });
  }
}
