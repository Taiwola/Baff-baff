import { Footer, Header } from '@components/layouts'

type Props = Readonly<{
  children: React.ReactNode
}>

export default function ExternalPagesLayout({ children }: Props) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}
