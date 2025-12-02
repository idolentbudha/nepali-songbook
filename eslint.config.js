// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");
const eslintPluginPrettierRecommended = require("eslint-config-prettier");

module.exports = defineConfig([
  expoConfig,
  eslintPluginPrettierRecommended,
  {
    ignores: ["dist/*"],
  },
  {
    files: ["*.ts", "*.tsx"],
    languageOptions: {
      ecmaVersion: 2020,
    },
  },
  {
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "warn",
      "no-debugger": "warn",
      "no-console": "warn",
    },
  },
]);
