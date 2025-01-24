import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  // ...Custom flat configs append after nuxt's configs
)
  .append(
    {
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
  )
