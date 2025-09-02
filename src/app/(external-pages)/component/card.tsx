import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Image,
  Button,
} from "@heroui/react"

export default function App() {
  return (
    <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3">
        <Image
          alt="heroui logo"
          height={40}
          radius="sm"
          src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
          width={40}
        />
        <div className="flex flex-col">
          <p className="text-md">HeroUI</p>
          <p className="text-small text-default-500">heroui.com</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <div>
          <h2 className="font-montserrat font-semibold text-[11px] uppercase">
            wavy boy shirt
          </h2>
        </div>
        <div className="flex gap-2">
          <h3 className="font-montserrat font-normal text-[10px]">N70,000</h3>
          <h3 className="font-montserrat font-normal text-[9px]">(in Stock)</h3>
        </div>
      </CardBody>
      <Divider />
      <CardFooter>
        <Button
          variant="bordered"
          className="uppercase max-w-full w-full md:w-auto border-1 border-[#20202099] opacity-60 rounded-none"
        >
          <span className="font-montserrat font-semibold text-xs text-[#202020]">
            add to bag
          </span>
        </Button>
      </CardFooter>
    </Card>
  )
}
