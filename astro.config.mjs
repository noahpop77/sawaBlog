import { defineConfig } from "astro/config";

// Replace `site` with your real domain once you have one. It is used for
// canonical URLs and social sharing metadata.
export default defineConfig({
  site: "https://example.com",
  output: "static",
  markdown: {
    shikiConfig: {
      theme: "material-theme-ocean",
    },
  },
});
