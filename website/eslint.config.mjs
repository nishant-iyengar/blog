import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import reactHooks from "eslint-plugin-react-hooks";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    plugins: {
      "react-hooks": reactHooks,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      // Enforce React Hooks rules strictly
      "react-hooks/rules-of-hooks": "error", // Prevents conditional hooks, hooks in loops, etc.
      "react-hooks/exhaustive-deps": "error", // ERROR: Enforces exact dependencies - nothing more, nothing less
      
      // Next.js specific best practices
      "@next/next/no-html-link-for-pages": "error", // Use Next.js Link component instead of <a> tags
      "@next/next/no-img-element": "warn", // Prefer next/image over <img> for optimization
      "@next/next/no-sync-scripts": "error", // Prevents blocking scripts in pages
      "@next/next/no-before-interactive-script-outside-document": "error", // Ensures scripts are in _document
      
      // React best practices
      "react/no-unescaped-entities": "error", // Prevents unescaped quotes, etc. in JSX
      "react/jsx-key": "error", // Requires keys in arrays
      "react/jsx-no-duplicate-props": "error", // Prevents duplicate props
      "react/jsx-no-undef": "error", // Prevents undefined variables in JSX
      "react/jsx-uses-react": "off", // Not needed in React 17+
      "react/jsx-uses-vars": "error", // Warns about unused variables in JSX
      "react/no-children-prop": "error", // Prevents passing children as props
      "react/no-danger-with-children": "error", // Prevents dangerous HTML with children
      "react/no-deprecated": "warn", // Warns about deprecated React APIs
      "react/no-direct-mutation-state": "error", // Prevents direct state mutation
      "react/no-find-dom-node": "error", // Prevents findDOMNode usage
      "react/no-is-mounted": "error", // Prevents isMounted usage
      "react/no-render-return-value": "error", // Prevents using render return value
      "react/no-string-refs": "error", // Prevents string refs
      "react/no-unknown-property": "error", // Prevents unknown DOM properties
      "react/prop-types": "off", // Not needed with TypeScript
      "react/react-in-jsx-scope": "off", // Not needed in React 17+
      
      // General JavaScript/TypeScript best practices
      "no-console": "warn", // Warns about console.log (allows for debugging but warns)
      "no-debugger": "error", // Prevents debugger statements
      "no-alert": "warn", // Warns about alert usage
      "no-var": "error", // Prefers let/const over var
      "prefer-const": "warn", // Prefers const when variable is never reassigned
      "prefer-arrow-callback": "warn", // Prefers arrow functions for callbacks
      "no-unused-vars": "off", // TypeScript handles this
      "@typescript-eslint/no-unused-vars": ["warn", { 
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      }], // TypeScript unused vars with underscore exception
      
      // Disallow type assertions (as) - forces proper type handling
      "@typescript-eslint/consistent-type-assertions": ["error", {
        "assertionStyle": "never", // Disallow 'as' type assertions entirely
      }],
      "@typescript-eslint/no-explicit-any": "error", // Disallow 'any' type
      "@typescript-eslint/no-non-null-assertion": "error", // Disallow '!' non-null assertions
    },
    linterOptions: {
      // Disallow all inline configuration comments (eslint-disable, etc.)
      noInlineConfig: true,
      // Report unused eslint-disable comments
      reportUnusedDisableDirectives: true,
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
