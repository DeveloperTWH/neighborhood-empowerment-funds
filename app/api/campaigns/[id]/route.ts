import { connectToDB } from '@/lib/mongodb';
import Campaign from '@/lib/models/Campaign';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    await connectToDB();

    // ✅ Extract campaign ID directly from URL
    const url = new URL(req.url);
    const pathnameParts = url.pathname.split('/');
    const id = pathnameParts[pathnameParts.length - 1];

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Missing campaign ID' },
        { status: 400 }
      );
    }

    const campaign = await Campaign.findById(id);

    if (!campaign) {
      return NextResponse.json(
        { success: false, message: 'Campaign not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      campaign: {
        id: campaign._id.toString(),
        title: campaign.title,
        description: campaign.description,
        platform: campaign.platform,
        fundingTarget: campaign.fundingTarget,
        logoUrl: campaign.logoUrl,
        ownerId: campaign.ownerId,
        createdAt: campaign.createdAt,
        gallery: campaign.galleryImages || [],
        equityOffered: campaign.equityOffered,
        preMoneyValuation: campaign.preMoneyValuation,
        sharePrice: campaign.sharePrice,
        additionalInvestment: campaign.additionalInvestment,
        website: campaign.website,
        companiesHouseLink: campaign.companiesHouseLink,
        linkedinLink: campaign.linkedinLink,
        instagramLink: campaign.instagramLink,
        facebookLink: campaign.facebookLink,
        deadline: campaign.deadline,
        categories: campaign.categories,
        sections: campaign.sections,
        valueHighlights: campaign.valueHighlights,
        status: campaign.status,
      },
    });
  } catch (error) {
    console.error('[GET /api/campaigns/[id]]', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch campaign' },
      { status: 500 }
    );
  }
}
