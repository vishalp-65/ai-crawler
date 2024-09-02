import UserModel, { IUser } from "@/models/users";
import { GoogleTokenResult } from "@/types";
import axios from "axios";
import JWTService from "./jwt.service";
import { ApiError } from "@/utils";
import httpStatus from "http-status";

class UserService {
    public static async verifyToken(googleToken: string) {
        console.log("service");
        const googleOauthURL = new URL(
            "https://oauth2.googleapis.com/tokeninfo"
        );
        googleOauthURL.searchParams.set("id_token", googleToken);

        const { data } = await axios.get<GoogleTokenResult>(
            googleOauthURL.toString(),
            {
                responseType: "json",
            }
        );

        console.log("data by google", data);

        const user = await UserModel.findOne({
            email: data.email,
        });

        if (!user) {
            await UserModel.create({
                email: data.email,
                name: data.given_name + " " + data.family_name,
                profileImageURL: data.picture,
            });
        }

        const userInDb = await UserModel.findOne({
            email: data.email,
        });

        if (!userInDb) throw new Error("User with email not found");

        const userToken = JWTService.generateTokenForUser(userInDb as IUser);

        return userToken;
    }

    public static async getUser(email: string) {
        if (!email) {
            throw new ApiError(httpStatus.UNAUTHORIZED, "Email required");
        }

        const user = await UserModel.findOne({ email });

        return user;
    }
}

export default UserService;
