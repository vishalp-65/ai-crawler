import mongoose, { Schema, Document } from "mongoose";

interface ICrawledData extends Document {
    url: string;
    text: string;
    images: string[];
    links: string[];
}

const CrawledDataSchema: Schema = new Schema({
    url: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    images: [{ type: String }],
    links: [{ type: String }],
});

export const CrawledData = mongoose.model<ICrawledData>(
    "CrawledData",
    CrawledDataSchema
);
