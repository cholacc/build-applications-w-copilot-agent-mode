# Build Applications with GitHub Copilot Agent Mode

<img src="https://octodex.github.com/images/Professortocat_v2.png" align="right" height="200px" />

Hey cholacc!

Mona here. I'm done preparing your exercise. Hope you enjoy! 💚

Remember, it's self-paced so feel free to take a break! ☕️

[![](https://img.shields.io/badge/Go%20to%20Exercise-%E2%86%92-1f883d?style=for-the-badge&logo=github&labelColor=197935)](https://github.com/cholacc/build-applications-w-copilot-agent-mode/issues/1)

## Backend: Codespaces & Local Development

The backend API runs on port 8000 and supports both GitHub Codespaces and local development.

- Codespaces URL pattern: `https://$CODESPACE_NAME-8000.app.github.dev`
- Local URL: `http://localhost:8000`

Environment variables (see `octofit-tracker/backend/.env.example`):

- `MONGO_URI` — MongoDB connection string (e.g. `mongodb://127.0.0.1:51430/`)
- `DB_NAME` — optional database name used by the app (defaults to `octofit_db`)
- `CODESPACE_NAME` — automatically set in Codespaces; used to construct the Codespaces hostname
- `NODE_ENV` — `development` or `production`

Quick commands (from repository root on Windows cmd):

```cmd
REM Start in-memory MongoDB (dev)
npm --prefix octofit-tracker/backend run mongo:start

REM Start backend in dev mode (ts-node-dev) — set MONGO_URI from .mongo_uri
set /p MONGO_URI=<octofit-tracker/backend/.mongo_uri && npm --prefix octofit-tracker/backend run dev

REM Seed database
set /p MONGO_URI=<octofit-tracker/backend/.mongo_uri && npm --prefix octofit-tracker/backend run seed

REM Verify endpoints
curl -i http://localhost:8000/api/users
curl -i http://localhost:8000/api/activities
```

If you want the backend to respect a custom `PORT` environment variable, update `octofit-tracker/backend/src/index.ts` accordingly.

## Frontend: Vite environment variable

The frontend expects a Vite environment variable named `VITE_CODESPACE_NAME` when running in Codespaces. This is used to construct backend API URLs of the form:

```
https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/
```

If `VITE_CODESPACE_NAME` is not set the frontend falls back to `http://localhost:8000/api/[component]/` to keep local development working. You can define `VITE_CODESPACE_NAME` in `.env.local` at the `octofit-tracker/frontend` folder (for example `VITE_CODESPACE_NAME=my-codespace`).

