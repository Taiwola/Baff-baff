import NextAuth from 'next-auth'
import dbConnect from '@lib/database'
import { getUserByEmail } from '@services/user'
import { SESSION_TOKEN_NAME } from '@lib/constants'
import CredentialsProvider from 'next-auth/providers/credentials'
import Google from "next-auth/providers/google"

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      credentials: {
        email: { type: 'email', label: 'Email', placeholder: 'johndoe@gmail.com' },
        password: { type: 'password', label: 'Password', placeholder: '*****' }
      },
      authorize: async (credentials) => {
        await dbConnect()

        if (!credentials) throw new Error('Invalid credentieals')

        const user = await getUserByEmail(String(credentials.email))
        if (!user) throw new Error('Invalid Credentials')

        const isValid = await user.comparePassword(String(credentials.password))
        if (!isValid) throw new Error('Invalid Credentials')

        return { id: user.id, email: user.email, role: user.role, name: `${user.firstName} ${user.lastName}` }
      }
    }),
    // Google({
    //   redirectProxyUrl: ''
    // })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60 // 30 days
  },
  pages: {
    signIn: '/login'
  },
  cookies: {
    sessionToken: {
      name: SESSION_TOKEN_NAME,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production'
      }
    }
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub || ''
        session.user.role = token.role as UserRole
      }
      return session
    }
  }
  //   basePath: '/api/v1/auth'
})
