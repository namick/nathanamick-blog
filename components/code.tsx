import { Pre, RawCode, highlight } from 'codehike/code'
import { callout } from './annotations/callout'

export async function Code({ codeblock }: { codeblock: RawCode }) {
  const highlighted = await highlight(codeblock, 'github-dark')

  return (
    <div className="not-prose overflow-x-auto rounded-lg border bg-black p-2 font-mono text-xs md:rounded-3xl md:text-sm lg:text-base">
      <div className="pb-2 text-center">{highlighted.meta}</div>
      <Pre code={highlighted} handlers={[callout]} className="md:p-2 lg:p-4" />
    </div>
  )
}
