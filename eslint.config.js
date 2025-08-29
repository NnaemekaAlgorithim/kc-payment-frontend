import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import importPlugin from "eslint-plugin-import";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    extends: [
      js.configs.recommended,
      react.configs.recommended,
      reactHooks.configs["recommended-latest"],
      reactRefresh.configs.vite,
      importPlugin.configs.recommended, // 👈 add this
    ],
    plugins: {
      import: importPlugin, // 👈 register the plugin
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    rules: {
      "no-unused-vars": ["error", { varsIgnorePattern: "^[A-Z_]" }],
      "import/no-unresolved": "error", // 👈 catch missing imports
      "import/named": "error",
      "import/namespace": "error",
      "import/default": "error",
      "import/export": "error",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
]);
