import React from 'react'

import { z } from 'zod'
import { parseProps, Block } from 'codehike/blocks'

const Schema = Block.extend({
  blocks: z.array(Block),
})

export async function Grid(props: { children: React.ReactNode }) {
  const { blocks, children } = parseProps(props, Schema)

  if (!blocks) {
    return <>{children}</>
  }

  return (
    <>
      {children}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {blocks.map((block, i) => (
          <GridItem key={i}>{block.children}</GridItem>
        ))}
      </div>
    </>
  )
}

export async function GridItem({ children }: { children: React.ReactNode }) {
  if (!children) {
    return null
  }

  return <div className="">{children}</div>
}
