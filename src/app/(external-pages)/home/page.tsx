import { HomeHero } from '@components/layouts'
import { Header } from '@components/layouts/Header'

export default function Home() {
  return (
    <>
      <Header />

      <main className='app-container w-full mt-6 md:mt-12'>
        <HomeHero />
      </main>

      {/* 
      <Explore />
      <Featured />
      <Story />
      <ShopCatalog />
      <PaymentInfo />
      <FeaturedImages />
      <Discount /> */}
    </>
  )
}
