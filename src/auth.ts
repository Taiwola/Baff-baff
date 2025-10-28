import NextAuth from 'next-auth'
import dbConnect from '@lib/database'
import { getUserByEmail } from '@services/user'
// import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from 'next-auth/providers/credentials'
import { baseConfig } from '@lib/auth-config'



export const { handlers, signIn, signOut, auth } = NextAuth({
  ...baseConfig,
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
    })
    // Google({
    //   redirectProxyUrl: ''
    // })
  ]
})
