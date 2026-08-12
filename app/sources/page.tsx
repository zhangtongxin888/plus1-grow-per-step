import { PageHero } from "../_components/PageHero";
import { GuideNextRail } from "../_components/GuideNextRail";
import { LAST_CHECKED, OFFICIAL_GAME_URL, createPageMetadata } from "../_lib/site";

const UNIVERSE_METADATA_URL = "https://develop.roblox.com/v1/universes/10372916746";
const PLACE_TO_UNIVERSE_URL = "https://apis.roblox.com/universes/v1/places/96142137828854/universe";
const UNIVERSE_PLACES_URL = "https://develop.roblox.com/v1/universes/10372916746/places?isUniverseCreation=false&limit=100&sortOrder=Asc";

export const metadata = createPageMetadata(
  "Sources & Verification",
  "See how +1 Grow Per Step Wiki verifies gameplay facts and handles changing or unconfirmed details.",
  "/sources",
);

export default function Sources() {
  return (
    <main id="main-content">
      <PageHero eyebrow="SOURCES" title="What is confirmed—and what is deliberately omitted." intro="A useful guide needs clear boundaries. We separate stable official mechanics from changing values and unsupported claims." tag={`LAST CHECKED: ${LAST_CHECKED.toUpperCase()}`} />
      <article className="article-section">
        <div className="shell article-layout">
          <nav className="article-nav" aria-label="Source sections"><strong>ON THIS PAGE</strong><a href="#official">Official source</a><a href="#confirmed">Confirmed facts</a><a href="#limits">Fact limits</a></nav>
          <div className="article-body">
            <section id="official">
              <h2>Primary source</h2>
              <p><a className="text-link" href={OFFICIAL_GAME_URL} target="_blank" rel="noreferrer">Official +1 Grow Per Step Roblox listing ↗</a></p>
              <p>The listing identifies the experience, creator Goobers HQ, current public title, and core description.</p>
              <div className="source-id-grid">
                <div><small>ROOT PLACE ID</small><strong>96142137828854</strong></div>
                <div><small>UNIVERSE ID</small><strong>10372916746</strong></div>
                <div><small>CREATOR GROUP ID</small><strong>1081649617</strong></div>
              </div>
              <ul className="source-api-list">
                <li><a className="text-link" href={PLACE_TO_UNIVERSE_URL} target="_blank" rel="noreferrer">Official place-to-universe API ↗</a></li>
                <li><a className="text-link" href={UNIVERSE_METADATA_URL} target="_blank" rel="noreferrer">Official universe metadata API ↗</a></li>
                <li><a className="text-link" href={UNIVERSE_PLACES_URL} target="_blank" rel="noreferrer">Official universe places API ↗</a></li>
              </ul>
            </section>
            <section id="confirmed">
              <h2>Mechanics confirmed there</h2>
              <ul><li>Walking grows the player with every step.</li><li>Upgrades and multipliers are part of progression.</li><li>Players become large enough to conquer gigantic walls.</li><li>Players can discover new areas and collect valuable crystals.</li><li>Rebirth multiplies growth.</li><li>Growth continues offline.</li></ul>
            </section>
            <section id="limits">
              <h2>What we do not guess</h2>
              <p>The public listing does not establish exact upgrade costs, wall thresholds, crystal uses, offline growth rate, rebirth requirements, code redemption, or every update reward. Those details can change and should be read from the current in-game interface.</p>
              <p className="callout">Advice on this wiki is framed as strategy only when it follows directly from confirmed mechanics. No unsupported values are presented as facts.</p>
            </section>
            <GuideNextRail links={[
              { eyebrow: "START", title: "Beginner tutorial", href: "/beginner-guide" },
              { eyebrow: "APPLY", title: "Progression route", href: "/progression" },
              { eyebrow: "ANSWER", title: "FAQ", href: "/faq" },
            ]} />
          </div>
        </div>
      </article>
    </main>
  );
}
