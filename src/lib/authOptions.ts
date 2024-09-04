// import NextAuth from "next-auth"
import { db } from "@/lib/db";
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
              name: { label: "name", type: "text" },
              email: {
                label: "Email",
                type: "text",
                placeholder: "John@gmail.com",
              },
              password: { label: "Password", type: "password" },
            },
            async authorize(credentials: any) {
              const hashedPassword = await bcrypt.hash(credentials.password, 10);
              const existingUser = await db.user.findFirst({
                where: {
                  email: credentials.email,
                },
              });
      
              if (existingUser?.password) {
                const passwordValidation = await bcrypt.compare(
                  credentials.password,
                  existingUser.password
                );
                if (passwordValidation) {
                  return {
                    id: existingUser.id.toString(),
                    name: existingUser.name,
                    email: existingUser.email,
                  };
                }
                return null;
              }
      
              try {
                const user = await db.user.create({
                  data: {
                    name: credentials.name,
                    email: credentials.email,
                    password: hashedPassword,
                    avatarUrl:"",
                  },
                });
      
                return user;
              } catch (e) {
                console.error(e);
              }
      
              return null;
            },
          }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
    ],
    secret: process.env.JWT_SECRET || "secret",
    callbacks: {
      async session({ token, session }: any) {
        if(token){
          session.user.id = token.id;
          session.user.role = token.role;
          session.user.email = token.email;
          session.user.name = token.name;

        }
        console.log(session)
        return session;
      },
      async jwt({token,user} : any ) {
        if(user){
          token.id = user.id?.toString();
          token.name = user?.name;
          token.role = user?.role;
          token.email = user?.email
        }
        console.log(token)
        return token
      }
    },
    pages:{
        signIn :"/sign-in",
    },
    session: {
        strategy: 'jwt'
    },
    // pages: {
    //     signIn: "/sign-in"
    // },

    // callbacks: {
    //     async signIn({ account, profile }: { account: any, profile: any }) {
    //         if (!profile?.email) {
    //             throw new Error("no Profile")
    //         }
            
    //         // await db.user.upsert({
    //         //     where: { email: profile.email },
    //         //     create: {
    //         //         email: profile.email,
    //         //         name: profile.name,
    //         //         avatarUrl: profile.avatarUrl,
    //         //     },
    //         //     update: {
    //         //         name: profile.name
    //         //     }
    //         // })

    //         return redirect('/site')
    //     },
    //     // async redirect({ url, baseUrl }) {
    //     //     if (url.startsWith("/")) return `${baseUrl}${url}`
    //     //    // Allows callback URLs on the same origin
    //     //     else if (new URL(url).origin === baseUrl) return url
    //     //     return baseUrl
    //     // }
    // }
}

export default authOptions;