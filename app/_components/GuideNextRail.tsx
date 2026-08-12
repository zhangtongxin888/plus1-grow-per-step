type GuideLink = {
  eyebrow: string;
  title: string;
  href: string;
};

export function GuideNextRail({ links }: { links: GuideLink[] }) {
  return (
    <nav className="guide-next-rail" aria-label="Continue reading">
      {links.map((link) => (
        <a href={link.href} key={`${link.eyebrow}-${link.href}`}>
          <small>{link.eyebrow}</small>
          <strong>{link.title}</strong>
          <span aria-hidden="true">→</span>
        </a>
      ))}
    </nav>
  );
}
