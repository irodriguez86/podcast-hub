import { defineConfig } from "cypress";

export default defineConfig({
  defaultCommandTimeout: 20000, // set default timeout to 20 seconds
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
