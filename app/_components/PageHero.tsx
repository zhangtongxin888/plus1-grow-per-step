export function PageHero({ eyebrow, title, intro, tag }: { eyebrow: string; title: string; intro: string; tag: string }) {
  return (
    <section className="page-hero">
      <div className="shell page-hero-grid">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p>{intro}</p>
        </div>
        <p className="page-hero-tag">{tag}</p>
      </div>
    </section>
  );
}
