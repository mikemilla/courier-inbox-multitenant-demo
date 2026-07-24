import { useEffect, useState } from "react";
import { CourierInbox, useCourier } from "@trycourier/courier-react";
import { USER_ID, JWT, TENANTS } from "./config.js";

// One tab per tenant, plus a "No Tenant" tab (no tenantId → the user's whole feed).
const TABS = [...TENANTS, { id: undefined, name: "No Tenant" }];

/**
 * A multi-tenant Courier Inbox. Switching tabs re-runs signIn() with a different
 * `tenantId`, and the SDK scopes the inbox to that tenant. This is the whole
 * integration — copy it into your app and swap in your own userId / jwt / tenants.
 */
export default function Inbox() {
  const courier = useCourier();
  const [active, setActive] = useState(TABS[0]);

  useEffect(() => {
    courier.shared.signIn({
      userId: USER_ID,
      jwt: JWT,
      tenantId: active.id, // undefined on "No Tenant" → no tenant filter
    });
  }, [active]);

  const activeKey = active.id ?? "no-tenant";

  return (
    <div className="inbox-col">
      <div className="col-label">Live inbox · @trycourier/courier-react</div>

      <div className="cx-tabs" role="tablist">
        {TABS.map((tenant) => {
          const key = tenant.id ?? "no-tenant";
          return (
            <button
              key={key}
              className="cx-tab"
              role="tab"
              aria-selected={key === activeKey}
              onClick={() => setActive(tenant)}
            >
              {tenant.name}
            </button>
          );
        })}
      </div>

      <div className="inbox-wrap">
        <CourierInbox />
      </div>
    </div>
  );
}
