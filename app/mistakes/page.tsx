import { GuideNextRail } from "../_components/GuideNextRail";
import { PageHero } from "../_components/PageHero";
import { SourceNote } from "../_components/SourceNote";
import { createPageMetadata } from "../_lib/site";

export const metadata = createPageMetadata(
  "+1 Grow Per Step Common Mistakes",
  "Fix wall stalls, unclear upgrade choices, rushed rebirths, wasted offline returns, and unverified advice in +1 Grow Per Step.",
  "/mistakes",
);

const mistakes = [
  { id: "wall-stall", title: "Repeating a failed wall with no change", symptom: "You hit the same wall again and again without progress.", cause: "The attempt is being repeated before growth or another relevant state changes.", fix: "Return to walking, make one useful improvement, then retest once.", href: "/beginner-guide#first-wall", related: "Review the wall checkpoint" },
  { id: "upgrade-spread", title: "Changing several upgrades at once", symptom: "Several options change, but you cannot tell why the route is still slow.", cause: "Too many variables changed to identify the actual bottleneck.", fix: "Change one relevant option, repeat a familiar route, and compare the outcome.", href: "/progression#upgrades", related: "Use the upgrade rule" },
  { id: "early-rebirth", title: "Rebirthing only because it is available", symptom: "You use rebirth without understanding the current benefit or other shown changes.", cause: "Availability was treated as proof that rebirth is useful right now.", fix: "Wait for a clear slowdown and read the current benefit and effects shown by the game before deciding.", href: "/progression#rebirth", related: "Run the rebirth check" },
  { id: "offline-reset", title: "Acting before checking offline growth", symptom: "You return and immediately change another major system.", cause: "The result gained while away was never inspected or tested.", fix: "Read the current result, test the next checkpoint, then decide.", href: "/beginner-guide#offline", related: "Use the return check" },
  { id: "fake-numbers", title: "Trusting unsupported costs or codes", symptom: "A guide claims exact values or codes that do not match the current game.", cause: "Changing or unconfirmed details were presented as stable facts.", fix: "Use current in-game labels for values. This wiki publishes no guessed codes or cost tables.", href: "/sources#limits", related: "See what we do not guess" },
];

export default function Mistakes() {
  return (
    <main id="main-content">
      <PageHero eyebrow="COMMON MISTAKES" title="Find the stalled loop. Change one thing." intro="A useful diagnosis separates the symptom from its likely cause, then gives you one next action to test." tag="SYMPTOM → CAUSE → FIX → RECHECK" />
      <article className="article-section">
        <div className="shell article-layout">
          <nav className="article-nav" aria-label="Mistake sections"><strong>JUMP TO</strong>{mistakes.map((item) => <a href={`#${item.id}`} key={item.id}>{item.title}</a>)}</nav>
          <div className="article-body mistakes-list">
            {mistakes.map((item, index) => (
              <section className="mistake-card" id={item.id} key={item.id}>
                <p className="mistake-index">MISTAKE 0{index + 1}</p>
                <h2>{item.title}</h2>
                <div className="mistake-grid">
                  <div><small>SYMPTOM</small><p>{item.symptom}</p></div>
                  <div><small>LIKELY CAUSE</small><p>{item.cause}</p></div>
                  <div className="mistake-fix"><small>FIX</small><p>{item.fix}</p></div>
                </div>
                <a className="inline-related" href={item.href}>{item.related} →</a>
              </section>
            ))}
            <GuideNextRail links={[
              { eyebrow: "RETURN", title: "Beginner tutorial", href: "/beginner-guide" },
              { eyebrow: "REVIEW", title: "Progression route", href: "/progression" },
              { eyebrow: "NEXT", title: "FAQ", href: "/faq" },
            ]} />
          </div>
        </div>
      </article>
      <SourceNote />
    </main>
  );
}
