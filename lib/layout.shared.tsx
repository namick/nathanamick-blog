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
    ],
  }
}
