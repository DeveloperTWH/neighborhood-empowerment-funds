import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectToDB } from "@/lib/mongodb";
import Faq from "@/lib/models/Faq";

// GET all FAQs
export async function GET() {
  try {
    await connectToDB();
    const faqs = await Faq.find().sort({ createdAt: -1 });
    return NextResponse.json(faqs, { status: 200 });
  } catch (error) {
    console.error("[FAQ_GET_ERROR]", error);
    return NextResponse.json({ error: "Failed to fetch FAQs" }, { status: 500 });
  }
}

// POST create a new FAQ
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { question, answer } = await req.json();

    if (!question || !answer) {
      return NextResponse.json({ error: "Both question and answer are required" }, { status: 400 });
    }

    await connectToDB();
    const newFaq = await Faq.create({ question, answer });

    return NextResponse.json(newFaq, { status: 201 });
  } catch (error) {
    console.error("[FAQ_POST_ERROR]", error);
    return NextResponse.json({ error: "Failed to create FAQ" }, { status: 500 });
  }
}
