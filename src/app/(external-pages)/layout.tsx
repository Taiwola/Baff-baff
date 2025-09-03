// import HeroUiProvider from "../../providers/herouiProvider"
// import Footer from "./component/footer"

export default function NonDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
        {/* <Header /> */}
      {children}
      {/* <Footer /> */}
    </>
  )
}
