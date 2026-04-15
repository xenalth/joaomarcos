# Astro Starter Kit: Minimal

```sh
npm create astro@latest -- --template minimal
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

## Analytics (GA4)

This project supports Google Analytics 4 through an environment variable.

1. Copy `.env.example` to `.env`.
2. Set `PUBLIC_GA_MEASUREMENT_ID` with your GA4 Measurement ID (example: `G-XXXXXXXXXX`).
3. Build/deploy normally.

Notes:
- Analytics is only injected in production builds.
- If `PUBLIC_GA_MEASUREMENT_ID` is empty, analytics is not loaded.

### Custom Events

Event naming convention:
- `nav_*` for navigation interactions
- `article_*` for article page interactions

Default params sent with all custom events:
- `page_path`
- `page_lang`

Tracked events:
- `nav_language_switch_click`
	- Params: `from_lang`, `to_lang`, `location`
- `article_back_to_list_click`
	- Params: `article_slug`, `article_lang`, `location`
- `article_share_linkedin_click`
	- Params: `article_slug`, `article_lang`, `location`
- `article_share_native_click`
	- Params: `article_slug`, `article_lang`, `location`
- `article_share_native_success`
	- Params: `article_slug`, `article_lang`, `location`
- `article_share_native_cancel`
	- Params: `article_slug`, `article_lang`, `location`
- `article_share_copy_link`
	- Params: `article_slug`, `article_lang`, `location`
