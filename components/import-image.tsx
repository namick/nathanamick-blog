'use client'

import {
  useEffect,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
} from 'react'
import NextImage, { type ImageProps, type StaticImageData } from 'next/image'

/**
 * Body images in posts, with click-to-enlarge.
 *
 * The prose column is 704px. Diagrams drawn at 1440 arrive there at half size,
 * which is fine to glance at and useless to read. Clicking one opens it in a
 * native <dialog> at the full width of the window, scrolling vertically when
 * the art is taller than the viewport — so a tall diagram gets read at roughly
 * twice its inline size instead of squinted at.
 *
 * `showModal()` is doing real work: focus trapping, Esc-to-close, and top-layer
 * stacking that sits above everything without joining the z-index argument the
 * flock controls and hero copy are already having.
 */

type Props = Omit<ComponentPropsWithoutRef<'img'>, 'src'> & {
  src: string | StaticImageData
}

export function Image({ alt = '', ...props }: Props) {
  const [open, setOpen] = useState(false)
  const dialog = useRef<HTMLDialogElement>(null)

  // The dialog is only mounted while open, so nothing enlarged is ever fetched
  // for a reader who never clicks.
  useEffect(() => {
    if (open) dialog.current?.showModal()
  }, [open])

  const source = typeof props.src === 'object' ? props.src : null
  // Vector art stays crisp at any width. Raster art does not, so it stops
  // growing at the resolution it was authored in rather than going soft.
  const vector = (source?.src ?? String(props.src)).endsWith('.svg')

  return (
    <>
      <div className="my-20">
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={alt ? `Enlarge: ${alt}` : 'Enlarge image'}
          className="group relative block w-full cursor-zoom-in"
        >
          <NextImage
            {...(props as ImageProps)}
            alt={alt}
            className="rounded-2xl border"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-3 right-3 rounded-full border border-fd-border bg-fd-background/75 p-2 text-fd-primary opacity-60 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 2H2v4M10 2h4v4M6 14H2v-4M10 14h4v-4" />
            </svg>
          </span>
        </button>
      </div>

      {open && (
        <dialog
          ref={dialog}
          onClose={() => setOpen(false)}
          onClick={() => dialog.current?.close()}
          className="m-0 h-full max-h-none w-full max-w-none overflow-auto overscroll-contain border-0 bg-transparent p-4 backdrop:bg-fd-background/90 backdrop:backdrop-blur-sm sm:p-8"
        >
          <div className="mx-auto flex min-h-full max-w-[1600px] flex-col justify-center gap-4">
            <p className="text-center font-mono text-xs tracking-widest text-fd-muted-foreground uppercase">
              Click anywhere or press Esc to close
            </p>
            {/*
              The min-width is what makes this worth opening on a phone: at
              column width the art would come back the same size it already
              was, so vector art opens over-wide and pans, the way a wide table
              does. Raster art is left alone — half the images in this repo are
              narrower than that, and min-width beats max-width, so applying it
              to them would only upscale them into blur.
            */}
            <NextImage
              {...(props as ImageProps)}
              alt={alt}
              sizes="100vw"
              className={`h-auto w-full cursor-zoom-out rounded-lg ${
                vector ? 'min-w-[860px]' : ''
              }`}
              style={vector ? undefined : { maxWidth: source?.width }}
            />
          </div>
        </dialog>
      )}
    </>
  )
}
