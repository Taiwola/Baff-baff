import 'server-only'

import { NextAuthConfig } from 'next-auth'
import { ServerApiClient } from '@utils/api-server'

export const SESSION_TOKEN_NAME = 'baffabaffa-sesion-token'

export const baseConfig: NextAuthConfig = {
  providers: [],
  secret: process.env.NEXTAUTH_SECRET,
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
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google') {
        const payload = {
          email: user.email,
          firstName: profile?.given_name || '',
          lastName: profile?.family_name || '',
          providerId: profile?.id || ''
        }
        const response = await ServerApiClient.post<LoginResponseType>('/auth/login/google', payload)

        if (!response || response.code >= 400) return false

        user.id = response.data.id
        user.role = response.data.role
        return true
      }

      return false
    },

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
}
