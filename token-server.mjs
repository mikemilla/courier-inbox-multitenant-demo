// Reference backend token endpoint — the Node equivalent of the customer's
// Python `courier_client.auth.issue_token(...)`.
//
// THE POINT OF THIS FILE: the JWT is minted here with COURIER_API_KEY. That key
// decides which workspace + environment the inbox reads from. If this key does
// not match the key that SENT the inbox messages, the SDK authenticates fine but
// reads an empty data source — exactly the "curl returns N, SDK returns 0" bug.
//
// Run:  COURIER_API_KEY=pk_prod_xxx node token-server.mjs
// Then: GET http://localhost:8787/token?user_id=inbox-demo-user

import { createServer } from "node:http";

const API_KEY = process.env.COURIER_API_KEY;
if (!API_KEY) {
  console.error("Set COURIER_API_KEY (the key for the SAME workspace+env that sent the messages).");
  process.exit(1);
}

const PORT = process.env.PORT || 8787;

createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  res.setHeader("Access-Control-Allow-Origin", "*");
  if (url.pathname !== "/token") { res.writeHead(404).end("not found"); return; }

  const userId = url.searchParams.get("user_id") || "inbox-demo-user";
  const scope = [
    `user_id:${userId}`,
    "inbox:read:messages",
    "inbox:write:events",
    "read:preferences",
    "write:preferences",
    "read:brands",
  ].join(" ");

  try {
    const r = await fetch("https://api.courier.com/auth/issue-token", {
      method: "POST",
      headers: { Authorization: `Bearer ${API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ scope, expires_in: "2 days" }),
    });
    const body = await r.text();
    res.writeHead(r.status, { "Content-Type": "application/json" }).end(body);
  } catch (e) {
    res.writeHead(500).end(JSON.stringify({ error: String(e) }));
  }
}).listen(PORT, () => console.log(`token server on http://localhost:${PORT}/token`));
