import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'

import { baseConfig } from '@lib/auth-config'
import { ServerApiClient } from '@utils/api-server'

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...baseConfig,
  providers: [
    CredentialsProvider({
      credentials: {
        email: { type: 'email', label: 'Email', placeholder: 'johndoe@gmail.com' },
        password: { type: 'password', label: 'Password', placeholder: '*****' }
      },
      authorize: async (credentials) => {
        const response = await ServerApiClient.post<LoginResponseType>('/auth/login/credentials', credentials)

        if (response.code >= 400) {
          throw new Error(response.message)
        }

        return response.data
      }
    }),
    GoogleProvider
  ]
})
