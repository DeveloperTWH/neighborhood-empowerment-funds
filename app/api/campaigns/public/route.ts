import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongodb';
import Campaign from '@/lib/models/Campaign';
import type { InferSchemaType, Types } from 'mongoose';

// Define the full schema type
type CampaignSchema = InferSchemaType<typeof Campaign.schema> & { _id: Types.ObjectId };

export async function GET() {
  try {
    await connectToDB();

    const campaigns: CampaignSchema[] = await Campaign.find().sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      campaigns: campaigns.map((c) => ({
        id: c._id.toString(),
        title: c.title,
        description: c.description,
        platform: c.platform,
        fundingTarget: c.fundingTarget,
        logoUrl: c.logoUrl,
        ownerId: c.ownerId,
      })),
    });
  } catch (error) {
    console.error('[GET /api/campaigns/public]', error);
    return NextResponse.json(
      { success: false, message: 'Failed to load public campaigns' },
      { status: 500 }
    );
  }
}
