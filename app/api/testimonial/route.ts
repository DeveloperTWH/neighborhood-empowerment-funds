import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { connectToDB } from '@/lib/mongodb';
import Testimonial from '@/lib/models/Testimonial';

const MAX_FILE_SIZE_MB = 2;
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];


// get: pulbic request
export async function GET() {
  try {
    await connectToDB();
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    return NextResponse.json(testimonials, { status: 200 });
  } catch (error) {
    console.error('[TESTIMONIAL_GET_ERROR]', error);
    return NextResponse.json({ error: 'Failed to fetch testimonials' }, { status: 500 });
  }
}



export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await req.formData();
    const name = formData.get('name')?.toString();
    const role = formData.get('role')?.toString();
    const quote = formData.get('quote')?.toString();
    const rating = parseFloat(formData.get('rating')?.toString() || '0');
    const file = formData.get('photo') as File;

    if (!name || !role || !quote || isNaN(rating) || !file) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json({ error: 'Only JPG, PNG, or WEBP files allowed' }, { status: 415 });
    }

    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      return NextResponse.json({ error: `File size must be <= ${MAX_FILE_SIZE_MB}MB` }, { status: 413 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = `${uuidv4()}-${file.name}`;
    const filePath = path.join(process.cwd(), 'public/uploads/testimonials', filename);

    await writeFile(filePath, buffer);

    await connectToDB();
    const newTestimonial = await Testimonial.create({
      name,
      role,
      quote,
      rating,
      photo: `/uploads/testimonials/${filename}`,
    });

    return NextResponse.json(newTestimonial, { status: 201 });
  } catch (error) {
    console.error('[TESTIMONIAL_POST_ERROR]', error);
    return NextResponse.json({ error: 'Failed to create testimonial' }, { status: 500 });
  }
}
