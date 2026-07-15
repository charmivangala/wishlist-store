# Field & Fold — Wishlist Storefront

A small e-commerce demo (React + Vite + Tailwind) with a multi-list wishlist
feature, including merging two lists with de-duplication. No backend —
everything persists to `localStorage`.

## Run locally in VS Code

```bash
npm install
npm run dev
```

Open the printed local URL (usually `http://localhost:5173`).

## Project structure

```
wishlist-store/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── src/
│   ├── main.jsx                  # React root, HashRouter
│   ├── App.jsx                   # routes + shared toast/wishlist state
│   ├── index.css                 # Tailwind directives + tiny animations
│   ├── data/
│   │   └── products.js           # 12 sample products
│   ├── utils/
│   │   ├── storage.js            # localStorage read/write helpers
│   │   ├── wishlist.js           # pure merge logic (de-duplicated union)
│   │   └── useWishlists.js       # hook: all wishlist state + mutations
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Toast.jsx
│   │   ├── Modal.jsx
│   │   ├── ProductCard.jsx
│   │   ├── WishlistPickerModal.jsx
│   │   └── MergeModal.jsx
│   └── pages/
│       ├── Home.jsx              # product grid, heart-icon toggle
│       └── Wishlist.jsx          # list overview, detail view, merge trigger
└── .github/workflows/deploy.yml  # optional auto-deploy on push to main
```

## Data shapes

```js
// Product
{ id: 'p01', name: 'Canvas Field Tote', price: 48, category: 'Bags', image: '...' }

// Wishlist
{ id: 'wl_...', name: 'Weekend Trip', items: ['p01', 'p07'] } // items = product ids
```

Wishlists are stored as a single array under the `wishlist-store:wishlists`
localStorage key (see `src/utils/storage.js`).

## Behavior notes (matching the spec)

- **Heart icon on a product card**: if the product isn't saved anywhere yet,
  a modal lets you pick an existing wishlist or create a new one on the spot.
  If it's already saved in a list, clicking the heart again removes it.
- **Duplicate guard**: adding a product that's already in the target list
  shows a toast — "This product already exists in that list" — instead of
  adding it twice.
- **Merging**: on the Wishlists page, the "Merge lists" button (bottom right)
  opens a picker for two *different* lists. Picking the same list twice shows
  "Select two different lists for merging". The result is a brand-new list
  whose items are the de-duplicated union of both — an empty list merged with
  a populated one just yields the populated one's items, and two empty lists
  merge into an empty list.
- **Rename / delete**: available inline on each wishlist row in the overview.

## Deploying to GitHub Pages

1. Create a new GitHub repo and note its exact name.
2. In `vite.config.js`, set `base: '/your-repo-name/'` to match.
3. Push this project to the repo's `main` branch.
4. In the repo settings → **Pages**, set the source to **GitHub Actions**.
   The included workflow (`.github/workflows/deploy.yml`) will build and
   deploy automatically on every push to `main`.

Alternatively, deploy manually with the `gh-pages` package already listed in
`package.json`:

```bash
npm run deploy
```

This runs `vite build` then pushes the `dist` folder to a `gh-pages` branch.
(First run `npm install` if you haven't already, and make sure git is
configured with a remote pointing at your GitHub repo.)

## Notes / things you may want to swap

- Product images point to Unsplash source URLs for the demo — replace with
  your own hosted images for production.
- `HashRouter` is used (URLs look like `#/wishlists`) specifically so routing
  works on GitHub Pages without extra server-side rewrite rules.
