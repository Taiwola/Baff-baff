import Discount from "@/app/(nondashboardpage)/component/discount"
import Explore from "@/app/(nondashboardpage)/component/explore"
import Featured from "@/app/(nondashboardpage)/component/featured"
import FeaturedImages from "@/app/(nondashboardpage)/component/featureImages"
import Hero from "@/app/(nondashboardpage)/component/hero"
import PaymentInfo from "@/app/(nondashboardpage)/component/paymentInfo"
import ShopCatalog from "@/app/(nondashboardpage)/component/shopCatalog"
import Story from "@/app/(nondashboardpage)/component/story"

export default function Home() {
  return (
    <div className="w-full bg-foreground">
      <Hero />
      <Explore />
      <Featured />
      <Story />
      <ShopCatalog />
      <PaymentInfo />
      <FeaturedImages />
      <Discount />
    </div>
  )
}
