'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Boids (Reynolds, 1987) drawn as chalk dots. Three local rules — separation,
 * alignment, cohesion — each individually toggleable so the flock can be
 * taken apart and put back together.
 */

type Rules = {
  separation: boolean
  alignment: boolean
  cohesion: boolean
}

type Boid = {
  x: number
  y: number
  vx: number
  vy: number
  ochre: boolean
}

const DEFAULT_RULES: Rules = {
  separation: true,
  alignment: true,
  cohesion: true,
}

const RULE_ORDER = ['separation', 'alignment', 'cohesion'] as const

const RULE_COPY: Record<keyof Rules, string> = {
  separation: 'steer away from neighbors that get too close.',
  alignment: 'steer toward the average heading of your neighbors.',
  cohesion: 'steer toward the average position of your neighbors.',
}

const NEIGHBOR_RADIUS = 64
const SEPARATION_RADIUS = 22
const POINTER_RADIUS = 90
const MAX_SPEED = 1.6
const MIN_SPEED = 0.6

export function Flock() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rulesRef = useRef<Rules>(DEFAULT_RULES)
  const [rules, setRules] = useState<Rules>(DEFAULT_RULES)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [hint, setHint] = useState<keyof Rules | null>(null)

  useEffect(() => {
    const canvasEl = canvasRef.current
    if (!canvasEl) return
    const canvas: HTMLCanvasElement = canvasEl
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(media.matches)

    let width = 0
    let height = 0
    let dpr = 1
    let boids: Boid[] = []
    let raf = 0
    let running = false
    const pointer = { x: -1e4, y: -1e4 }

    const chalk = 'hsla(50, 15%, 88%, 0.55)'
    const ochre = 'hsla(43, 60%, 62%, 0.9)'

    function resize() {
      const parent = canvas.parentElement
      if (!parent || !ctx) return
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = parent.clientWidth
      height = parent.clientHeight
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const target = Math.min(150, Math.floor((width * height) / 9000))
      while (boids.length < target) {
        boids.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          ochre: boids.length % 37 === 5,
        })
      }
      boids = boids.slice(0, target)
    }

    function step() {
      const { separation, alignment, cohesion } = rulesRef.current
      for (const b of boids) {
        let sepX = 0
        let sepY = 0
        let avgVX = 0
        let avgVY = 0
        let avgX = 0
        let avgY = 0
        let neighbors = 0

        for (const other of boids) {
          if (other === b) continue
          const dx = other.x - b.x
          const dy = other.y - b.y
          const d2 = dx * dx + dy * dy
          if (d2 > NEIGHBOR_RADIUS * NEIGHBOR_RADIUS) continue
          neighbors++
          avgVX += other.vx
          avgVY += other.vy
          avgX += other.x
          avgY += other.y
          if (d2 < SEPARATION_RADIUS * SEPARATION_RADIUS && d2 > 0) {
            const d = Math.sqrt(d2)
            sepX -= dx / d
            sepY -= dy / d
          }
        }

        if (neighbors > 0) {
          if (separation) {
            b.vx += sepX * 0.045
            b.vy += sepY * 0.045
          }
          if (alignment) {
            b.vx += (avgVX / neighbors - b.vx) * 0.045
            b.vy += (avgVY / neighbors - b.vy) * 0.045
          }
          if (cohesion) {
            b.vx += (avgX / neighbors - b.x) * 0.0035
            b.vy += (avgY / neighbors - b.y) * 0.0035
          }
        }

        // The cursor is a mild predator: nearby boids scatter.
        const pdx = b.x - pointer.x
        const pdy = b.y - pointer.y
        const pd2 = pdx * pdx + pdy * pdy
        if (pd2 < POINTER_RADIUS * POINTER_RADIUS && pd2 > 0) {
          const pd = Math.sqrt(pd2)
          b.vx += (pdx / pd) * 0.35
          b.vy += (pdy / pd) * 0.35
        }

        const speed = Math.hypot(b.vx, b.vy) || 1e-6
        const clamped = Math.min(MAX_SPEED, Math.max(MIN_SPEED, speed))
        b.vx = (b.vx / speed) * clamped
        b.vy = (b.vy / speed) * clamped

        b.x += b.vx
        b.y += b.vy
        if (b.x < -6) b.x += width + 12
        if (b.x > width + 6) b.x -= width + 12
        if (b.y < -6) b.y += height + 12
        if (b.y > height + 6) b.y -= height + 12
      }
    }

    function draw() {
      if (!ctx) return
      ctx.clearRect(0, 0, width, height)
      for (const b of boids) {
        ctx.fillStyle = b.ochre ? ochre : chalk
        ctx.beginPath()
        ctx.arc(b.x, b.y, b.ochre ? 2 : 1.4, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    function frame() {
      if (!running) return
      step()
      draw()
      raf = requestAnimationFrame(frame)
    }

    function start() {
      if (running || media.matches) return
      running = true
      raf = requestAnimationFrame(frame)
    }

    function stop() {
      running = false
      cancelAnimationFrame(raf)
    }

    function onPointerMove(e: PointerEvent) {
      const rect = canvas.getBoundingClientRect()
      pointer.x = e.clientX - rect.left
      pointer.y = e.clientY - rect.top
    }

    function onPointerLeave() {
      pointer.x = -1e4
      pointer.y = -1e4
    }

    function onVisibility() {
      if (document.hidden) stop()
      else start()
    }

    resize()
    if (media.matches) {
      // Static chalk scatter for reduced motion: draw once, never animate.
      draw()
    } else {
      start()
    }

    const observer = new ResizeObserver(() => {
      resize()
      if (media.matches) draw()
    })
    if (canvas.parentElement) observer.observe(canvas.parentElement)

    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerout', onPointerLeave)
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      stop()
      observer.disconnect()
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerout', onPointerLeave)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  function toggle(rule: keyof Rules) {
    const next = { ...rulesRef.current, [rule]: !rulesRef.current[rule] }
    rulesRef.current = next
    setRules(next)
  }

  return (
    <>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      />
      {!reducedMotion && (
        <div className="absolute right-4 bottom-4 z-20 flex flex-col items-end gap-3 sm:right-8 sm:bottom-8">
          <p className="max-w-60 text-right font-mono text-xs leading-relaxed text-fd-muted-foreground">
            {hint ? (
              <>
                <span className="text-fd-primary">{hint}</span> —{' '}
                {RULE_COPY[hint]}
              </>
            ) : (
              'every bird follows three local rules. no leader, no plan. switch one off:'
            )}
          </p>
          <div className="flex gap-2">
            {RULE_ORDER.map((rule) => (
              <RuleSwitch
                key={rule}
                rule={rule}
                on={rules[rule]}
                onToggle={() => toggle(rule)}
                onHint={setHint}
              />
            ))}
          </div>
        </div>
      )}
    </>
  )
}

/**
 * One rule switch. The glyph is a live demonstration of the rule it controls,
 * so the panel teaches what the toggle does before you touch it.
 */
function RuleSwitch({
  rule,
  on,
  onToggle,
  onHint,
}: {
  rule: keyof Rules
  on: boolean
  onToggle: () => void
  onHint: (rule: keyof Rules | null) => void
}) {
  return (
    <button
      type="button"
      data-rule={on ? 'on' : 'off'}
      onClick={onToggle}
      onPointerEnter={() => onHint(rule)}
      onPointerLeave={() => onHint(null)}
      onFocus={() => onHint(rule)}
      onBlur={() => onHint(null)}
      aria-pressed={on}
      aria-label={`${rule}: ${RULE_COPY[rule]}`}
      className={`group flex w-[4.75rem] cursor-pointer flex-col items-center gap-1.5 rounded-sm border border-dashed bg-fd-background/60 px-1.5 pt-2 pb-1.5 backdrop-blur-sm transition-colors focus-visible:ring-2 focus-visible:ring-fd-primary focus-visible:outline-none ${
        on
          ? 'border-fd-primary/50 text-fd-primary'
          : 'border-fd-border text-fd-muted-foreground/70'
      }`}
    >
      <svg viewBox="0 0 60 40" className="h-7 w-full" aria-hidden="true">
        <RuleGlyph rule={rule} />
        <line
          className="boid-strike"
          x1="9"
          y1="33"
          x2="51"
          y2="7"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      <span className="font-mono text-[0.6rem] tracking-wider lowercase">
        {rule}
      </span>
    </button>
  )
}

function RuleGlyph({ rule }: { rule: keyof Rules }) {
  if (rule === 'separation') {
    return (
      <g className="boid-anim boid-anim-spread" fill="currentColor">
        <circle cx="22" cy="20" r="2.8" />
        <circle cx="38" cy="20" r="2.8" />
      </g>
    )
  }

  if (rule === 'cohesion') {
    return (
      <g className="boid-anim boid-anim-gather" fill="currentColor">
        <circle cx="30" cy="9" r="2.8" />
        <circle cx="18" cy="30" r="2.8" />
        <circle cx="42" cy="30" r="2.8" />
      </g>
    )
  }

  return (
    <g
      className="boid-anim boid-anim-drift"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    >
      {[11, 20, 29].map((y) => (
        <path
          key={y}
          d={`M18 ${y} h13 M27.5 ${y - 3.5} L31 ${y} L27.5 ${y + 3.5}`}
        />
      ))}
    </g>
  )
}
