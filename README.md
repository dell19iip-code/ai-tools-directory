# AI Atlas — AI Tools Directory

A simple, modern, responsive AI tools directory built with plain HTML, CSS and JavaScript.

## Run locally

No build step or package manager is required.

### Option 1 — Open directly
Double-click `index.html` and it will open in your browser.

### Option 2 — Local server
If you have Python installed:

```bash
python -m http.server 8000
```

Then visit:

http://localhost:8000

## Customize

Edit the `tools` array in `script.js` to add, remove, or change tools.

Each tool has:
- `name`
- `category`
- `icon`
- `desc`
- `badge`
- `url`

The site includes:
- Responsive layout
- Search
- Category filters
- A–Z sorting
- Keyboard shortcut (`Ctrl/Cmd + K`)
- Tool cards with external links
- Mobile-friendly navigation and grid
