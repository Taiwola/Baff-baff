import { Footer, Header } from '@components/layouts'
import { FeaturedProducts } from '@components/features/products'
import { HomeHero, Explore, Story, Catalog, PaymentInfo, FeaturedImages, Discount } from './_components'

export default function Home() {
  return (
    <>
      <Header />

      <main className='app-container h-full w-full mt-6 md:mt-12'>
        <HomeHero />
        <Explore />
        <FeaturedProducts />
        <Story />
        <Catalog />
        <PaymentInfo />
        <FeaturedImages />
        <Discount />
      </main>

      <Footer />
    </>
  )
}