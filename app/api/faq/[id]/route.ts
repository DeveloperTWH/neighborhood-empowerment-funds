import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectToDB } from "@/lib/mongodb";
import FAQ from "@/lib/models/Faq";
import { NextResponse } from "next/server";

// DELETE: /api/faq/[id]
export async function DELETE(_req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;  // ✅ Await here
    await connectToDB();
    const deleted = await FAQ.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ error: "FAQ not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "FAQ deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("[FAQ_DELETE_ERROR]", error);
    return NextResponse.json({ error: "Failed to delete FAQ" }, { status: 500 });
  }
}

// PUT: /api/faq/[id]
export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;  // ✅ Await here
    const { question, answer } = await req.json();

    if (!question || !answer) {
      return NextResponse.json({ error: "Question and answer are required" }, { status: 400 });
    }

    await connectToDB();
    const updated = await FAQ.findByIdAndUpdate(id, { question, answer }, { new: true });

    if (!updated) {
      return NextResponse.json({ error: "FAQ not found" }, { status: 404 });
    }

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error("[FAQ_UPDATE_ERROR]", error);
    return NextResponse.json({ error: "Failed to update FAQ" }, { status: 500 });
  }
}
