import { z } from 'zod'
import {
  Selection,
  Selectable,
  SelectionProvider,
} from 'codehike/utils/selection'
import { Block, CodeBlock, parseProps } from 'codehike/blocks'
import { Pre, RawCode, highlight } from 'codehike/code'

import { tokenTransitions } from '@/components/annotations/token-transitions'
import { wordWrap } from './annotations/word-wrap'

const Schema = Block.extend({
  steps: z.array(Block.extend({ code: CodeBlock })),
})

export function Scrollycoding(props: unknown) {
  const { steps } = parseProps(props, Schema)
  return (
    <SelectionProvider className="flex gap-4">
      <div className="prose mb-[90vh] ml-2 mt-32 flex-1">
        {steps.map((step, i) => (
          <Selectable
            key={i}
            index={i}
            selectOn={['click', 'scroll']}
            className="mb-24 rounded border-l-4 bg-card px-5 py-2 data-[selected=true]:border-blue-400"
          >
            <h2 className="mt-4 text-xl">{step.title}</h2>
            <div>{step.children}</div>
          </Selectable>
        ))}
      </div>
      <div className="w-[300px]  bg-card">
        <div className="sticky top-16 overflow-auto">
          <Selection
            from={steps.map((step, i) => (
              <Code key={i} codeblock={step.code} />
            ))}
          />
        </div>
      </div>
    </SelectionProvider>
  )
}

async function Code({ codeblock }: { codeblock: RawCode }) {
  const highlighted = await highlight(codeblock, 'github-dark')

  return (
    <Pre
      code={highlighted}
      handlers={[tokenTransitions, wordWrap]}
      className="min-h-[40rem]"
    />
  )
}
