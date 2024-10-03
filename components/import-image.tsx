import { ComponentPropsWithoutRef } from 'react'
import NextImage, { ImageProps } from 'next/image'

interface Props extends ComponentPropsWithoutRef<'img'> {
  src: string
}

export function Image(props: Props) {
  return (
    <div className="my-20">
      <NextImage {...(props as ImageProps)} className="rounded-2xl border" />
    </div>
  )
}
