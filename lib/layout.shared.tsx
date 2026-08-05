import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared'

export function baseOptions(): BaseLayoutProps {
  return {
    githubUrl: 'https://github.com/namick',
    nav: {
      title: 'Nathan Amick',
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
