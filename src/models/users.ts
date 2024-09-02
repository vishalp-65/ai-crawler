import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    profileImageURL: string;
    conversationId: [string];
    age: number;
}

const UserSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        profileImageURL: {
            type: String,
        },
        conversationId: [
            {
                type: Schema.Types.ObjectId,
                ref: "conversations",
            },
        ],
        age: {
            type: Number,
        },
    },
    { timestamps: true }
);

const UserModel: Model<IUser> =
    mongoose.models.users || mongoose.model<IUser>("users", UserSchema);

export default UserModel;
