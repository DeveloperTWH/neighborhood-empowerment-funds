import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth/next";
import fs from "fs/promises";
import path from "path";
import { v4 as uuid } from "uuid";
import { authOptions } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await req.formData();
  const file = form.get("coverImage") as File || form.get("image") as File;
  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const ext = file.name.split(".").pop();
  const fileName = `${uuid()}.${ext}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads", "blog");
  await fs.mkdir(uploadDir, { recursive: true });
  await fs.writeFile(path.join(uploadDir, fileName), buffer);

  const url = `/uploads/blog/${fileName}`;
  return NextResponse.json({ url }, { status: 200 });
}
