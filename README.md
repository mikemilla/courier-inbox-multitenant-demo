# Courier Inbox — multi-tenant demo (React + Vite)

A small React app showing a **multi-tenant [Courier Inbox](https://www.courier.com/docs/platform/inbox/inbox-overview)**
rendered with [`@trycourier/courier-react`](https://www.courier.com/docs/platform/tenants/inbox-with-tenants).

- One user, one JWT, four tenants — each tab re-runs `signIn()` with a different `tenantId`.
- The **No Tenant** tab signs in with no `tenantId` and shows the user's whole feed.
- A step-by-step guide (curl + React) sits alongside the live inbox.

## Run it

```bash
npm install
npm run dev
```

Then open the URL Vite prints (**http://localhost:5173**). A read-only demo token is
bundled, so it just works.

## The important file

[`src/Inbox.jsx`](src/Inbox.jsx) is the whole integration — tabs + `signIn()` + `<CourierInbox />`.
Copy it into your app and swap in your own values.

## Point it at your own workspace

1. Follow the on-page steps: create a tenant → add the user → send a scoped message → mint a JWT.
2. Edit [`src/config.js`](src/config.js): set `USER_ID`, paste your minted `JWT`, and list your `TENANTS`.

> Never ship your API key to the browser — mint short-lived JWTs on your backend.
> The bundled token is scoped to one demo user and expires ~120 days after it was minted.
