import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongodb';
import Blog from '@/lib/models/Blog';

export async function GET(req: NextRequest) {
  try {
    await connectToDB();

    const { searchParams } = new URL(req.url);
    const sort = searchParams.get('sort') || 'random';

    let blogs;

    if (sort === 'recent') {
      blogs = await Blog.find({ featured: true })
        .sort({ createdAt: -1 })
        .lean();
    } else {
      blogs = await Blog.aggregate([
        { $match: { featured: true } },
        { $sample: { size: 6 } } // Fetch 6 random blogs
      ]);
    }
    console.log(blogs);
    

    return NextResponse.json(
      { blogs },
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, max-age=60',
        },
      }
    );
  } catch (error) {
    console.error('[FEATURED_BLOG_ERROR]', error);
    return NextResponse.json(
      { error: 'Failed to fetch featured blogs' },
      { status: 500 }
    );
  }
}
