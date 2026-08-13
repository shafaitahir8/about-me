# Shafai Tahir — HubSpot Developer Portfolio

A responsive, accessible personal portfolio built with plain HTML, CSS, and JavaScript. The project has no package manager, build process, framework, or server dependency and can be deployed directly to GitHub Pages.

## Project files

```text
shafai-tahir-portfolio/
├── .github/
│   └── workflows/
│       └── deploy-pages.yml
├── .gitignore
├── .nojekyll
├── index.html
├── styles.css
├── script.js
└── README.md
```

## Run locally

You can open `index.html` directly in a browser. For the most reliable local preview, start a basic static server from this directory:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Create the GitHub repository

1. Create an empty repository on GitHub.
2. Extract this ZIP and open a terminal inside the `shafai-tahir-portfolio` folder.
3. Run:

```bash
git init
git add .
git commit -m "Initial portfolio site"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

Replace `YOUR-USERNAME` and `YOUR-REPOSITORY` with your repository details.

## Deploy to GitHub Pages

The included workflow deploys the site automatically without a build step.

1. Open the repository on GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, select **GitHub Actions** as the source.
4. Push to the `main` branch, or open **Actions → Deploy portfolio to GitHub Pages → Run workflow**.
5. GitHub will display the published URL when deployment finishes.

### Alternative: deploy from the branch

You can instead choose **Deploy from a branch** in the Pages settings, then select `main` and `/ (root)`. The site files are already structured for this method.

## Customize before publishing

- Add your real contact email to `data-contact-email` on the contact form in `index.html`.
- Add verified social and project links only when they are ready to be public.
- Update the copyright year or portfolio copy directly in `index.html`.
- Change the Graphite palette through the custom properties at the top of `styles.css`.

## Technology

- Semantic HTML5
- Modern CSS with custom properties, Grid, and Flexbox
- Vanilla JavaScript
- Google Fonts and Lucide icons loaded from public CDNs
- No npm, Node.js, framework, or compilation required

## Browser support

The site targets current versions of Chrome, Edge, Firefox, and Safari. It includes keyboard focus states, reduced-motion handling, responsive navigation, and accessible form labeling.
