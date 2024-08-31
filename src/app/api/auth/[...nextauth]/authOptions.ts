// import NextAuth from "next-auth"
import { db } from "@/lib/db";
import GoogleProvider from "next-auth/providers/google"
import { redirect } from "next/navigation";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
    ],
    secret: process.env.JWT_SECRET || "",
    session: {
        strategy: 'jwt'
    },
    pages: {
        signIn: "/sign-in"
    },
    callbacks: {
        async signIn({ account, profile }) {
            if (!profile?.email) {
                throw new Error("no Profile")
            }
            
            // await db.user.upsert({
            //     where: { email: profile.email },
            //     create: {
            //         email: profile.email,
            //         name: profile.name,
            //         avatarUrl: profile.avatarUrl,
            //     },
            //     update: {
            //         name: profile.name
            //     }
            // })

            return redirect('/site')
        },
        // async redirect({ url, baseUrl }) {
        //     if (url.startsWith("/")) return `${baseUrl}${url}`
        //    // Allows callback URLs on the same origin
        //     else if (new URL(url).origin === baseUrl) return url
        //     return baseUrl
        // }
    }
}

export default authOptions;