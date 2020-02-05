module.exports = {
  extends: [
    "eslint-config-airbnb/rules/react",
    "eslint-config-airbnb/rules/react-hooks",
    "eslint-config-avasuro/2__single_quotes_and_spaces"
  ],
  env: {
    "browser": true
  },
  "rules": {
    // Validate props indentation in JSX
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-indent-props.md
    "react/jsx-indent-props": ["error", 4],
    // Enforce JSX indentation
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-indent.md
    "react/jsx-indent": ["error", 4],
    // only .jsx and .js files may have JSX
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-filename-extension.md
    "react/jsx-filename-extension": ["error", { "extensions": [".jsx", ".js"] }],
    // Enforce state initialization style
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/state-in-constructor.md
    "react/state-in-constructor": ["error", "never"]
  }
};