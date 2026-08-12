import { navItems } from "../_lib/site";
import Link from "next/link";

function Navigation({ mobile = false }: { mobile?: boolean }) {
  return (
    <nav className={mobile ? "mobile-nav" : "desktop-nav"} aria-label={mobile ? "Mobile navigation" : "Primary navigation"}>
      {navItems.map((item) => <a href={item.href} key={item.href}>{item.label}</a>)}
    </nav>
  );
}

export function SiteHeader() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to guide</a>
      <header className="site-header">
        <div className="shell header-inner">
          <Link className="brand" href="/" aria-label="+1 Grow Per Step Wiki home">
            <span className="brand-mark" aria-hidden="true">+1</span>
            <span><strong>GROW / STEP</strong><small>PLAYER FIELD GUIDE</small></span>
          </Link>
          <Navigation />
          <details className="menu">
            <summary>MENU</summary>
            <Navigation mobile />
          </details>
        </div>
      </header>
    </>
  );
}
