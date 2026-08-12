import { LAST_CHECKED, OFFICIAL_GAME_URL } from "../_lib/site";

export function SourceNote() {
  return (
    <section className="source-note">
      <div className="shell source-grid">
        <span className="source-stamp">CHECKED<br />{LAST_CHECKED.toUpperCase()}</span>
        <div>
          <p className="eyebrow dark">FACT POLICY</p>
          <h2>Verified mechanics. No invented numbers.</h2>
          <p>
            The official game listing confirms walking-based growth, upgrades and multipliers,
            gigantic walls, crystals, new areas, rebirths, and offline growth. Exact costs,
            thresholds, menus, and update-specific rewards can change, so we do not guess them.
          </p>
        </div>
        <div className="source-links">
          <a href={OFFICIAL_GAME_URL} target="_blank" rel="noreferrer">Official listing ↗</a>
          <a href="/sources">How we verify →</a>
        </div>
      </div>
    </section>
  );
}
