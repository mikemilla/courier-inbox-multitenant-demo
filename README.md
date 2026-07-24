# Courier Inbox — multi-tenant demo (React)

A tiny, runnable example of a **multi-tenant [Courier Inbox](https://www.courier.com/docs/platform/inbox/inbox-overview)** rendered with
[`@trycourier/courier-react`](https://www.courier.com/docs/platform/tenants/inbox-with-tenants).

- One user, one JWT, four tenants — each tab re-runs `signIn()` with a different `tenantId`.
- The **Raw** tab signs in with no `tenantId` and shows the user's whole feed.
- The left side is a step-by-step guide (curl + React) for wiring this up in your own workspace.

## Run it

No build, no install, no API key. Just serve the folder:

```bash
python3 -m http.server 8790
```

Then open **http://localhost:8790**.

> Any static file server works (e.g. `npx serve`). The demo ships with a pre-minted,
> read-only token scoped to one demo user, so it renders immediately.

## What's in here

| File | What it is |
|------|------------|
| `index.html` | The guide + the live React inbox |
| `config.js` | The demo user, the pre-minted JWT, and the 4 tenants |
| `seed.sh` | Recreate the tenants + messages in **your** workspace: `COURIER_API_KEY=<key> ./seed.sh` |
| `token-server.mjs` | Reference backend token endpoint (`COURIER_API_KEY=<key> node token-server.mjs`) |

## Point it at your own workspace

1. Follow the steps in the page: create a tenant → add the user → send a scoped message → mint a JWT.
2. Paste your minted JWT into `jwt` in `config.js` (and update `userId` / `tenants`).

Full walkthrough: [Inbox with tenants](https://www.courier.com/docs/platform/tenants/inbox-with-tenants).

> The bundled token is scoped to a single demo user and expires ~120 days after it was minted.
> Re-mint anytime with `seed.sh` or your backend.
