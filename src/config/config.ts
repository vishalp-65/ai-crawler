import dotenv from "dotenv";
import path from "path";
import Joi from "joi";

dotenv.config({ path: path.join(__dirname, "../../.env") });

const envVarsSchema = Joi.object()
    .keys({
        NEXT_API_NODE_ENV: Joi.string()
            .valid("production", "development", "test")
            .required(),
        NEXT_API_PORT: Joi.number().default(3000),
        NEXT_API_MONGODB_URL: Joi.string()
            .required()
            .description("Mongo DB url"),
        NEXT_API_JWT_SECRET: Joi.string()
            .required()
            .description("JWT secret key"),
        NEXT_API_JWT_ACCESS_EXPIRATION_MINUTES: Joi.number()
            .default(30)
            .description("minutes after which access tokens expire"),
        NEXT_API_JWT_REFRESH_EXPIRATION_DAYS: Joi.number()
            .default(30)
            .description("days after which refresh tokens expire"),
    })
    .unknown();

const { value: envVars, error } = envVarsSchema
    .prefs({ errors: { label: "key" } })
    .validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

export default {
    env: envVars.NEXT_API_NODE_ENV,
    port: envVars.NEXT_API_PORT,
    // Set mongoose configuration
    mongoose: {
        url:
            envVars.NEXT_API_MONGODB_URL +
            (envVars.NEXT_API_NODE_ENV === "test" ? "-test" : ""),
        options: {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
    },
    jwt: {
        secret: envVars.NEXT_API_JWT_SECRET,
        accessExpirationMinutes: envVars.NEXT_API_JWT_ACCESS_EXPIRATION_MINUTES,
        refreshExpirationDays: envVars.NEXT_API_JWT_REFRESH_EXPIRATION_DAYS,
    },
};
