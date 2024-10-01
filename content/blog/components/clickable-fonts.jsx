export function ClickableFonts({ withCode = false }) {
  const source = withCode
    ? 'https://codesandbox.io/embed/h5ycx?view=editor+%2B+preview&module=%2Fsrc%2FTitle.js'
    : 'https://codesandbox.io/embed/h5ycx?view=preview&hidenavigation=1'
  return (
    <iframe
      src={source}
      style={{
        width: '100%',
        height: '500px',
        border: 0,
        borderRadius: '4px',
        overflow: 'hidden',
      }}
      title="writing-hooks-simplified"
      allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
      sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
    ></iframe>
  )
}
