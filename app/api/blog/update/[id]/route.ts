import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { connectToDB } from "@/lib/mongodb";
import Blog from "@/lib/models/Blog";
import fs from "fs";
import path from "path";

function extractImageUrls(html: string): string[] {
  const regex = /<img[^>]+src="([^">]+)"/g;
  const matches = [];
  let match;
  while ((match = regex.exec(html)) !== null) {
    matches.push(match[1]);
  }
  return matches;
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const urlParts = req.nextUrl.pathname.split("/");
    const id = urlParts[urlParts.length - 1];

    const {
      title,
      author,
      coverImage,
      content: newContent,
      category,
      readTime,
      featured,
    } = await req.json();

    if (!title || !coverImage || !newContent || !category || !readTime) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await connectToDB();

    const existingBlog = await Blog.findById(id);
    if (!existingBlog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    // ✅ Delete old cover image if changed
    if (existingBlog.coverImage && existingBlog.coverImage !== coverImage) {
      const oldPath = path.join(process.cwd(), "public", existingBlog.coverImage.replace("/uploads/", "uploads/"));
      if (fs.existsSync(oldPath)) fs.unlink(oldPath, () => {});
    }

    // ✅ Detect unused inline images
    const oldImages = extractImageUrls(existingBlog.content || "");
    const newImages = extractImageUrls(newContent || "");
    const unusedImages = oldImages.filter((url) => !newImages.includes(url));

    console.log("oldImages" , oldImages);
    console.log("newImages", newImages);
    console.log("unusedImages" , unusedImages);
    

    for (const url of unusedImages) {
      const imgPath = path.join(process.cwd(), "public", url.replace("/uploads/", "uploads/"));
      if (fs.existsSync(imgPath)) fs.unlink(imgPath, () => {});
    }

    // ✅ Update blog
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      {
        title,
        author,
        coverImage,
        content: newContent,
        category,
        readTime,
        featured,
      },
      { new: true }
    );

    return NextResponse.json({ message: "Blog updated", blog: updatedBlog });

  } catch (err) {
    console.error("Error updating blog:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
