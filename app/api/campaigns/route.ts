import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import { connectToDB } from "@/lib/mongodb";
import Campaign from "@/lib/models/Campaign";

export const config = {
  api: {
    bodyParser: false,
  },
};

const UPLOAD_DIR = path.join(process.cwd(), "public/uploads");

async function saveFile(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const fileName = `${Date.now()}_${file.name}`;
  const filePath = path.join(UPLOAD_DIR, fileName);
  await fs.mkdir(UPLOAD_DIR, { recursive: true });
  await fs.writeFile(filePath, buffer);
  return `/uploads/${fileName}`;
}

function getStringField(field: FormDataEntryValue | null): string {
  if (!field) return "";
  if (typeof field === "string") return field;
  return "";
}

export async function GET(req: Request) {
  try {
    await connectToDB();

    const url = new URL(req.url);
    const ownerId = url.searchParams.get("ownerId");

    if (!ownerId) {
      return NextResponse.json(
        { success: false, error: "Missing ownerId" },
        { status: 400 }
      );
    }

    const campaigns = await Campaign.find({ ownerId }).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, campaigns });
  } catch (err) {
    console.error("Error fetching campaigns:", err);
    return NextResponse.json(
      { success: false, error: "Failed to fetch campaigns" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectToDB();

    const formData = await req.formData();

    const title = getStringField(formData.get("title"));
    const description = getStringField(formData.get("description"));
    const fundingTarget = getStringField(formData.get("fundingTarget"));
    const equityOffered = getStringField(formData.get("equityOffered"));
    const preMoneyValuation = getStringField(formData.get("preMoneyValuation"));
    const sharePrice = getStringField(formData.get("sharePrice"));
    const additionalInvestment = getStringField(
      formData.get("additionalInvestment")
    );
    const website = getStringField(formData.get("website"));
    const companiesHouseLink = getStringField(
      formData.get("companiesHouseLink")
    );
    const linkedinLink = getStringField(formData.get("linkedinLink"));
    const instagramLink = getStringField(formData.get("instagramLink"));
    const facebookLink = getStringField(formData.get("facebookLink"));
    const deadline = getStringField(formData.get("deadline"));

    const ownerId = getStringField(formData.get("ownerId")); // ✅ Added

    if (!title || !description || !fundingTarget || !ownerId) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    let categories: unknown[] = [];
    let sections: unknown[] = [];
    let valueHighlights: unknown[] = [];

    try {
      categories = JSON.parse(
        getStringField(formData.get("categories")) || "[]"
      ) as unknown[];
    } catch {}

    try {
      sections = JSON.parse(
        getStringField(formData.get("sections")) || "[]"
      ) as unknown[];
    } catch {}

    try {
      valueHighlights = JSON.parse(
        getStringField(formData.get("valueHighlights")) || "[]"
      ) as unknown[];
    } catch {}

    const logoFile = formData.get("logoFile");
    let logoPath = "";
    if (logoFile && logoFile instanceof File) {
      logoPath = await saveFile(logoFile);
    }

    const galleryPaths: string[] = [];
    const galleryFiles = formData.getAll("galleryFiles");
    for (const file of galleryFiles) {
      if (file instanceof File) {
        const savedPath = await saveFile(file);
        galleryPaths.push(savedPath);
      }
    }

    const newCampaign = new Campaign({
      ownerId, // ✅ Include in schema
      title,
      description,
      fundingTarget,
      equityOffered,
      preMoneyValuation,
      sharePrice,
      additionalInvestment,
      website,
      companiesHouseLink,
      linkedinLink,
      instagramLink,
      facebookLink,
      deadline,
      logoUrl: logoPath,
      galleryImages: galleryPaths,
      categories,
      sections,
      valueHighlights,
      status: "active",
    });

    await newCampaign.save();

    return NextResponse.json({
      success: true,
      message: "Campaign created successfully.",
      campaign: newCampaign,
    });
  } catch (error) {
    console.error("Error creating campaign:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create campaign" },
      { status: 500 }
    );
  }
}
