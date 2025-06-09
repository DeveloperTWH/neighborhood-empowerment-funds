import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import Category from "@/lib/models/Category";

// GET: Fetch all categories
export async function GET() {
  try {
    await connectToDB();
    const categories = await Category.find().sort({ name: 1 });
    return NextResponse.json(categories);
  } catch (error) {
    console.error("[CATEGORY_GET_ERROR]", error);
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
  }
}

// POST: Create a new category (admin only)
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name } = await req.json();

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    await connectToDB();
    const exists = await Category.findOne({ name });
    if (exists) {
      return NextResponse.json({ error: "Category already exists" }, { status: 409 });
    }

    const newCategory = await Category.create({ name });
    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    console.error("[CATEGORY_POST_ERROR]", error);
    return NextResponse.json({ error: "Failed to create category" }, { status: 500 });
  }
}
