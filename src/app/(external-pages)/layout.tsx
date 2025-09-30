import { verifySession } from '@lib/dal'
import { getUser } from '@actions/users.action'
import { Footer, Header } from '@components/layouts'

type Props = Readonly<{
  children: React.ReactNode
}>

export default async function ExternalPagesLayout({ children }: Props) {
  await new Promise((resolve) => setTimeout(resolve, 6000))
  const session = await verifySession()
  const user = await getUser(session?.userId || '')

  return (
    <>
      <Header user={user} />
      {children}
      <Footer />
    </>
  )
}
