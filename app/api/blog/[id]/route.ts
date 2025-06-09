import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongodb';
import Blog from '@/lib/models/Blog';

export async function GET(req: NextRequest) {
  try {
    await connectToDB();

    const url = new URL(req.url);
    const pathname = url.pathname; // e.g., "/api/blog/6846bc63a4280f1d6adf1c3f"
    const id = pathname.split("/").pop(); // Extract the ID from the URL

    if (!id) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    const blog = await Blog.findById(id).populate("category").lean();

    if (!blog) {
      return NextResponse.json({ error: "Not Found" }, { status: 404 });
    }

    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    console.error('[BLOG_DETAIL_ERROR]', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
