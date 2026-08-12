export function FactBadge({ type }: { type: "confirmed" | "strategy" }) {
  return (
    <span className={`fact-badge ${type}`}>
      <span aria-hidden="true">{type === "confirmed" ? "✓" : "↗"}</span>
      {type === "confirmed" ? "Confirmed system" : "Practical strategy"}
    </span>
  );
}
