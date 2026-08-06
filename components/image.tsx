import NextImage, { type ImageProps } from 'next/image'
import path from 'path'
import sharp from 'sharp'

/** `src` is a path under `public/`, which is also where the blur is read from. */
interface Props extends Omit<ImageProps, 'src' | 'alt'> {
  src: string
  alt?: string
}

export async function Image({ alt = '', ...props }: Props) {
  const imagePath = path.join(process.cwd(), 'public', props.src)
  const sharpImage = sharp(imagePath)

  const placeholder = await sharpImage.resize(10).toBuffer()
  const base64 = placeholder.toString('base64')
  const blurDataURL = `data:image/png;base64,${base64}`

  return (
    <NextImage
      sizes="100%"
      quality={90}
      placeholder="blur"
      blurDataURL={blurDataURL}
      width={1024}
      height={575}
      {...props}
      alt={alt}
    />
  )
}
