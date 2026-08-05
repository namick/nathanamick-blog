'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

/**
 * Every post ships with a cover drawn in the site's own palette, laid over the
 * post's real hero art. Hovering (or tapping) dissolves the cover for a look
 * underneath; it re-wraps itself a few seconds later. The art below is never
 * lost, but the index still reads as one deliberate set rather than nine
 * unrelated illustrations.
 */

const REWRAP_DELAY = 5000

export function HeroWrap({
  cover,
  children,
  className = '',
}: {
  cover: ReactNode
  children: ReactNode
  className?: string
}) {
  const [open, setOpen] = useState(false)
  const openRef = useRef(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  // Set when a tap is the one doing the unwrapping, so that tap alone doesn't
  // also follow the link this cover may be sitting inside.
  const tapConsumed = useRef(false)

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current)
    }
  }, [])

  function unwrap() {
    if (timer.current) clearTimeout(timer.current)
    openRef.current = true
    setOpen(true)
    timer.current = setTimeout(() => {
      openRef.current = false
      setOpen(false)
    }, REWRAP_DELAY)
  }

  function rewrap() {
    if (timer.current) clearTimeout(timer.current)
    openRef.current = false
    setOpen(false)
  }

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onPointerEnter={(e) => {
        if (e.pointerType === 'mouse') unwrap()
      }}
      onPointerLeave={(e) => {
        if (e.pointerType === 'mouse') rewrap()
      }}
      onPointerDown={(e) => {
        if (e.pointerType === 'mouse') return
        tapConsumed.current = !openRef.current
        if (!openRef.current) unwrap()
      }}
      onClick={(e) => {
        if (!tapConsumed.current) return
        e.preventDefault()
        tapConsumed.current = false
      }}
    >
      {children}
      <div
        aria-hidden="true"
        className={`absolute inset-0 transition-opacity ease-out motion-reduce:transition-none ${
          // Quick to come off, slow to settle back on.
          open ? 'opacity-0 duration-200' : 'opacity-100 duration-1000'
        }`}
      >
        {cover}
      </div>
    </div>
  )
}
