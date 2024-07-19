// pages/api/auth/[...nextauth].js
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { callStoredProcedure } from "../db";
import bcrypt from "bcryptjs";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "jsmith@example.com",
        },
        password: { label: "Password", type: "password" },
        remember: { label: "Remember me", type: "checkbox" },
      },
      async authorize(credentials, req) {
        try {
          const result = await callStoredProcedure("sp_GetUserByEmail", {
            Email: credentials.email,
          });

          if (result.status !== 1) {
            throw new Error(result.message);
          }

          const user = result.data[0];

          if (!user) {
            return null; // No user found
          }

          // Check password
          const isValid = await bcrypt.compare(
            credentials.password,
            user.PasswordHash
          );

          if (!isValid) {
            return null; // Incorrect password
          }

          // Return the user object
          return {
            id: user.UserID,
            email: user.Email,
            role: user.Role,
          };
        } catch (error) {
          console.error("Error during authorization:", error);
          throw new Error("An error occurred during authentication.");
        }
      },
    }),
  ],
  // Add session callback to include user role in the session
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET, // Add this line for security
  pages: {
    signIn: "/auth/login", // Redirect to your custom login page
  },
});
