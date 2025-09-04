import { Header } from '@components/layouts/Header'
import { Explore, HomeHero } from '@components/layouts'

export default function Home() {
  return (
    <>
      <Header />

      <main className='app-container h-full w-full mt-6 md:mt-12'>
        <HomeHero />
        <Explore />
      </main>

      {/* 
      <Featured />
      <Story />
      <ShopCatalog />
      <PaymentInfo />
      <FeaturedImages />
      <Discount /> */}
    </>
  )
}