import { defineConfig, globalIgnores } from "eslint/config";
import js from "@eslint/js";
import next from "@next/eslint-plugin-next";
import typescript from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import prettier from "eslint-config-prettier/flat";

export default defineConfig([
  js.configs.recommended,
  ...typescript.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    plugins: { "@next/next": next, "react-hooks": reactHooks },
    rules: {
      ...next.configs.recommended.rules,
      ...next.configs["core-web-vitals"].rules,
      ...reactHooks.configs.recommended.rules,
    },
  },
  prettier,
  globalIgnores([".next/**", "out/**", "dist/**", "next-env.d.ts"]),
]);
