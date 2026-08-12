import type { Metadata } from "next";
import Image from "next/image";
import { FactBadge } from "./_components/FactBadge";
import { GuideNextRail } from "./_components/GuideNextRail";
import { SourceNote } from "./_components/SourceNote";
import {
  createPageMetadata,
  OFFICIAL_GAME_URL,
  serializeJsonLd,
  SITE_NAME,
  SITE_URL,
} from "./_lib/site";

export const metadata: Metadata = createPageMetadata(
  "Beginner Guide & Progression Wiki",
  "Start +1 Grow Per Step with a verified first-run route, then learn the growth loop, walls, upgrades, crystals, rebirths, offline growth, and common mistakes.",
  "/",
);

const missionSteps = [
  ["01", "Walk one short loop", "Watch how normal movement changes your size."],
  ["02", "Test one wall once", "Use the next wall as a checkpoint, not a retry trap."],
  ["03", "Check the bottleneck", "Read the current upgrade and multiplier labels in game."],
  ["04", "Recheck, then plan", "Repeat the route and consider rebirth only after a slowdown."],
];

const firstRunSteps = [
  {
    number: "01",
    title: "Build a baseline",
    action: "Walk a short, easy loop and watch your size change.",
    why: "Walking-based growth is the confirmed base system. A baseline lets you judge whether later choices help.",
    success: "You know what one normal loop accomplishes.",
    type: "confirmed" as const,
  },
  {
    number: "02",
    title: "Use one wall as a checkpoint",
    action: "Try the next reachable wall once. If it stops you, return to the growth loop.",
    why: "The official description presents gigantic walls as size challenges. Repeating the same attempt without growth gives you no new information.",
    success: "Your next wall attempt follows a real change in size or growth.",
    type: "strategy" as const,
  },
  {
    number: "03",
    title: "Improve one bottleneck",
    action: "Read the current in-game options, choose one useful upgrade or multiplier, then repeat the same route.",
    why: "Upgrades and multipliers are confirmed, but public sources do not provide stable names, prices, or values.",
    success: "Your familiar loop reaches the checkpoint sooner.",
    type: "strategy" as const,
  },
  {
    number: "04",
    title: "Recheck before a rebirth",
    action: "Test your wall again. If progress has slowed, compare the rebirth benefit and any changes shown by the current game.",
    why: "Rebirth is confirmed to improve growth, but its current requirements and effects must be checked in game.",
    success: "You can explain the shown benefit and changes before using rebirth.",
    type: "strategy" as const,
  },
];

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: SITE_NAME,
  url: SITE_URL,
  description: "An independent beginner guide and progression wiki for +1 Grow Per Step on Roblox.",
  about: {
    "@type": "VideoGame",
    name: "+1 Grow Per Step",
    author: { "@type": "Organization", name: "Goobers HQ" },
    url: OFFICIAL_GAME_URL,
  },
};

