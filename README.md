# Wellposed — landing page

A small, self-contained static site derived from the three-slide pitch deck.
Bilingual (EN/DE), no build step, no dependencies, no third-party requests.

```
index.html        the page itself
impressum.html    imprint / Impressum (§ 5 DDG) with placeholder fields
styles.css        shared stylesheet
lang.js           EN/DE switching
screenshots/      drop the three product screenshots here
```

## Publishing on GitHub Pages

1. Push these files to the root of a repository (or into a `/docs` folder).
2. Repository → **Settings** → **Pages**.
3. Under *Build and deployment*, set **Source: Deploy from a branch**, pick your
   branch and either `/ (root)` or `/docs` to match where you put the files.
4. Save. The site appears at `https://<user>.github.io/<repo>/` within a minute
   or two.

No Jekyll configuration is needed — the files are plain HTML and are served
as-is.

## Adding the screenshots

Save the three images into `screenshots/` using exactly these names:

| File | What to capture |
|---|---|
| `1-requirements-chat.png` | The Requirements Engineer chat, mid-conversation |
| `2-model-and-code.png` | The Model & Code tab, spec next to generated code |
| `3-playground.png` | The Playground with sliders, sensitivity charts, scenarios |

Until a file exists, the page shows a dashed placeholder naming the expected
path — nothing breaks, and the layout stays intact. Landscape images at roughly
16:10 fit best. PNG is preferred for UI screenshots; keep each under ~400 KB.

## Changing the text

Every translatable string lives in the HTML as a pair of attributes:

```html
<h3 data-en="Define" data-de="Definieren">Define</h3>
```

`lang.js` swaps the visible text between them. To change wording, edit both
attributes — and the element's inner text too if you are changing the English,
since that is what shows before the script runs.

The initial language comes from `?lang=` in the URL, falling back to the
visitor's browser preference, falling back to English. The choice is carried
across internal links via the query string.

## Renaming the product

The name appears in: both `<title>` tags, the two `.brand` links, and the two
footer lines. Search for `Wellposed` and replace.

## Contact address

Three `mailto:hello@example.com` links (two footers, one call to action) need
replacing with a real address.

## A note on fonts and privacy

The page deliberately uses system font stacks rather than Google Fonts. Loading
fonts from Google's CDN transmits visitor IP addresses to Google, which the
Munich Regional Court found to be a GDPR violation in 2022
(LG München I, 3 O 17493/20). If you want a specific typeface, self-host the
files in this repository rather than linking to a CDN.

For the same reason there is no analytics, no cookie banner and no embedded
media. If you add any of those later, the privacy policy has to change with it.
