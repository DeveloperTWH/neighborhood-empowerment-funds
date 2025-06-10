import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const { images } = await req.json(); // e.g., ["/uploads/blog/img1.jpg"]

    if (!Array.isArray(images)) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    images.forEach((relativePath: string) => {
      const filePath = path.join(process.cwd(), "public", relativePath);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log("Deleted:", filePath);
      }
    });

    return NextResponse.json({ message: "Unused images deleted" });
  } catch (err) {
    console.error("Cleanup error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
