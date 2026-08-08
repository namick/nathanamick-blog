/**
 * Marks a post that carries `draft: true`. Only ever rendered under `next dev`
 * — a production build has no route that can reach one.
 */
export function DraftBadge() {
  return (
    <span className="rounded-sm border border-fd-primary/40 px-2 py-0.5 font-mono text-[0.7rem] tracking-widest text-fd-primary uppercase">
      Draft
    </span>
  )
}
