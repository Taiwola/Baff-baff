import { Footer, Header } from '@components/layouts'

type Props = Readonly<{
  children: React.ReactNode
}>

export default async function ExternalPagesLayout({ children }: Props) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}
