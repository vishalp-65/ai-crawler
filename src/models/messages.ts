import mongoose, { Schema, Document, Model } from "mongoose";

export interface IMessageData extends Document {
    crawlDataId: String;
    message: string;
    creator: "user" | "model";
    createdAt: Date;
}

const MessageSchema: Schema = new Schema(
    {
        crawlDataId: {
            type: Schema.Types.ObjectId,
            ref: "crawlData",
        },
        message: {
            type: String,
        },
        role: {
            type: String,
            default: "user",
            required: true,
        },
    },
    { timestamps: true }
);

const MessagesModel: Model<IMessageData> =
    mongoose.models.messages ||
    mongoose.model<IMessageData>("messages", MessageSchema);

export default MessagesModel;
