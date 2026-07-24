import { useState } from "react";
import Inbox from "./Inbox.jsx";

const KEY = "YOUR_ENV_API_KEY";

// The setup guide, rendered as a numbered stepper on the left.
const STEPS = [
  {
    n: 1,
    title: "Create the tenant",
    desc: "A tenant is the org/workspace a message is scoped to. Create it first — you can't scope to a tenant that doesn't exist.",
    gotcha: "Must exist before you send",
    code: `curl -X PUT https://api.courier.com/tenants/acme \\
  -H "Authorization: Bearer ${KEY}" \\
  -H "Content-Type: application/json" \\
  -d '{"name":"Acme Corp"}'`,
    docHref: "https://www.courier.com/docs/api-reference/tenants/create-or-replace-a-tenant",
    consoleHref: "https://app.courier.com/directory/tenants",
    consoleLabel: "Console: Tenants",
  },
  {
    n: 2,
    title: "Add the user to the tenant",
    desc: "Create the membership so the user can receive this tenant's notifications. (Creates the user profile if it doesn't exist yet.)",
    gotcha: "User must be a tenant member",
    code: `curl -X PUT https://api.courier.com/users/multitenant-demo-user/tenants/acme \\
  -H "Authorization: Bearer ${KEY}" \\
  -H "Content-Type: application/json" \\
  -d '{}'`,
    docHref: "https://www.courier.com/docs/api-reference/user-tenants/add-a-user-to-a-single-tenant",
    consoleHref: "https://app.courier.com/directory/tenants",
    consoleLabel: "Console: Tenants",
  },
  {
    n: 3,
    title: "Send a tenant-scoped inbox message",
    desc: "Put the tenant in to.context.tenant_id and route to the inbox channel. That tenant_id is what the inbox stores as accountId.",
    gotcha: "Scope via to.context.tenant_id",
    code: `curl -X POST https://api.courier.com/send \\
  -H "Authorization: Bearer ${KEY}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "message": {
      "to": { "user_id": "multitenant-demo-user", "context": { "tenant_id": "acme" } },
      "content": { "title": "Welcome to Acme Corp", "body": "Your Acme inbox is live." },
      "routing": { "method": "single", "channels": ["inbox"] }
    }
  }'`,
    docHref: "https://www.courier.com/docs/api-reference/send/send-a-message",
    consoleHref: "https://app.courier.com/logs/messages",
    consoleLabel: "Console: Message logs",
  },
  {
    n: 4,
    title: "Mint a JWT for the user (backend)",
    desc: "The browser authenticates with a short-lived JWT, not your API key. Mint it server-side. The token is tenant-independent — one token works for every tab.",
    gotcha: "Never expose the API key client-side",
    code: `curl -X POST https://api.courier.com/auth/issue-token \\
  -H "Authorization: Bearer ${KEY}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "scope": "user_id:multitenant-demo-user inbox:read:messages inbox:write:events",
    "expires_in": "1h"
  }'`,
    docHref: "https://www.courier.com/docs/api-reference/authentication/create-a-jwt",
    consoleHref: "https://app.courier.com/settings/api-keys",
    consoleLabel: "Console: API keys",
  },
  {
    n: 5,
    title: "Render the inbox in React",
    desc: "Render <CourierInbox/> and sign in with useCourier().shared.signIn, passing the JWT + the same tenantId you sent with. Omit tenantId for the raw feed. See src/Inbox.jsx — it's the whole integration.",
    gotcha: "tenantId must match the sent tenant_id",
    code: `import { useEffect } from "react";
import { CourierInbox, useCourier } from "@trycourier/courier-react";

function Inbox({ jwt }) {
  const courier = useCourier();

  useEffect(() => {
    courier.shared.signIn({
      userId: "multitenant-demo-user",
      jwt,               // minted by your backend (step 4)
      tenantId: "acme",  // omit for the raw feed (all tenants)
    });
  }, [jwt]);

  return <CourierInbox />;
}`,
    docHref: "https://www.courier.com/docs/platform/tenants/inbox-with-tenants",
  },
];

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      className="copy"
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1200);
      }}
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}

function Step({ step }) {
  return (
    <li className="step">
      <div className="num">{step.n}</div>
      <h3>{step.title}</h3>
      <p className="desc">{step.desc}</p>
      <span className="gotcha">{step.gotcha}</span>
      <div className="code">
        <CopyButton text={step.code} />
        <pre>
          <code>{step.code}</code>
        </pre>
      </div>
      <div className="doclink">
        <a href={step.docHref} target="_blank" rel="noopener">
          API reference →
        </a>
        {step.consoleHref && (
          <>
            {" · "}
            <a href={step.consoleHref} target="_blank" rel="noopener">
              {step.consoleLabel} ↗
            </a>
          </>
        )}
      </div>
    </li>
  );
}

export default function App() {
  return (
    <>
      <header>
        <h1>Courier Inbox — multi-tenant guide (React)</h1>
        <p>
          Send a tenant-scoped inbox message with the REST API, then render it with{" "}
          <code>@trycourier/courier-react</code>. Replace <code>YOUR_ENV_API_KEY</code> with your
          environment's API key. The live inbox on the right is signed in as{" "}
          <code>multitenant-demo-user</code> — switch tabs to change the tenant.
        </p>
      </header>

      <div className="layout">
        <div className="guide-col">
          <div className="gotchas">
            <h2>⚠️ Gotchas (the stuff that trips everyone up)</h2>
            <ul>
              <li>
                <b>The tenant must exist</b> — create it with <code>PUT /tenants/{"{id}"}</code>{" "}
                before you scope anything to it.
              </li>
              <li>
                <b>The user must be a member of the tenant</b> —{" "}
                <code>PUT /users/{"{id}"}/tenants/{"{id}"}</code>.
              </li>
              <li>
                Scope the send with <code>to.context.tenant_id</code> —{" "}
                <b>that value becomes the inbox <code>accountId</code></b> the SDK filters on.
              </li>
              <li>
                The <code>tenantId</code> you pass to <code>signIn()</code> must{" "}
                <b>exactly match</b> the <code>tenant_id</code> you sent with.
              </li>
              <li>
                Never ship your API key to the browser — mint a short-lived <b>JWT</b> on your
                backend and pass that to <code>signIn()</code>.
              </li>
            </ul>
          </div>

          <ol className="steps">
            {STEPS.map((step) => (
              <Step key={step.n} step={step} />
            ))}
          </ol>
        </div>

        <Inbox />
      </div>
    </>
  );
}
