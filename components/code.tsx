import { Pre, RawCode, highlight } from 'codehike/code'
import { callout } from './annotations/callout'

export async function Code({ codeblock }: { codeblock: RawCode }) {
  const highlighted = await highlight(codeblock, 'github-dark')

  return (
    <Pre
      code={highlighted}
      handlers={[callout]}
      className="not-prose overflow-x-auto rounded-lg border bg-black p-2 font-mono text-xs md:rounded-3xl md:p-4 md:text-sm lg:p-6 lg:text-base"
    />
  )
}
