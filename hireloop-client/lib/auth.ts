import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { admin } from "better-auth/plugins"

const client = new MongoClient(process.env.MONGODB_URL as string);
const db = client.db("hireloopDB");

export const auth = betterAuth({
    emailAndPassword: {
        enabled: true,
        autoSignIn: false,
        minPasswordLength: 6,
        maxPasswordLength: 18,
    },
    user: {
        additionalFields: {
            role: {
                type: ["seeker", "recruiter", "admin"],
                input: true,
                defaultValue: "seeker",
                required: true,
            }
        }
    },
    plugins: [
        admin()
    ],
    database: mongodbAdapter(db, {
        client,
    }),
});
