import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { connectToDB } from "@/lib/mongodb";
import Blog from "@/lib/models/Blog";
import fs from "fs";
import path from "path";

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Extract blog ID from URL path
    const urlParts = req.nextUrl.pathname.split("/");
    const id = urlParts[urlParts.length - 1];

    await connectToDB();

    const blog = await Blog.findById(id);
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    // Delete cover image
    try {
      const coverPath = path.join(process.cwd(), "public", blog.coverImage);
      if (fs.existsSync(coverPath)) {
        fs.unlinkSync(coverPath);
      }
    } catch (err) {
      console.warn("Failed to delete cover image:", err);
    }

    // Delete embedded images in content
    try {
      const imgRegex = /<img[^>]+src="([^">]+)"/g;
      let match;
      const imagePaths: string[] = [];

      while ((match = imgRegex.exec(blog.content)) !== null) {
        imagePaths.push(match[1]); // e.g., '/uploads/blog/xyz.jpg'
      }

      imagePaths.forEach((relativePath) => {
        const fullPath = path.join(process.cwd(), "public", relativePath);
        if (fs.existsSync(fullPath)) {
          fs.unlinkSync(fullPath);
        }
      });
    } catch (err) {
      console.warn("Failed to delete embedded images:", err);
    }

    // Delete the blog document
    await blog.deleteOne();

    return NextResponse.json({ message: "Blog and images deleted successfully" });
  } catch (err) {
    console.error("Error deleting blog:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
