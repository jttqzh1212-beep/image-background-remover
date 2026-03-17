# Image Background Remover

A web-based image background removal tool powered by the [remove.bg](https://remove.bg) API, deployed on Cloudflare Pages.

## Features

- Drag & drop / click / paste to upload images
- Supports JPG, PNG, WebP (up to 12MB)
- Instant preview with checkerboard transparent background
- Custom background color preview
- Download result as PNG
- Mobile responsive

## Tech Stack

- Frontend: Vanilla HTML/CSS/JS (no dependencies)
- Hosting: Cloudflare Pages
- API Proxy: Cloudflare Pages Functions
- Background removal: remove.bg API

## Deployment

### 1. Fork / clone this repo

```bash
git clone https://github.com/jttqzh1212-beep/image-background-remover.git
```

### 2. Connect to Cloudflare Pages

1. Go to [Cloudflare Pages](https://pages.cloudflare.com/)
2. Create a new project → Connect to Git → select this repo
3. Build settings: leave blank (no build command needed)
4. Deploy

### 3. Set environment variable

In Cloudflare Pages → Settings → Environment Variables:

| Variable | Value |
|----------|-------|
| `REMOVE_BG_API_KEY` | Your [remove.bg API key](https://www.remove.bg/api) |

### 4. Done

Visit your `*.pages.dev` URL and start removing backgrounds!

## Local Development

```bash
npx wrangler pages dev . --compatibility-date=2024-01-01
```

Set the API key locally:
```bash
REMOVE_BG_API_KEY=your_key npx wrangler pages dev .
```

## License

MIT
