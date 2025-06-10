import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongodb';
import Blog from '@/lib/models/Blog';

type BlogFilter = {
  $or?: { [key: string]: { $regex: string; $options: string } }[];
  category?: string;
};


export async function GET(req: NextRequest) {
  try {
    await connectToDB();

    const { searchParams } = new URL(req.url);
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '10', 10)));
    const skip = (page - 1) * limit;

    const search = searchParams.get('search')?.toLowerCase() || "";
    const category = searchParams.get('category');

    const filter:  BlogFilter  = {};
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { author: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
      ];
    }
    if (category) {
      filter.category = category;
    }

    const totalPosts = await Blog.countDocuments(filter);
    const posts = await Blog.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    return NextResponse.json({ posts, total: totalPosts, page, limit }, { status: 200 });
  } catch (error) {
    console.error('[BLOG_LIST_ERROR]', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
