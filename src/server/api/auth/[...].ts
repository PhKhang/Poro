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
    // GithubProvider.default({
    //    clientId: 'enter-your-client-id-here',
    //    clientSecret: 'enter-your-client-secret-here'
    // })
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    GoogleProvider.default({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    CredentialsProvider.default({
      name: 'credentials',
      credentials: {},
      async authorize(credentials: { email: string, password: string }) {
        console.log("Trying to sign in")
        const user = await UserModel.findOne({ email: credentials.email });
        // console.log(user)

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

  session: {
    strategy: 'jwt'
  },

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      let new_user
      if (account?.provider === 'google') {
        if (!(await UserModel.exists({ email: user.email }))) {
          new_user = UserModel.create({
            id: user.id,
            email: user.email, 
            image: user.image, 
            name: user.name
          })
          console.log('Create new user:', await new_user)
        }
        else {
          console.log('Google account already exists')
          const old_user = await UserModel.findOne({ email: user.email });
          user.name = old_user?.name
          user.image = old_user?.image
          user.role = old_user?.role
        }
      }
      else if (credentials == null) {
        console.log('Sign in with wrong password')
        return false
      }
      
      // console.log('New user:', user)
      console.log('User on signin:', user)
      if (user.role == 'Admin' || user.role == 'admin') {
        return true
      }

      return true
    },

    async jwt({ token, user, account }) {
      console.log('In Token:', token)
      console.log('In User:', user)

      if (user) {
        // console.log('Update id', acc)
        token = {
          ...token,
          ...user,
        }
      }
      
      // const acc = await UserModel.findOne({ email: token.email });
      // console.log('JWT update', acc)
      // else {
      //   const acc = await UserModel.findOne({ email: token.email });
      //   token = {...token, id: acc?.id}
      //   console.log('Update id', acc)
      // }

      return token;
    },

    // async session({ session, token }) {
    //   console.log('Session update')
    //   session.user = {
    //     ...token,
    //     ...session.user
    //   }

    //   const user = await UserModel.findOne({ email: session.user.email });
    //   // await new Promise(resolve => setTimeout(resolve, 1000));

    //   // const new_session = session
    //   // new_session.role = new_session?.role
    //   // const time = new Date();
    //   token.name = user?.name

    //   return {...session};
    // }

    // session: async ({ session, token }) => {
    //   const me = await getMe(session)

    //   ;(session as any).subscribed = me?.subscribed
    //   return Promise.resolve(session)
    // }
  },

})