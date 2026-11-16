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

## Publishing from the browser

The CMS is at `/admin`. It is not linked from the public site.

### One-time setup

1. Push this project to a GitHub repository.
2. Open `public/admin/config.yml` and replace:

   ```yaml
   repo: YOUR_GITHUB_USERNAME/YOUR_REPO_NAME
   ```

   with your actual repository, for example `yourname/personal-site`. Also set
   `site_url` and `display_url` to your real domain.
3. Commit and push. Wait for your host to deploy.
4. Open `https://your-domain/admin`.

### Signing in

The CMS uses the GitHub backend. The simplest way to sign in is a **personal
access token**:

1. On the CMS login screen, choose **Sign In with Token**.
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

No RSS feeds, analytics, email links, Mastodon, or webmentions are included.
