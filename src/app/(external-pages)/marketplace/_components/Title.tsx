import React from 'react'

type Props = {
   text: string
}

export default function Title({ text }: Props) {
  return (
    <h1 className='uppercase font-extrabold mb-2.5'>{text}</h1>
  )
}
