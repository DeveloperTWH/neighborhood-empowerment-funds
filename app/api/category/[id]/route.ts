import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectToDB } from "@/lib/mongodb";
import Category from "@/lib/models/Category";
import { NextRequest, NextResponse } from "next/server";

// DELETE /api/category/[id]
export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const url = new URL(req.url);
    const id = url.pathname.split("/").pop(); // Extract the id from the path

    if (!id) {
      return NextResponse.json({ error: "Missing category ID" }, { status: 400 });
    }

    await connectToDB();
    const deleted = await Category.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Category deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("[CATEGORY_DELETE_ERROR]", error);
    return NextResponse.json({ error: "Failed to delete category" }, { status: 500 });
  }
}


export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const url = new URL(req.url);
    const id = url.pathname.split("/").pop(); // Extract category ID

    if (!id) {
      return NextResponse.json({ error: "Missing category ID" }, { status: 400 });
    }

    const { name } = await req.json();

    if (!name) {
      return NextResponse.json({ error: "Category name is required" }, { status: 400 });
    }

    await connectToDB();
    const updated = await Category.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error("[CATEGORY_UPDATE_ERROR]", error);
    return NextResponse.json({ error: "Failed to update category" }, { status: 500 });
  }
}
