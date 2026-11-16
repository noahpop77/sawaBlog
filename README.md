# Personal site

A small personal website with a blog, a moments feed, and a private browser CMS
for publishing. Built with [Astro](https://astro.build/) and
[Sveltia CMS](https://sveltiacms.app/). The layout takes its cues from
[hamvocke.com](https://hamvocke.com/), using a deep purple accent in place of
the original red.

- Blog posts and moments are Markdown files in this repository.
- The CMS at `/admin` creates and edits those files for you.
- Publishing commits to GitHub, and your host rebuilds the static site.
- There is no database, no server to maintain, and nothing to keep running.

## Quick start

```bash
npm install
npm run dev
```

Then open <http://localhost:4321>.

To produce the static site:

```bash
npm run build
npm run preview
```

The build output goes to `dist/`.

> If `npm install` fails with an `EACCES` error about `~/.npm/_cacache`, your
> npm cache has root-owned files. Either fix it with
> `sudo chown -R $(id -u):$(id -g) ~/.npm`, or install with a temporary cache:
> `npm install --cache "$TMPDIR/npm-cache"`.

## Where things live

| What | File |
| --- | --- |
| Name, handle, description, site URL, social links | `src/data/site.ts` |
| Home page introduction | `src/pages/index.astro` |
| About page | `src/pages/about.astro` |
| Now page | `src/pages/now.astro` |
| Blog posts | `src/content/blog/*.md` |
| Moments | `src/content/moments/*.md` |
| CMS setup | `public/admin/config.yml` |
| Uploaded images | `public/uploads/` |
| Colors, fonts, spacing | `src/styles/global.css` |
| Logo mark | `src/components/LogoMark.astro` |
| Moment card | `src/components/MomentCard.astro` |
| Favicon | `public/favicon.svg` |
| Footer links | `src/components/Footer.astro` |

## Replace the placeholders

1. Edit `src/data/site.ts` with your name, site title, description, domain,
   GitHub URL, and LinkedIn URL. Also set the same domain as `site` in
   `astro.config.mjs`.
2. Replace the copy in `src/pages/index.astro`, `about.astro`, and `now.astro`.
3. Replace `public/favicon.svg` and, if you want a different logo, the mark in
   `src/components/LogoMark.astro`.
4. Optionally adjust the accent colors and fonts in `src/styles/global.css`.
5. Delete or rewrite the placeholder post in `src/content/blog/` and the
   placeholder moment in `src/content/moments/`.

The footer contains GitHub, LinkedIn, YouTube, and Back to top.

## Publishing locally

There are two ways to edit locally, depending on your browser.

### Firefox-based browsers (Firefox, Zen, LibreWolf)

Firefox does not implement the File System Access API, so Sveltia's **Work with
Local Repository** mode cannot run there. Use the GitHub backend instead:

1. Start the dev server with `npm run dev` and open <http://localhost:4321/admin>.
2. Choose **Sign In Using Access Token** and paste a token with **Contents:
   Read and write** access to this repository (see [Signing in](#signing-in)).
3. Create or edit a post and click **Publish**.

Publishing commits to GitHub, where your host rebuilds the site. To see the new
files in your local checkout, run `git pull` and Astro will pick them up
immediately. Pasting images into the editor works in Firefox; uploading more than
one image in a single paste does not.

Sveltia's local-repository mode is Chromium-only, so the CMS hides that option in
Firefox rather than showing a button that cannot work.

### Chromium-based browsers (Chrome, Edge, Brave, Arc)

Use the local workflow to edit files without committing anything:

1. Start the dev server with `npm run dev` and open <http://localhost:4321/admin>.
2. Choose **Work with Local Repository**.
3. When the browser asks for a folder, select the root of this project (the
   folder containing `package.json`).
4. Allow read and write access when prompted.

From there, creating a post or pasting an image writes files directly into
`src/content/blog/`, `src/content/moments/`, and `public/uploads/`. Astro picks
up the change immediately, so you can preview the result at
<http://localhost:4321> without publishing.

Notes:

- This workflow needs a Chromium-based browser and a Git repository, both
  already true for this project.
- The browser remembers the folder permission per origin, so you may not need to
  select it again on the next visit.
- If `npm run dev` reports a different port (for example `4322` because `4321`
  is busy), update `site_url` and `display_url` in `public/admin/config.yml` to
  match, then restart the dev server.
- Use **Publish** in the CMS to commit and push through GitHub. If you only want
  local files, use **Save** instead; nothing is committed until you run Git
  yourself.

## Publishing from the browser

The CMS is at `/admin`. It is not linked from the public site.

### One-time setup

1. Push this project to a GitHub repository.
2. Open `public/admin/config.yml` and replace:

   ```yaml
   repo: YOUR_GITHUB_USERNAME/YOUR_REPO_NAME
   ```

   with your actual repository, for example `yourname/personal-site`. Also set
   `site_url` and `display_url` to your real domain, including the protocol
   (`https://your-domain.com`); Sveltia rejects bare hostnames.
3. Commit and push. Wait for your host to deploy.
4. Open `https://your-domain/admin`.

### Signing in

The CMS uses the GitHub backend. The simplest way to sign in is a **personal
access token**, which works in Firefox-based browsers such as Zen as well as in
Chromium-based browsers:

1. On the CMS login screen, choose **Sign In Using Access Token**.
2. The dialog links to GitHub's token page with the right permissions
   pre-selected. If you create one manually, a fine-grained token needs
   **Contents: Read and write** access to this repository. A classic token needs
   the `repo` scope.
3. Paste the token into the CMS. It is stored in your browser, not in the site.

Only a GitHub account with write access to the repository can publish. Visitors
who find `/admin` can open the login screen but cannot change anything.

### Adding a post

1. Go to `/admin`.
2. Choose **Blog posts** → **New Blog post**.
3. Fill in title, description, date, tags, and the body.
4. Click **Publish**.

The file is committed to `src/content/blog/`. Your host rebuilds and the post
appears at `/blog/<slug>` after roughly 30–60 seconds.

### Adding a moment

1. Go to `/admin`.
2. Choose **Moments** → **New Moment**.
3. Pick a date, add tags if you like, and write a short update.
4. Click **Publish**.

Moments end up at `/moments/<timestamp>` and appear in the feed on `/moments`.

### Pasting images

Click into the body editor and paste an image from your clipboard (or drag and
drop it). The CMS uploads it to `public/uploads/` and inserts the Markdown
reference automatically. You can also use the image field on a blog post to set
a cover image.

## Publishing manually

If you prefer files over the CMS, add Markdown directly.

### Blog post

Create `src/content/blog/my-post.md`:

```md
---
title: "My post"
description: "A short summary for the archive."
date: 2026-11-16
tags: ["programming", "notes"]
featured: false
draft: false
---

Your post content in Markdown.
```

The URL is derived from the filename, so the example above becomes
`/blog/my-post`. Optional frontmatter:

- `updated`: a date shown as “Updated …”
- `cover`: an image path such as `/uploads/cover.jpg`
- `featured`: currently available in the schema for future use
- `draft: true`: hides the post from the built site

### Moment

Create `src/content/moments/2026-11-16-143000.md`:

```md
---
date: 2026-11-16T14:30:00
tags: ["personal"]
---

A short update. Images work here too:

![Description](/uploads/photo.jpg)
```

Filenames must be unique. The CMS uses a timestamp-based filename automatically.

### Tags

Tags are plain strings in frontmatter. Tag pages are generated automatically at
`/tags/<tag>`, and they collect both blog posts and moments that use the tag.
No configuration is needed.

## How the CMS is hidden

- There is no “New post” link in the site navigation or footer.
- `/admin` sets `noindex, nofollow` and `robots.txt` disallows it.
- The real protection is GitHub: publishing requires repository write access.

You can still reach the CMS by typing `/admin` directly.

## Hosting

Any static host works. Once you connect this repository:

- **Build command:** `npm run build`
- **Output directory:** `dist`
- **Install command:** `npm install`
- Deploys should run on every push to the branch configured in
  `public/admin/config.yml` (`main` by default).

### GitHub Pages

This repository includes `.github/workflows/deploy.yml`, which builds the site
and publishes `dist` on every push to `main`.

1. In the repository, open **Settings → Pages** and set **Source** to
   **GitHub Actions**.
2. Set the custom domain to `bsawa.com`.
3. At your DNS provider (Cloudflare, in this case), remove any existing `A` or
   `CNAME` record on the apex domain, then add:
   - `A` records for `@`:
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`,
     `185.199.111.153`
   - `AAAA` records for `@`:
     `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`,
     `2606:50c0:8003::153`
   - a `CNAME` record for `www` pointing to `noahpop77.github.io`
4. Leave all of these records **DNS only** (grey cloud). GitHub has to see the
   hostnames directly to issue its HTTPS certificate; the orange proxy can be
   enabled later if you want Cloudflare in front.
5. Wait for the DNS check, then enable **Enforce HTTPS**. Certificate issuance
   is usually quick but can take up to 24 hours.
6. Update `site` in `astro.config.mjs` and `site_url` / `display_url` in
   `public/admin/config.yml` to `https://bsawa.com`, commit, and push.

GitHub Pages automatically redirects `www.bsawa.com` to `bsawa.com` once both
sets of records exist.

With GitHub Actions publishing, the custom domain is stored in the repository
settings. A `CNAME` file is only used when publishing from a branch, so none is
needed here.

No RSS feeds, analytics, email links, Mastodon, or webmentions are included.
