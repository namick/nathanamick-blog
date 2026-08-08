# nathanamick.com

Personal site and blog. Next 16 (App Router) · React 19 · Fumadocs 16 · Code Hike · Tailwind 4 · pnpm.

## Authoring

**Adding a blog post or hero image: see [docs/authoring-a-blog-post.html](docs/authoring-a-blog-post.html)** — frontmatter schema, image sizes and locations, and the failure modes. Open it in a browser.

`docs/` is plain reference material for humans. It is not part of the site: `content/docs/` is the Fumadocs section served at `/docs`, and that is a different thing.

## Commands

```bash
pnpm dev            # http://localhost:3000
pnpm build
pnpm lint
pnpm types:check    # next typegen && tsc --noEmit
```

## Layout

| Path | What |
| --- | --- |
| `content/blog/` | Blog posts (MDX). Filename is the slug; `(2024)/` is a route group, not a URL segment |
| `content/docs/` | Fumadocs docs section, served at `/docs` |
| `app/(home)/` | Self-contained landing page — not a Fumadocs layout |
| `lib/blog.ts` | Post ordering, cover assignment, date formatting, read-time |
| `source.config.ts` | Frontmatter schemas and Code Hike wiring |
| `public/images/hero/` | Post hero art, 1024×575 |
| `public/images/hero-wrap/` | The 22 chalk covers, assigned automatically |

## Design system — "the chalkboard"

Dark-only; theme switching is disabled deliberately (`lib/layout.shared.tsx`, `app/layout.tsx`). Near-black slate `hsl(150,9%,5%)`, chalk-white foreground `hsl(50,15%,88%)`, single ochre accent `hsl(43,60%,62%)`. Newsreader (serif display) · Inter (body) · IBM Plex Mono (labels). New work should stay inside this system rather than reintroducing generic defaults.

## Things that look like mistakes but are not

- **Zod is pinned to `^3`.** Code Hike 1.1's `parseProps` uses the Zod 3 type signature; on Zod 4 its results degrade to `unknown` and `components/grid.tsx` / `components/scrollycoding.tsx` fail type-check. Revisit only when Code Hike supports Zod 4.
- **Every theme color needs the `fd-` prefix.** Fumadocs 16 namespaces them: `bg-background` compiles to nothing under Tailwind 4, silently. It must be `bg-fd-background`. Nothing errors — the styling just vanishes.
- **The flock controls are `z-20`.** The hero copy block is `z-10` and comes later in the DOM, so at equal z-index it paints over the panel and eats every click. Don't tidy that back to `z-10`.
- **Post pages print no summary above the body.** Several posts open with their frontmatter `summary` verbatim, so it reads as a stutter.
- **The blog index never explains the hover-to-unwrap covers.** That is an unannounced Easter egg by choice; don't add instructions.
- **`prose-lg` / `prose-xl` are defined locally** in `app/global.css` as `@utility` blocks. Fumadocs' typography plugin ships only `prose` and `prose-sm`.
- **The enlarge overlay applies `min-w` to vector art only** (`components/import-image.tsx`). It exists so a diagram opens over-wide and pannable on a phone instead of returning at column width. Half the raster images in `content/blog/images/` are narrower than that floor, and `min-width` beats `max-width` — applying it to them would upscale them into blur.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
