import type { ReactNode } from "react";
import { FactBadge } from "./FactBadge";

export function GuideStep({
  id,
  number,
  title,
  action,
  why,
  success,
  type = "strategy",
  children,
}: {
  id: string;
  number: string;
  title: string;
  action: string;
  why: string;
  success: string;
  type?: "confirmed" | "strategy";
  children?: ReactNode;
}) {
  return (
    <section className="guide-step" id={id}>
      <div className="guide-step-head">
        <span className="guide-step-number">{number}</span>
        <div>
          <FactBadge type={type} />
          <h2>{title}</h2>
        </div>
      </div>
      <div className="guide-step-grid">
        <div><small>ACTION</small><p>{action}</p></div>
        <div><small>WHY</small><p>{why}</p></div>
        <div className="success-signal"><small>SUCCESS CHECK</small><p>{success}</p></div>
      </div>
      {children}
    </section>
  );
}
