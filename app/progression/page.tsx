import { FactBadge } from "../_components/FactBadge";
import { GuideNextRail } from "../_components/GuideNextRail";
import { PageHero } from "../_components/PageHero";
import { SourceNote } from "../_components/SourceNote";
import { createPageMetadata } from "../_lib/site";

export const metadata = createPageMetadata(
  "+1 Grow Per Step Progression Guide",
  "Plan wall pushes, upgrades, crystal exploration, rebirth decisions, and offline returns in +1 Grow Per Step.",
  "/progression",
);

export default function Progression() {
  return (
    <main id="main-content">
      <PageHero eyebrow="PROGRESSION ROUTE" title="Make each loop answer one question." intro="Instead of chasing unverified values, compare the time and effort needed to reach your next useful checkpoint." tag="WHAT SHORTENS THE NEXT CHECKPOINT?" />
      <article className="article-section">
        <div className="shell article-layout">
          <nav className="article-nav" aria-label="Progression sections">
            <strong>THREE STAGES</strong>
            <a href="#early-loop">Early loop</a>
            <a href="#wall-push">Wall push</a>
            <a href="#rebirth">Rebirth cycle</a>
            <a href="#offline">Offline return</a>
          </nav>
          <div className="article-body progression-body">
            <section className="progression-compass" aria-labelledby="compass-title">
              <p className="eyebrow dark">PROGRESSION COMPASS</p>
              <h2 id="compass-title">Name the bottleneck before you act.</h2>
              <div className="compass-grid">
                <a href="#early-loop"><small>NO BASELINE</small><strong>Repeat one walking loop</strong><span>Learn what movement alone changes →</span></a>
                <a href="#upgrades"><small>SLOW LOOP</small><strong>Inspect one improvement</strong><span>Compare the same route again →</span></a>
                <a href="#wall-push"><small>FAILED WALL</small><strong>Change state before retry</strong><span>Make the next test useful →</span></a>
                <a href="#rebirth"><small>LONG PLATEAU</small><strong>Read the shown rebirth benefit</strong><span>Decide with current information →</span></a>
              </div>
            </section>
            <section className="progression-stage" id="early-loop">
              <div className="stage-label">STAGE 01</div>
              <FactBadge type="strategy" />
              <h2>Early loop: learn the baseline</h2>
              <p>Walk a repeatable route and keep one simple comparison in mind: how long does it take to reach the next wall you can test?</p>
              <div className="decision-check"><b>DECISION</b><span>If you cannot describe your normal loop yet, keep observing before changing several systems at once.</span></div>
            </section>
            <section className="progression-stage" id="upgrades">
              <div className="stage-label">UPGRADE RULE</div>
              <FactBadge type="strategy" />
              <h2>Change one variable, then repeat</h2>
              <p>The official description confirms upgrades and multipliers, but not stable names, prices, or values. Choose using the current interface, then repeat a familiar route so the outcome is readable.</p>
              <div className="decision-grid compact">
                <div><b>HELPFUL SIGNAL</b><span>The same checkpoint arrives with less walking or waiting.</span></div>
                <div><b>UNCLEAR SIGNAL</b><span>Several options changed at once, so you cannot tell what helped.</span></div>
              </div>
            </section>
            <section className="progression-stage" id="wall-push">
              <div className="stage-label">STAGE 02</div>
              <FactBadge type="strategy" />
              <h2>Wall push: grow, test, improve, recheck</h2>
              <p>Use the next wall as a size checkpoint. After a successful challenge, check which areas are currently available and follow the game’s prompts for crystals before choosing another checkpoint.</p>
              <div className="decision-check warning"><b>STOP</b><span>Do not repeat a failed wall test until your state has actually changed.</span></div>
            </section>
            <section className="progression-stage" id="rebirth">
              <div className="stage-label">STAGE 03</div>
              <FactBadge type="strategy" />
              <h2>Rebirth cycle: decide at a real slowdown</h2>
              <ol className="check-list">
                <li>Current progress has slowed enough to make the next checkpoint feel distant.</li>
                <li>The benefit shown by the current game should meaningfully improve future growth.</li>
                <li>You have checked whether an easy nearby wall or upgrade should come first.</li>
              </ol>
              <p>After using rebirth, compare the route only if the current game shows that previous progress changed. The public description does not define all rebirth effects.</p>
            </section>
            <section className="progression-stage" id="offline">
              <div className="stage-label">RETURN CHECK</div>
              <FactBadge type="strategy" />
              <h2>Read the offline result before spending</h2>
              <p>The official description confirms offline growth, but gives no public formula. On return, inspect what the game shows and test your checkpoint before making another major decision.</p>
            </section>
            <GuideNextRail links={[
              { eyebrow: "PREVIOUS", title: "Beginner tutorial", href: "/beginner-guide" },
              { eyebrow: "NEXT", title: "Common mistakes", href: "/mistakes" },
              { eyebrow: "RELATED", title: "FAQ", href: "/faq" },
            ]} />
          </div>
        </div>
      </article>
      <SourceNote />
    </main>
  );
}
