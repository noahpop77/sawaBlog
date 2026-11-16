import { defineConfig } from "astro/config";

// Astro's dev server serves files from `public/` by exact path, so `/admin`
// does not resolve to `/admin/index.html` the way a static host would. Redirect
// it during development so the CMS URL is the same locally and in production.
const adminIndexRedirect = {
  name: "admin-index-redirect",
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      const path = (req.url ?? "").split("?")[0];
      if (path === "/admin" || path === "/admin/") {
        res.statusCode = 302;
        res.setHeader("Location", "/admin/index.html");
        res.end();
        return;
      }
      next();
    });
  },
};

// Used for canonical URLs and social sharing metadata. Must match the domain
// the site is deployed to.
export default defineConfig({
  site: "https://bsawa.com",
  output: "static",
  markdown: {
    shikiConfig: {
      theme: "material-theme-ocean",
    },
  },
  vite: {
    plugins: [adminIndexRedirect],
  },
});
