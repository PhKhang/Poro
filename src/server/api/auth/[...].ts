import { NuxtAuthHandler } from '#auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { UserModel } from '~/server/models/user';
// import { PrismaAdapter } from '@next-auth/prisma-adapter';
// import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt'

// const prisma = new PrismaClient()

async function getMe(session: any) {
  return await $fetch('/api/me', {
    method: 'POST',
    query: {
      API_ROUTE_SECRET: useRuntimeConfig().API_ROUTE_SECRET,
    },
    body: {
      email: session?.user?.email,
    },
  })
}

export default NuxtAuthHandler({
  pages: {
    signIn: '/login',
  },

  secret: useRuntimeConfig().authSecret,
  
  // adapter: PrismaAdapter(prisma),

  providers: [
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    // GithubProvider.default({
    //    clientId: 'enter-your-client-id-here',
    //    clientSecret: 'enter-your-client-secret-here'
    // })
    GoogleProvider.default({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    CredentialsProvider.default({
      name: 'credentials',
      credentials: {},
      async authorize(credentials: { email: string, password: string }) {
        console.log("Trying to sign in")
        const user = await UserModel.findOne({ email: credentials.email });
        console.log(user)

        if (!user) {
          console.log("No user");
          throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
        }

        const isValidPassword = await bcrypt.compare(credentials.password, user?.password);

        if (!isValidPassword) {
          console.log("Wrong password");
          throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
        }

        return { ...user.toObject(), password: 'censored', role: 'user' };
      }
    })
  ],

  // session: {
  //   strategy: 'jwt'
  // },

  callbacks: {
    // async jwt({ token, user, account }) {
    //   if (user) {
    //     token = {
    //       ...token,
    //       ...user
    //     }
    //   }

    //   return token;
    // },

    async session({ session, token }) {
      // console.log('Token:', token)
      session.user = {
        ...token,
        ...session.user
      }
      
      const user = await UserModel.findOne({ email: session.user.email });
      
      // const new_session = session
      // new_session.role = new_session?.role

      return {...session, id: user?.id};
    }
    
    // session: async ({ session, token }) => {
    //   const me = await getMe(session)

    //   ;(session as any).subscribed = me?.subscribed
    //   return Promise.resolve(session)
    // }
  },

})