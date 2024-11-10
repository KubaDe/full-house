import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import _import from "eslint-plugin-import";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: ["**/*.js", "**/*.jsx", "**/*.cjs", "**/*.mjs"],
  },
  ...fixupConfigRules(
    compat.extends(
      "next",
      "eslint:recommended",
      "plugin:storybook/recommended",
      "plugin:@typescript-eslint/recommended-type-checked",
      "plugin:@typescript-eslint/stylistic-type-checked",
      "plugin:import/recommended",
      "plugin:import/typescript",
      "plugin:tailwindcss/recommended",
      "prettier",
      "next/core-web-vitals",
    ),
  ),
  {
    plugins: {
      "@typescript-eslint": fixupPluginRules(typescriptEslint),
      import: fixupPluginRules(_import),
    },

    languageOptions: {
      ecmaVersion: 5,
      sourceType: "script",

      parserOptions: {
        project: "tsconfig.json",
        tsconfigRootDir: "./",
      },
    },

    rules: {
      "import/order": "error",
      "import/no-mutable-exports": "error",
      "import/no-cycle": "error",
      "import/no-default-export": "error",
      "import/no-unresolved": "off",

      "no-irregular-whitespace": [
        "error",
        {
          skipJSXText: true,
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

      "import/no-duplicates": [
        "error",
        {
          "prefer-inline": true,
        },
      ],

      "import/namespace": ["off"],
      "no-empty-pattern": "off",
      "@typescript-eslint/no-empty-interface": "off",
      "react/no-unescaped-entities": "off",
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/require-await": "off",
      "@typescript-eslint/return-await": ["error", "in-try-catch"],

      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],

      "@typescript-eslint/no-empty-object-type": "off",

      "@typescript-eslint/restrict-template-expressions": [
        "error",
        {
          allowNumber: true,
          allowBoolean: true,
        },
      ],

      "@typescript-eslint/unbound-method": "off",

      "@typescript-eslint/no-misused-promises": [
        "error",
        {
          checksVoidReturn: false,
        },
      ],
    },
  },
  {
    files: ["app/**/{page,layout,error,loading,not-found}.tsx", "**/*.ts", "**/*.stories.tsx"],

    rules: {
      "import/no-default-export": "off",
    },
  },
];
