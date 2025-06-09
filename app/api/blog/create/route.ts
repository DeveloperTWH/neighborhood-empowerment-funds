import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { connectToDB } from "@/lib/mongodb";
import Blog from "@/lib/models/Blog";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const {
      title,
      author,
      coverImage,
      content,
      category,
      readTime,
      featured,
    } = await req.json();

    if (
      !title ||
      !author ||
      !content ||
      !category?.length ||
      !readTime
    ) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await connectToDB();

    const newBlog = await Blog.create({
      title,
      author,
      coverImage,
      content,
      category,
      readTime,
      featured: !!featured, // Convert to boolean just in case
    });

    return NextResponse.json({ blog: newBlog }, { status: 201 });
  } catch (err) {
    console.error("Error creating blog:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
