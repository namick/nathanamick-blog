import { ComponentPropsWithoutRef } from 'react'
import NextImage, { ImageProps } from 'next/image'
import path from 'path'
import sharp from 'sharp'

interface Props extends ComponentPropsWithoutRef<'img'> {
  src: string
}

export async function Image(props: Props) {
  const imagePath = path.join(process.cwd(), 'public', props.src)
  console.log({ imagePath })
  const sharpImage = sharp(imagePath)

  const placeholder = await sharpImage.resize(10).toBuffer()
  const base64 = placeholder.toString('base64')
  const blurDataURL = `data:image/png;base64,${base64}`

  return (
    <NextImage
      sizes="100%"
      quality={100}
      placeholder="blur"
      blurDataURL={blurDataURL}
      width={1024}
      height={575}
      {...(props as ImageProps)}
      alt="alt text"
    />
  )
}
