import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { connectToDB } from "@/lib/mongodb";
import Blog from "@/lib/models/Blog";

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const urlParts = req.nextUrl.pathname.split("/");
    const id = urlParts[urlParts.length - 1];

    const { featured } = await req.json(); // expects: { featured: true/false }

    if (typeof featured !== "boolean") {
      return NextResponse.json({ error: "Missing or invalid 'featured' value" }, { status: 400 });
    }

    await connectToDB();

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { featured },
      { new: true }
    );

    if (!updatedBlog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: `Blog ${featured ? "marked as featured" : "unfeatured"}`,
      blog: updatedBlog,
    });
  } catch (err) {
    console.error("Error updating featured status:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
