import { InlineAnnotation, AnnotationHandler } from 'codehike/code'

export const callout: AnnotationHandler = {
  name: 'callout',
  transform: (annotation: InlineAnnotation) => {
    const { name, query, lineNumber, fromColumn, toColumn, data } = annotation
    return {
      name,
      query,
      fromLineNumber: lineNumber,
      toLineNumber: lineNumber,
      data: { ...data, column: (fromColumn + toColumn) / 2 },
    }
  },
  Block: ({ annotation, children }) => {
    const { column } = annotation.data
    return (
      <>
        {children}
        <div
          style={{ minWidth: `${column + 4}ch` }}
          className="relative mt-1 -ml-[1ch] w-fit rounded border border-current bg-fd-background px-2 whitespace-break-spaces"
        >
          <div
            style={{ left: `${column}ch` }}
            className="absolute -top-[1px] h-2 w-2 -translate-y-1/2 rotate-45 border-t border-l border-current bg-fd-background"
          />
          {annotation.query}
        </div>
      </>
    )
  },
}
