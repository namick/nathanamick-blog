import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared'

export function baseOptions(): BaseLayoutProps {
  return {
    githubUrl: 'https://github.com/namick',
    themeSwitch: { enabled: false },
    nav: {
      title: <span className="font-serif text-lg">Nathan Amick</span>,
      transparentMode: 'top',
    },
    links: [
      {
        text: 'Blog',
        url: '/blog',
        active: 'nested-url',
      },
      // A dev-only way in. Checked inline rather than through lib/blog so the
      // docs and home layouts don't pull the whole content layer in for it.
      ...(process.env.NODE_ENV === 'development'
        ? [{ text: 'Drafts', url: '/drafts', active: 'nested-url' as const }]
        : []),
    ],
  }
}
