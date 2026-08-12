import { LAST_CHECKED, navItems, OFFICIAL_GAME_URL } from "../_lib/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <div className="footer-logo"><span>+1</span><strong>GROW / STEP</strong></div>
          <p>An independent player guide for +1 Grow Per Step. Not affiliated with Roblox Corporation or Goobers HQ.</p>
        </div>
        <div>
          <h2>Guides</h2>
          <ul>{navItems.map((item) => <li key={item.href}><a href={item.href}>{item.label}</a></li>)}</ul>
        </div>
        <div>
          <h2>Verification</h2>
          <ul>
            <li><a href="/sources">Sources & method</a></li>
            <li><a href={OFFICIAL_GAME_URL} target="_blank" rel="noreferrer">Official game listing</a></li>
          </ul>
          <p className="checked">Checked {LAST_CHECKED}</p>
        </div>
      </div>
    </footer>
  );
}
