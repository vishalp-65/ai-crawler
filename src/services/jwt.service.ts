import { IUser } from "@/models/users";
import { JWTUser, User } from "@/types";
import JWT from "jsonwebtoken";

const JWT_SECRET = process.env.NEXT_API_JWT_SECRET as string;

class JWTService {
    public static generateTokenForUser(user: IUser) {
        const payload: JWTUser = {
            id: user?.id,
            email: user?.email,
        };
        const token = JWT.sign(payload, JWT_SECRET);
        return token;
    }

    public static decodeToken(token: string) {
        try {
            return JWT.verify(token, JWT_SECRET) as JWTUser;
        } catch (error) {
            return null;
        }
    }
}

export default JWTService;
