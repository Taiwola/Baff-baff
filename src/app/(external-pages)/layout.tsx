import { verifySession } from '@lib/dal'
import { Footer, Header } from '@components/layouts'

type Props = Readonly<{
  children: React.ReactNode
}>

export default async function ExternalPagesLayout({ children }: Props) {
  const session = await verifySession()

  return (
    <>
      <Header session={session} />
      {children}
      <Footer />
    </>
  )
}
