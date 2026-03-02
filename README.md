# The-Archive Website

Static GitHub Pages website for the Archivist Discord bot.

## Pages

- `index.html` (landing)
- `commands.html`
- `faq.html`
- `contact.html`
- `privacy.html`
- `terms.html`
- `404.html`

## Shared assets

- `assets/css/styles.css`
- `assets/js/site-config.js`
- `assets/js/main.js`

## Configure before production

Edit `assets/js/site-config.js` and fill:

- `links.inviteUrl`
- `links.supportServerUrl`
- `links.githubRepoUrl`
- `legal.legalEntityName`
- `legal.contactEmail`
- `legal.postalAddress`
- `legal.dpoEmail`
- `legal.jurisdiction`
- `legal.lastUpdated.privacy`
- `legal.lastUpdated.terms`

If link fields are empty, buttons render in a disabled state with a "coming soon" tooltip.

## Local preview

From this repository root:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080/`.

## GitHub Pages deployment notes

This repo is expected to be published as a project site:

- Repository: `CrypticCode97/The-Archive`
- URL shape: `https://crypticcode97.github.io/The-Archive/`

All links/assets are relative so the site works for both local preview and project-page hosting.
