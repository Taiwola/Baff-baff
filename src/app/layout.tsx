import type { Metadata } from "next"
import { Poppins, Montserrat, Roboto, Lexend_Deca } from "next/font/google"
import HeroUiProvider from "../providers/herouiProvider"
import ToastProvider from "@providers/ToastProvider"

import "@styles/globals.css"
import { auth } from "@auth"
import { CartProvider } from "@contexts/carts.context"
import { SessionProvider } from "next-auth/react"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
})

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-montserrat",
})

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
})

const lexendDeca = Lexend_Deca({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-lexend-deca",
});

export const metadata: Metadata = {
  title: {
    default: "Baffa Baffa | Premium Made-in-Nigeria Clothing",
    template: "%s | Baffa Baffa"
  },
  description: "Baffa Baffa offers stylish, high-quality men\'s clothing crafted in Nigeria. Shop smart, dress sharp — built for quality, value and modern style.",
  keywords: [
    "Baffa Baffa",
    "made in Nigeria clothing",
    "men\'s fashion Nigeria",
    "premium men\'s shirts Lagos",
    "affordable quality apparel Africa",
    "African fashion brand"
  ],
  authors: [{ name: "Tobi Olanitori", url: "https://intuneteq.com" }, { name: "Seun Olanitori", url: "https://github.com/Taiwola" }],
  creator: "Baffa Baffa",
  publisher: "Baffa Baffa",
  metadataBase: new URL("https://baffabaffa.com"),
  openGraph: {
    title: "Baffa Baffa | Premium Men\'s Clothing from Nigeria",
    description: "Discover smart, modern clothing for men — designed in Nigeria, worn with confidence. Shop Baffa Baffa today.",
    url: "https://baffabaffa.com",
    siteName: "Baffa Baffa",
    images: [
      {
        url: "https://baffabaffa.com/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Baffa Baffa men\'s fashion collection"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Baffa Baffa | Premium Men\'s Clothing from Nigeria",
    description: "Explore our latest collection of stylish men'\s shirts and attire — quality meets affordability with Baffa Baffa.",
    images: ["https://baffabaffa.com/images/og-image.png"],
    creator: "@baffabaffaofficial"
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png"
  }
}

type Props = Readonly<{
  children: React.ReactNode
}>


export default async function RootLayout({ children }: Props) {
  const session = await auth()

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        suppressHydrationWarning
        className={`${poppins.variable} ${montserrat.variable} ${roboto.variable} ${lexendDeca.variable} min:h-screen w-full`}
      >
        <SessionProvider session={session}>
          <ToastProvider>
            <HeroUiProvider>
              <CartProvider>
                {children}
              </CartProvider>
            </HeroUiProvider>
          </ToastProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
