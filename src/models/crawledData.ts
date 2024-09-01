import mongoose, { Schema, Document, Model } from "mongoose";

interface ICrawlData extends Document {
    text: string;
    images: string[];
    links: string[];
    createdAt: Date;
}

const CrawledDataSchema: Schema = new Schema(
    {
        text: {
            type: String,
            required: true,
        },
        images: [{ type: String }],
        links: [{ type: String }],
    },
    { timestamps: true }
);

const CrawlModel: Model<ICrawlData> =
    mongoose.models.crawlData ||
    mongoose.model<ICrawlData>("crawlData", CrawledDataSchema);

export default CrawlModel;
