const { defineConfig } = require("eslint-define-config");

module.exports = defineConfig({
  $schema: "https://json.schemastore.org/eslintrc.json",
  plugins: ["@typescript-eslint", "import"],
  parserOptions: {
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
  },

  extends: [
    "eslint:recommended",
    "plugin:storybook/recommended",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:tailwindcss/recommended",
    "prettier",
    "next/core-web-vitals",
  ],
  rules: {
    // sort imports
    "import/order": "error",

    // no let exports
    "import/no-mutable-exports": "error",

    "import/no-cycle": "error",
    "import/no-default-export": "error",

    "import/no-unresolved": "off",

    "no-irregular-whitespace": ["error", { skipJSXText: true }],

    // allow {} even though it's unsafe but comes handy
    "@typescript-eslint/ban-types": [
      "error",
      {
        types: {
          "{}": false,
        },
      },
    ],

    "@typescript-eslint/consistent-type-imports": [
      "error",
      {
        prefer: "type-imports",
        fixStyle: "inline-type-imports",
        disallowTypeAnnotations: false,
      },
    ],

    "@typescript-eslint/consistent-type-definitions": ["error", "type"],

    "import/no-duplicates": ["error", { "prefer-inline": true }],

    // false negatives
    "import/namespace": ["off"],

    // we allow empty interfaces
    "no-empty-pattern": "off",
    "@typescript-eslint/no-empty-interface": "off",

    "react/no-unescaped-entities": "off",

    // we allow empty functions
    "@typescript-eslint/no-empty-function": "off",

    // we sometimes use async functions that don't await anything
    "@typescript-eslint/require-await": "off",

    // make sure to `await` inside try…catch
    "@typescript-eslint/return-await": ["error", "in-try-catch"],

    // allow unused vars prefixed with `_`
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],

    // numbers and booleans are fine in template strings
    "@typescript-eslint/restrict-template-expressions": ["error", { allowNumber: true, allowBoolean: true }],

    "@typescript-eslint/unbound-method": "off",

    "@typescript-eslint/no-misused-promises": [
      "error",
      {
        checksVoidReturn: false,
      },
    ],
  },
  overrides: [
    {
      files: ["app/**/{page,layout,error,loading,not-found}.tsx", "*.ts", "*.stories.tsx"],
      rules: {
        "import/no-default-export": "off",
      },
    },
  ],
  ignorePatterns: ["*.js", "*.jsx", "*.cjs", "*.mjs"],
});
