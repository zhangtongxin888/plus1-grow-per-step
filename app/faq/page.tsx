import { GuideNextRail } from "../_components/GuideNextRail";
import { PageHero } from "../_components/PageHero";
import { createPageMetadata, serializeJsonLd, SITE_URL } from "../_lib/site";

export const metadata = createPageMetadata(
  "+1 Grow Per Step FAQ",
  "Answers about walking growth, walls, upgrades, crystals, rebirth, offline growth, codes, and verification for +1 Grow Per Step.",
  "/faq",
);

const faqGroups = [
  {
    id: "starting",
    title: "Starting",
    items: [
      { q: "How do I grow in +1 Grow Per Step?", a: "Walk. The official game description says movement grows your character with every step.", href: "/beginner-guide#baseline", link: "Start with a baseline" },
      { q: "Why can’t I conquer the next wall?", a: "The official description frames walls as challenges for a large-enough character. As a practical strategy, return to growth and retest only after your state changes.", href: "/mistakes#wall-stall", link: "Fix a wall stall" },
      { q: "What is the core gameplay loop?", a: "The public description confirms walking growth, upgrades and multipliers, walls, new areas, crystals, rebirth, and offline growth. This wiki organizes them into a practical repeatable route.", href: "/progression", link: "See the progression route" },
    ],
  },
  {
    id: "progression",
    title: "Progression",
    items: [
      { q: "When should I rebirth?", a: "The official description only confirms that rebirth multiplies growth. As a practical strategy, wait for a slowdown and compare the current benefit and other changes shown by the game before deciding.", href: "/progression#rebirth", link: "Use the rebirth check" },
      { q: "What are crystals for?", a: "The official description confirms valuable crystals can be collected, but does not document every current use. Follow the labels shown by the live game instead of guessed details." },
      { q: "Does growth continue offline?", a: "Yes. Offline growth is explicitly confirmed. The public description does not give a rate, cap, or collection method, so check the result shown when you return.", href: "/beginner-guide#offline", link: "Use the return check" },
    ],
  },
  {
    id: "verification",
    title: "Verification",
    items: [
      { q: "Are there verified +1 Grow Per Step codes?", a: "We found no code system or active codes confirmed by the official public listing as of August 12, 2026, so this guide does not publish code claims." },
      { q: "Who made the game?", a: "+1 Grow Per Step is listed as an experience by Goobers HQ." },
      { q: "Is this the official game site?", a: "No. This is an independent player guide and is not affiliated with Roblox Corporation or Goobers HQ.", href: "/sources", link: "Read our fact policy" },
    ],
  },
] as const;

const allFaqs = faqGroups.flatMap((group) => group.items);
const schema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  url: `${SITE_URL}/faq`,
  mainEntity: allFaqs.map((faq) => ({ "@type": "Question", name: faq.q, acceptedAnswer: { "@type": "Answer", text: faq.a } })),
};

export default function FAQ() {
  return (
    <main id="main-content">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }} />
      <PageHero eyebrow="FAQ" title="Fast answers, with clear fact boundaries." intro="Stable mechanics come from official sources. Changing values and strategic decisions must be checked against the current game." tag="LAST FACT CHECK: AUGUST 12, 2026" />
      <article className="article-section">
        <div className="shell article-layout">
          <nav className="article-nav" aria-label="FAQ groups"><strong>QUESTIONS</strong>{faqGroups.map((group) => <a href={`#${group.id}`} key={group.id}>{group.title}</a>)}</nav>
          <div className="article-body faq-page-list">
            {faqGroups.map((group) => (
              <section className="faq-group" id={group.id} key={group.id}>
                <p className="eyebrow dark">{group.title.toUpperCase()}</p>
                <h2>{group.title} questions</h2>
                {group.items.map((faq, index) => (
                  <details key={faq.q} open={group.id === "starting" && index === 0}>
                    <summary>{faq.q}</summary>
                    <p>{faq.a}</p>
                    {"href" in faq && faq.href ? <a className="inline-related faq-related" href={faq.href}>{faq.link} →</a> : null}
                  </details>
                ))}
              </section>
            ))}
            <GuideNextRail links={[
              { eyebrow: "START", title: "Beginner tutorial", href: "/beginner-guide" },
              { eyebrow: "RELATED", title: "Common mistakes", href: "/mistakes" },
              { eyebrow: "VERIFY", title: "Sources & limits", href: "/sources" },
            ]} />
          </div>
        </div>
      </article>
    </main>
  );
}
