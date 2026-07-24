// Demo config — edit these to point at your own workspace.
//
// ONE user, ONE JWT, FOUR tenants. The JWT is tenant-independent: the same token
// works for every tab; only `tenantId` changes at signIn(). This one is pre-minted,
// read-only, and scoped to the demo user (~120-day expiry).
//
// In production you never hardcode the JWT — you fetch it from your backend, which
// mints it with your Courier API key. Never ship your API key to the browser.

export const USER_ID = "multitenant-demo-user";

export const JWT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZSI6InVzZXJfaWQ6bXVsdGl0ZW5hbnQtZGVtby11c2VyIGluYm94OnJlYWQ6bWVzc2FnZXMgaW5ib3g6d3JpdGU6ZXZlbnRzIHJlYWQ6cHJlZmVyZW5jZXMgd3JpdGU6cHJlZmVyZW5jZXMgcmVhZDpicmFuZHMiLCJ0ZW5hbnRfc2NvcGUiOiJwdWJsaXNoZWQvZW52XzAxa3lhanptMWRmcWFhOGZlampzbmpmMnBoIiwidGVuYW50X2lkIjoid3JrXzAxa3lhanpqdzdlc2pyeTN4OTZuaHRmam50L2Vudl8wMWt5YWp6bTFkZnFhYThmZWpqc25qZjJwaCIsImlhdCI6MTc4NDkxODY0MywiZXhwIjoxNzk1Mjg2NjQzLCJqdGkiOiJkMDc4YTJmOC01YjUwLTQ1YWYtOWYyMy1mM2Q3YzU0YjNjOGIifQ.JPvJbMZFwafGXSlV81mMlHR7EoUL9mvLdcI647to7lE";

export const TENANTS = [
  { id: "acme", name: "Acme Corp" },
  { id: "globex", name: "Globex" },
  { id: "initech", name: "Initech" },
  { id: "umbrella", name: "Umbrella Inc" },
];
