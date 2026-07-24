# Courier Inbox — multi-tenant demo (React)

A tiny, single-file example of a **multi-tenant [Courier Inbox](https://www.courier.com/docs/platform/inbox/inbox-overview)** rendered with
[`@trycourier/courier-react`](https://www.courier.com/docs/platform/tenants/inbox-with-tenants).

- One user, one JWT, four tenants — each tab re-runs `signIn()` with a different `tenantId`.
- The **Raw** tab signs in with no `tenantId` and shows the user's whole feed.
- The left side is a step-by-step guide (curl + React) for wiring this up in your own workspace.

## Run it

**Just open `index.html`** — double-click it, or drag it into a browser. No install, no
build, no server, no API key. React and `@trycourier/courier-react` load from a CDN, and a
read-only demo JWT is baked in, so it renders immediately.

_(If your browser is strict about opening local files, serve the folder instead:
`python3 -m http.server` then open http://localhost:8000.)_

## What's in here

| File | What it is |
|------|------------|
| `index.html` | The whole thing — the guide + the live React inbox, token inlined |
| `token-server.mjs` | Reference backend token endpoint for production (`COURIER_API_KEY=<key> node token-server.mjs`) |

## Point it at your own workspace

1. Follow the steps in the page: create a tenant → add the user → send a scoped message → mint a JWT.
2. In `index.html`, edit the `CONFIG` object near the bottom — set `userId`, paste your minted `jwt`, and list your `tenants`.

Full walkthrough: [Inbox with tenants](https://www.courier.com/docs/platform/tenants/inbox-with-tenants).

> The bundled token is scoped to a single demo user and expires ~120 days after it was minted.
> Never ship your API key to the browser — mint short-lived JWTs on your backend (`token-server.mjs`).
