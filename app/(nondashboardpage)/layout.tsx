import HeroUiProvider from "../provider/herouiProvider"
import Footer from "./component/footer"
import Header from "./component/header"

export default function NonDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <HeroUiProvider>
        <Header />
        {children}
        <Footer />
      </HeroUiProvider>
    </>
  )
}
