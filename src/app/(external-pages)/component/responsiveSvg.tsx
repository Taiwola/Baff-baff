import React from "react"

interface ResponsiveSvgProps extends React.SVGProps<SVGSVGElement> {
  small: React.FC<React.SVGProps<SVGSVGElement>>
  large: React.FC<React.SVGProps<SVGSVGElement>>
}

const ResponsiveSvg: React.FC<ResponsiveSvgProps> = ({
  small,
  large,
  className,
  ...props
}) => {
  const SmallSvg = small
  const LargeSvg = large

  return (
    <div className="inline-block">
      <SmallSvg className={`${className || ""} block md:hidden`} {...props} />
      <LargeSvg className={`${className || ""} hidden md:block`} {...props} />
    </div>
  )
}

export default ResponsiveSvg
