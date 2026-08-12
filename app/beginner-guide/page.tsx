import { FactBadge } from "../_components/FactBadge";
import { GuideNextRail } from "../_components/GuideNextRail";
import { GuideStep } from "../_components/GuideStep";
import { PageHero } from "../_components/PageHero";
import { SourceNote } from "../_components/SourceNote";
import { createPageMetadata } from "../_lib/site";

export const metadata = createPageMetadata(
  "+1 Grow Per Step Beginner Guide",
  "A practical first-session route for +1 Grow Per Step: walking, wall checks, upgrades, crystals, rebirths, and offline growth.",
  "/beginner-guide",
);

export default function BeginnerGuide() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="BEGINNER TUTORIAL"
        title="Plan your first session, step by step."
        intro="Follow a learning route built around confirmed systems. Ten minutes is a useful starting window, not a promise that every wall, area, or rebirth will unlock in that time."
        tag="ACTION → WHY → SUCCESS CHECK"
      />
      <article className="article-section tutorial-article">
        <div className="shell article-layout">
          <nav className="article-nav" aria-label="Guide sections">
            <strong>MISSION STEPS</strong>
            <a href="#baseline">Build a baseline</a>
            <a href="#first-wall">Test one wall</a>
            <a href="#upgrades">Check upgrades</a>
            <a href="#crystals">Explore new areas</a>
            <a href="#rebirth">Plan a rebirth</a>
            <a href="#offline">Return from offline</a>
          </nav>
          <div className="article-body">
            <section className="route-brief" aria-labelledby="route-brief-title">
              <p className="eyebrow dark">BEFORE YOU MOVE</p>
              <h2 id="route-brief-title">Pick one wall as your measuring stick.</h2>
              <p>Do not try to clear the whole game in one session. Your first useful goal is to learn how a short walk changes your character, then compare that change against one nearby wall.</p>
              <div className="route-brief-grid">
                <div><small>OBSERVE</small><strong>What does one normal walking loop change?</strong></div>
                <div><small>TEST</small><strong>Does the same wall respond differently?</strong></div>
                <div><small>DECIDE</small><strong>Walk, improve, explore, or inspect rebirth?</strong></div>
              </div>
            </section>
            <aside className="guide-fact-intro">
              <FactBadge type="confirmed" />
              <p>The official description confirms walking growth, upgrades and multipliers, walls, new areas, crystals, rebirth, and offline growth. The route below is practical strategy built from those systems.</p>
            </aside>

            <GuideStep id="baseline" number="01" title="Build a normal-growth baseline" action="Walk a short, easy loop and watch how your character changes." why="The official description says movement grows your character. Starting with a plain loop gives later decisions a useful comparison." success="You know what one normal loop accomplishes before changing another system." />

            <GuideStep id="first-wall" number="02" title="Turn one wall into a checkpoint" action="Try the next reachable wall once. If it stops you, go back to growing before another attempt." why="The game confirms walls as challenges for a large-enough character. A repeated attempt without a changed state teaches you nothing new." success="Every retry follows a real change in growth, size, or the current options shown in game.">
              <a className="inline-related" href="/mistakes#wall-stall">If the wall still stops you, fix the wall stall →</a>
            </GuideStep>

            <GuideStep id="upgrades" number="03" title="Improve one bottleneck" action="Read the current upgrade and multiplier labels, choose one relevant option, then repeat the same route." why="Upgrades and multipliers are confirmed, but their names, prices, and exact effects are not fixed in the public listing." success="The familiar route reaches its checkpoint sooner—or you learn that another bottleneck matters more.">
              <a className="inline-related" href="/progression#upgrades">Use the one-variable upgrade rule →</a>
            </GuideStep>

            <GuideStep id="crystals" number="04" title="Explore areas and follow crystal prompts" action="When a new area is available, explore it and follow the current prompts for collecting crystals." why="New areas and valuable crystals are confirmed. Their exact uses and prices are not described publicly, so the live labels are the authority." success="You have checked the available area without relying on an invented crystal shop or cost table." />

            <GuideStep id="rebirth" number="05" title="Make rebirth a deliberate decision" action="When progress slows, compare the rebirth benefit and any changes displayed by the current game." why="Rebirth is confirmed to multiply growth, but the public description does not define its requirements or every current effect." success="You can explain the benefit and changes shown before using rebirth.">
              <a className="inline-related" href="/progression#rebirth">Run the three-part rebirth check →</a>
            </GuideStep>

            <GuideStep id="offline" number="06" title="Inspect offline growth before acting" action="When you return, first inspect the result shown by the game, then test your current checkpoint before changing another system." why="Offline growth is confirmed, but no public rate, cap, or claim method is documented." success="Your first decision uses the result actually shown on return, not an assumed formula." />

            <section className="mission-complete" aria-labelledby="mission-complete-title">
              <span aria-hidden="true">✓</span>
              <div><p className="eyebrow dark">MISSION COMPLETE</p><h2 id="mission-complete-title">You are ready when you can explain your next move.</h2><p>A successful first session is not a specific size. It is knowing whether walking, an in-game upgrade, a newly available area, or the displayed rebirth benefit is the most useful thing to inspect next.</p></div>
              <a className="button ink" href="/progression">Continue to progression →</a>
            </section>

            <GuideNextRail links={[
              { eyebrow: "REVIEW", title: "Home mission board", href: "/" },
              { eyebrow: "NEXT", title: "Progression route", href: "/progression" },
              { eyebrow: "RELATED", title: "Common mistakes", href: "/mistakes" },
            ]} />
          </div>
        </div>
      </article>
      <SourceNote />
    </main>
  );
}
