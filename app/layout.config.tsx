import { type BaseLayoutProps, type DocsLayoutProps } from 'fumadocs-ui/layout'
import { pageTree } from '@/app/source'

// shared configuration
export const baseOptions: BaseLayoutProps = {
  githubUrl: 'https://github.com/namick',
  nav: {
    title: 'Nathan Amick',
  },
}

// docs layout configuration
export const docsOptions: DocsLayoutProps = {
  ...baseOptions,
  tree: pageTree,
}
