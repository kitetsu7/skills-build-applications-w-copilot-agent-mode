# OctoFit Frontend

This presentation tier uses React 19, Vite, and react-router-dom.

## Environment Variable

Define `VITE_CODESPACE_NAME` for Codespaces API routing.

Example in `.env.local`:

```bash
VITE_CODESPACE_NAME=your-codespace-name
```

When set, the app calls backend endpoints under:

`https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/`

If `VITE_CODESPACE_NAME` is not set, the app safely falls back to:

`http://localhost:8000/api/[component]/`
