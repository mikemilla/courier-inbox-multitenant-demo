// Demo config — a multi-tenant Courier Inbox.
//
// ONE user, ONE JWT, FOUR tenants. Each tab in the app re-runs signIn() with a
// different `tenantId`; the SDK applies it as an `accountId` filter, so each tab
// shows only that tenant's messages.
//
// A JWT is tenant-INDEPENDENT — the same token works for every tenant, you only
// swap `tenantId`. In production you fetch this JWT from your backend (see
// token-server.mjs). For this pull-and-run demo it's pre-minted with a long TTL.
export const CONFIG = {
  userId: "multitenant-demo-user",

  // Pre-minted JWT for `userId` (valid 120 days). Decode at jwt.io: `tenant_scope`
  // is the environment and `tenant_id` is the workspace — both baked in by the API
  // key that minted it, NOT by the `tenantId` below. Getting THIS wrong (wrong
  // env/workspace) is what makes the SDK return 0 messages while curl returns N.
  jwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZSI6InVzZXJfaWQ6bXVsdGl0ZW5hbnQtZGVtby11c2VyIGluYm94OnJlYWQ6bWVzc2FnZXMgaW5ib3g6d3JpdGU6ZXZlbnRzIHJlYWQ6cHJlZmVyZW5jZXMgd3JpdGU6cHJlZmVyZW5jZXMgcmVhZDpicmFuZHMiLCJ0ZW5hbnRfc2NvcGUiOiJwdWJsaXNoZWQvZW52XzAxa3lhanptMWRmcWFhOGZlampzbmpmMnBoIiwidGVuYW50X2lkIjoid3JrXzAxa3lhanpqdzdlc2pyeTN4OTZuaHRmam50L2Vudl8wMWt5YWp6bTFkZnFhYThmZWpqc25qZjJwaCIsImlhdCI6MTc4NDkxODY0MywiZXhwIjoxNzk1Mjg2NjQzLCJqdGkiOiJkMDc4YTJmOC01YjUwLTQ1YWYtOWYyMy1mM2Q3YzU0YjNjOGIifQ.JPvJbMZFwafGXSlV81mMlHR7EoUL9mvLdcI647to7lE",

  // The 4 tenants. `id` is the Courier tenant_id (== accountId filter); `name` is the tab label.
  tenants: [
    { id: "acme", name: "Acme Corp" },
    { id: "globex", name: "Globex" },
    { id: "initech", name: "Initech" },
    { id: "umbrella", name: "Umbrella Inc" },
  ],
};
