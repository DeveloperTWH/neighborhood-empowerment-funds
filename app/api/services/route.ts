import { Service } from "@/lib/models/Service";
import { connectToDB } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // adjust path if needed

import path from "path";
import { writeFile } from "fs/promises";
import { mkdirSync, existsSync } from "fs";


export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectToDB();
    const services = await Service.find().sort({ _id: -1 });

    return NextResponse.json(services);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch services", error },
      { status: 500 }
    );
  }
}



export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
        console.log("nan not an admin");
        
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();


    const file = formData.get("image") as File;
    const title = formData.get("title")?.toString() || "";
    const descriptionRaw = formData.getAll("description");
    const featuresRaw = formData.getAll("features");

    // Validation
    if (
      !file ||
      !title.trim() ||
      descriptionRaw.length === 0 ||
      featuresRaw.length === 0
    ) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { message: "Invalid image type" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const uploadDir = path.join(process.cwd(), "public/uploads/service");
    if (!existsSync(uploadDir)) mkdirSync(uploadDir, { recursive: true });

    const fileName = `${Date.now()}-${file.name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9.\-_]/g, "")}`;
    const filePath = path.join(uploadDir, fileName);
    await writeFile(filePath, buffer);
    const imageUrl = `/uploads/service/${fileName}`;

    await connectToDB();

    const newService = await Service.create({
      title: title.trim(),
      image: imageUrl,
      description: descriptionRaw.map((d) => d.toString().trim()),
      features: featuresRaw.map((f) => f.toString().trim()),
    });

    return NextResponse.json(newService, { status: 201 });
  } catch (error) {
    console.error("Upload service error:", error);
    return NextResponse.json(
      { message: "Failed to create service", error },
      { status: 500 }
    );
  }
}
