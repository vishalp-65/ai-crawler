import mongoose, { Schema, Document, Model } from "mongoose";
import { IMessageData } from "./messages";

interface IConversation extends Document {
    messages: [IMessageData];
}

const ConversationSchema: Schema = new Schema(
    {
        messages: [
            {
                type: Schema.Types.ObjectId,
                ref: "messages",
            },
        ],
        url: {
            type: String,
        },
    },
    { timestamps: true }
);

const ConversationModel: Model<IConversation> =
    mongoose.models.conversations ||
    mongoose.model<IConversation>("conversations", ConversationSchema);

export default ConversationModel;
