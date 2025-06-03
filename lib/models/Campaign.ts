import mongoose from "mongoose";

const campaignSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    logoUrl: {
        type: String,
        required: true,
    },
    galleryImages: {
        type: [String],
        default: [],
    },

    amountRaised: {
        type: Number,
        required: true,
        default: 0,
    },
    investorCount: {
        type: Number,
        required: true,
        default: 0,
    },
    fundingTarget: {
        type: Number,
        required: true,
    },
    equityOffered: {
        type: Number,
        required: true,
    },
    preMoneyValuation: {
        type: Number,
        required: true,
    },
    sharePrice: {
        type: Number,
        required: true,
    },
    additionalInvestment: {
        type: Number,
        default: 0,
    },

    website: {
        type: String,
        trim: true,
        sparse: true,
    },
    companiesHouseLink: {
        type: String,
        trim: true,
        sparse: true,
    },
    linkedinLink: {
        type: String,
        trim: true,
        sparse: true,
    },
    instagramLink: {
        type: String,
        trim: true,
        sparse: true,
    },
    facebookLink: {
        type: String,
        trim: true,
        sparse: true,
    },

    valueHighlights: {
        type: [String],
        default: [],
    },

    sections: [
        {
            title: {
                type: String,
                required: true,
            },
            description: {
                type: String,
                required: true,
            },
        },
    ],

    status: {
        type: String,
        enum: ['active', 'completed', 'canceled', 'paused'],
        default: 'active',
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    deadline: {
        type: Date,
        required: true,
    },
    categories: {
        type: [String],
        default: [],
    },

    lastInvestmentTime: {
        type: Date,
        default: null, // explicitly no investment time at creation
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

const Campaign = mongoose.models.Campaign || mongoose.model('Campaign', campaignSchema);

export default Campaign;
