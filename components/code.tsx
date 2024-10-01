import { Pre, RawCode, highlight } from 'codehike/code'
import { callout } from './annotations/callout'

export async function Code({ codeblock }: { codeblock: RawCode }) {
  const highlighted = await highlight(codeblock, 'github-dark')

  return (
    <Pre
      code={highlighted}
      handlers={[callout]}
      className="not-prose rounded-3xl border bg-black p-6 font-mono text-base"
    />
  )
}
