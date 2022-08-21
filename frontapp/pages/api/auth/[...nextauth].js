import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import axios from "axios";

const getTokenByApi = async (user) => {
  const { name, email } = user;

  try {
    const response = await axios.post(process.env.API_URL, {
      query: `mutation {
          createUser(data: {name: "${name}", email: "${email}"}) {
            id
            name
            email
            access_token
          }
        }`,
    });

    const { data } = response.data;

    const { createUser } = data;

    const { access_token } = createUser;

    return access_token;
  } catch {}
};

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "login",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ account, user }) {
      account.access_token = await getTokenByApi(user);

      return true;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (account) {
        token.accessToken = account.access_token;
      }

      return token;
    },
    async session({ session, token, user }) {
      session.accessToken = token.accessToken;

      return session;
    },
  },
  secret: process.env.JWT_SECRET,
});
