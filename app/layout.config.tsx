import { type HomeLayoutProps } from 'fumadocs-ui/home-layout'

export const baseOptions: HomeLayoutProps = {
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