export default function Home() {
  return (
    <main id="main-content">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(pageSchema) }} />

      <section className="hero">
        <div className="shell hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">FIRST RUN MISSION · BEGIN HERE</p>
            <h1>Your first 10 minutes, planned.</h1>
            <p className="hero-lede">
              Learn the growth loop without guessed numbers: walk, check one wall,
              improve the bottleneck, then decide what should happen next.
            </p>
            <a className="button primary hero-primary" href="/beginner-guide">
              Start the beginner tutorial <span aria-hidden="true">→</span>
            </a>
            <div className="hero-proof">
              <Image src="/official-game-thumbnail.png" alt="Official +1 Grow Per Step game thumbnail" width={56} height={56} priority unoptimized />
              <p><strong>Built from verified mechanics</strong><span>Last checked August 12, 2026</span></p>
            </div>
          </div>

          <aside className="mission-board" aria-label="First run mission checklist">
            <div className="mission-board-head">
              <span>MISSION 001</span>
              <b>STARTER ROUTE</b>
              <i>4 STEPS</i>
            </div>
            <ol>
              {missionSteps.map(([number, title, copy]) => (
                <li key={number}>
                  <span>{number}</span>
                  <div><strong>{title}</strong><small>{copy}</small></div>
                </li>
              ))}
            </ol>
            <a href="#first-run">Preview the route below <span aria-hidden="true">↓</span></a>
          </aside>
        </div>
      </section>

      <section className="fact-ribbon" aria-label="Verified game systems">
        <div className="shell">
          <strong>OFFICIAL DESCRIPTION CONFIRMS</strong>
          <span>Walking growth</span><span>Walls</span><span>Upgrades</span>
          <span>Crystals</span><span>Rebirth</span><span>Offline growth</span>
        </div>
      </section>

      <section className="section first-run-section" id="first-run">
        <div className="shell">
          <div className="section-heading split-heading">
            <div><p className="eyebrow dark">FIRST 10 MINUTES</p><h2>One action. One reason. One check.</h2></div>
            <p>This is a learning route, not a speed promise. Prices, thresholds, and rebirth details can change, so read the current in-game labels.</p>
          </div>
          <ol className="run-timeline">
            {firstRunSteps.map((step) => (
              <li key={step.number}>
                <span className="timeline-number">{step.number}</span>
                <div className="timeline-main">
                  <FactBadge type={step.type} />
                  <h3>{step.title}</h3>
                  <p><b>ACTION</b>{step.action}</p>
                </div>
                <div className="timeline-reason"><small>WHY</small><p>{step.why}</p></div>
                <div className="timeline-check"><small>SUCCESS CHECK</small><p>{step.success}</p></div>
              </li>
            ))}
          </ol>
          <div className="section-cta"><p>Want the route with return-from-offline and crystal guidance?</p><a className="button ink" href="/beginner-guide">Open the full beginner tutorial →</a></div>
        </div>
      </section>

      <section className="section stuck-section">
        <div className="shell">
          <div className="section-heading"><p className="eyebrow dark">WHAT STOPPED YOU?</p><h2>Jump to the problem, not another blind loop.</h2></div>
          <div className="stuck-grid">
            <a href="/mistakes#wall-stall"><span>WALL</span><strong>The next wall still stops you</strong><p>Check whether your state changed before another attempt.</p><b>Fix the wall stall →</b></a>
            <a href="/progression#upgrades"><span>UPGRADE</span><strong>Upgrade choices feel unclear</strong><p>Compare the same route before and after one choice.</p><b>Choose the bottleneck →</b></a>
            <a href="/progression#rebirth"><span>REBIRTH</span><strong>Rebirth is available</strong><p>Use slowdown and the current displayed benefit as your check.</p><b>Make the rebirth call →</b></a>
          </div>
        </div>
      </section>

      <section className="section loop-section">
        <div className="shell loop-grid">
          <div className="loop-copy">
            <FactBadge type="confirmed" />
            <p className="eyebrow">THE CORE LOOP</p>
            <h2>Growth should feed the next checkpoint.</h2>
            <p>The public description confirms each system. The order shown here is our practical route through those systems—not an official step-by-step tutorial.</p>
            <a className="text-link light" href="/progression">Build a repeatable progression route →</a>
          </div>
          <ol className="loop-track" aria-label="Core gameplay loop">
            <li><b>01</b><strong>Walk</strong><small>Grow with movement</small></li>
            <li><b>02</b><strong>Upgrade</strong><small>Improve the loop</small></li>
            <li><b>03</b><strong>Challenge a wall</strong><small>Use size as a check</small></li>
            <li><b>04</b><strong>Explore</strong><small>Find areas & crystals</small></li>
            <li><b>05</b><strong>Rebirth</strong><small>Improve future growth</small></li>
          </ol>
        </div>
      </section>

      <section className="section roadmap-section">
        <div className="shell roadmap-grid">
          <div><p className="eyebrow dark">ADVANCED ROUTE</p><h2>Three stages, one useful question.</h2><p>Ask: “What makes my next checkpoint arrive sooner?”</p></div>
          <ol>
            <li><span>STAGE 01</span><strong>First lap</strong><p>Learn what walking alone accomplishes.</p></li>
            <li><span>STAGE 02</span><strong>Wall push</strong><p>Grow, test once, improve, then recheck.</p></li>
            <li><span>STAGE 03</span><strong>Rebirth cycle</strong><p>Use it only after reading its current benefit and changes.</p></li>
          </ol>
        </div>
      </section>

      <section className="section faq-preview">
        <div className="shell faq-preview-grid">
          <div><p className="eyebrow">FAST ANSWERS</p><h2>Know the facts before you optimize.</h2><a className="button pale" href="/faq">Open all FAQs →</a></div>
          <div className="mini-faqs">
            <details open><summary>Does the game grow while I am offline?</summary><p>Yes. The official description confirms offline growth, but does not publish a rate or cap.</p></details>
            <details><summary>What should I do after a failed wall?</summary><p>As a practical strategy, return to walking or a growth improvement and retest only after something changes.</p></details>
            <details><summary>Are exact costs or codes verified?</summary><p>No stable costs or official code system were found in the public listing, so this guide does not guess them.</p></details>
          </div>
        </div>
      </section>

      <div className="shell home-next"><GuideNextRail links={[
        { eyebrow: "START", title: "Beginner tutorial", href: "/beginner-guide" },
        { eyebrow: "NEXT", title: "Progression route", href: "/progression" },
        { eyebrow: "CHECK", title: "Sources & limits", href: "/sources" },
      ]} /></div>
      <SourceNote />
    </main>
  );
}
