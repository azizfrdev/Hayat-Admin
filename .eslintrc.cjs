module.exports = {
  extends: [
    "eslint:recommended",            // Basic ESLint rules
    "plugin:react/recommended",      // React-specific linting rules
    "plugin:react/jsx-runtime",      // Rules for JSX in React 17+
    "plugin:react-hooks/recommended",// React Hooks linting rules
    "prettier",                      // Prettier integration to avoid conflicts with ESLint
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],  // Folders or files to ignore
  parser: "babel-eslint",                    // Use babel-eslint for JavaScript files
  env: {
    browser: true,
    es2021: true,  // Set ES2021 as the target JavaScript version
  },
  settings: {
    react: {
      version: "detect",  // Automatically detects the React version
    },
  },
};
