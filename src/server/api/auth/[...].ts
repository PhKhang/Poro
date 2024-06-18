import { NuxtAuthHandler } from '#auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { UserModel } from '~/server/models/user';
import bcrypt from 'bcrypt'

export default NuxtAuthHandler({
  pages: {
    signIn: '/login',
  },

  secret: useRuntimeConfig().authSecret,

  providers: [
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    // GithubProvider.default({
    //    clientId: 'enter-your-client-id-here',
    //    clientSecret: 'enter-your-client-secret-here'
    // })
    CredentialsProvider.default({
      name: 'credentials',
      credentials: {},
      async authorize(credentials: { email: string, password: string }) {
        console.log("Trying to sign in")
        const user = await UserModel.findOne({ email: credentials.email });

        if (!user) {
          console.log("No user");
          throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
        }

        const isValidPassword = await bcrypt.compare(credentials.password, user?.password);

        if (!isValidPassword) {
          console.log("Wrong password");
          throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
        }

        return { ...user.toObject(), password: undefined };
      }
    })
  ],

  session: {
    strategy: 'jwt'
  },

  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token = {
          ...token,
          ...user
        }
      }

      return token;
    },

    async session({ session, token }) {
      session.user = {
        ...token,
        ...session.user
      }

      return session;
    }
  },

})