import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';
import { connectToDB } from '@/lib/mongodb';
import Campaign from '@/lib/models/Campaign';

// Disable Next.js default body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

// Upload directory
const UPLOAD_DIR = path.join(process.cwd(), 'public/uploads');

async function saveFile(file: File): Promise<string> {
  // file is a web File object from formData
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const fileName = `${Date.now()}_${file.name}`;
  const filePath = path.join(UPLOAD_DIR, fileName);
  await fs.mkdir(UPLOAD_DIR, { recursive: true });
  await fs.writeFile(filePath, buffer);
  return `/uploads/${fileName}`;
}

// Helper to parse string fields safely
function getStringField(field: FormDataEntryValue | null): string {
  if (!field) return '';
  if (typeof field === 'string') return field;
  return ''; // file, not string
}

export async function POST(req: Request) {
  try {
    await connectToDB();

    const formData = await req.formData();

    // Extract text fields
    const title = getStringField(formData.get('title'));
    const description = getStringField(formData.get('description'));
    const fundingTarget = getStringField(formData.get('fundingTarget'));
    const equityOffered = getStringField(formData.get('equityOffered'));
    const preMoneyValuation = getStringField(formData.get('preMoneyValuation'));
    const sharePrice = getStringField(formData.get('sharePrice'));
    const additionalInvestment = getStringField(formData.get('additionalInvestment'));
    const website = getStringField(formData.get('website'));
    const companiesHouseLink = getStringField(formData.get('companiesHouseLink'));
    const linkedinLink = getStringField(formData.get('linkedinLink'));
    const instagramLink = getStringField(formData.get('instagramLink'));
    const facebookLink = getStringField(formData.get('facebookLink'));
    const deadline = getStringField(formData.get('deadline'));

    // Required fields validation
    if (!title || !description || !fundingTarget) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Parse JSON fields safely
    let categories: any[] = [];
    let sections: any[] = [];
    let valueHighlights: any[] = [];

    try {
      categories = JSON.parse(getStringField(formData.get('categories')) || '[]');
    } catch {}

    try {
      sections = JSON.parse(getStringField(formData.get('sections')) || '[]');
    } catch {}

    try {
      valueHighlights = JSON.parse(getStringField(formData.get('valueHighlights')) || '[]');
    } catch {}

    // Handle logoFile (single file)
    const logoFile = formData.get('logoFile');
    let logoPath = '';
    if (logoFile && logoFile instanceof File) {
      logoPath = await saveFile(logoFile);
    }

    // Handle galleryFiles (multiple files)
    const galleryPaths: string[] = [];
    // formData.getAll returns all values for a given key
    const galleryFiles = formData.getAll('galleryFiles');
    for (const file of galleryFiles) {
      if (file instanceof File) {
        const savedPath = await saveFile(file);
        galleryPaths.push(savedPath);
      }
    }

    // Create new campaign document
    const newCampaign = new Campaign({
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
      status: 'active',
    });

    await newCampaign.save();

    return NextResponse.json({
      success: true,
      message: 'Campaign created successfully.',
      campaign: newCampaign,
    });
  } catch (error) {
    console.error('Error creating campaign:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create campaign' },
      { status: 500 }
    );
  }
}
