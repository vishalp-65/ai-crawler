export interface InputData {
    url: string;
    content: string;
}

export interface GoogleTokenResult {
    iss?: string;
    nbf?: string;
    aud?: string;
    sub?: string;
    email: string;
    email_verified: string;
    azp?: string;
    name?: string;
    picture?: string;
    given_name: string;
    family_name?: string;
    iat?: string;
    exp?: string;
    jti?: string;
    alg?: string;
    kid?: string;
    typ?: string;
}

export interface createUserData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    profileImageURL?: string;
}

export interface JWTUser {
    id: string;
    email: string;
}

export type User = {
    id: string;
    name: string;
    email: string;
    profileImageURL: string | null;
    password: string | null;
    createdAt: Date;
    updatedAt: Date;
};
