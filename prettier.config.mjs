/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
  trailingComma: 'es5',
  semi: false,
  singleQuote: true,
  plugins: ['prettier-plugin-tailwindcss'],
  // Tailwind v4 is configured in CSS, so the plugin needs the stylesheet
  tailwindStylesheet: './app/global.css',
  tailwindFunctions: ['clsx', 'cva'],
}

export default config
