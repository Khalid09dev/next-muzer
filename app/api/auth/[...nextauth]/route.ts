import { prismaClient } from "@/app/lib/db";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    // I want to use google
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ""
        })
    ],

    secret: process.env.NEXTAUTH_SECRET ?? "",

    callbacks: {
        async signIn(params) {
            console.log("Sign in", params);
            if(!params.user.email) {
                return false;
            }

            try {
                await prismaClient.user.create({
                    data: {
                        email: params.user.email ?? "",
                        provider: "Google",
                    }
                })
            } catch (error) {
                
            }
            return true;
        }
    }
})

export { handler as GET, handler as POST};