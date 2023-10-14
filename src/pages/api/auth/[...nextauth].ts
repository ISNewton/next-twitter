import nextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import client from "@/libs/client";
import axios, { AxiosError } from 'axios'

export default nextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // console.log(credentials)
        // Add logic here to look up the user from the credentials supplied
        let response
        try {
          response = await axios.post("auth/login", {
            username:credentials?.username,
            password:credentials?.password,
          });
        }
        catch(e) {

          console.log('error' , e.response)
          throw new AxiosError(e.response.data.message , e.response.data.statusCode)
        }

        const user = response.data;

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token;
      return session;
    },
  },
  pages: {
    signIn: 'auth'
  }
});
