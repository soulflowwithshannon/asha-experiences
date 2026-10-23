/**
 * The hairline-and-star rule used between sections. Same mark as the one on
 * the about page, so section breaks read the same way across the site.
 */
export default function Divider({
  maxWidth = 480,
  margin = "0 auto",
  background,
}: {
  maxWidth?: number;
  margin?: string;
  /** Set when the rule sits between two sections rather than inside one. */
  background?: string;
}) {
  return (
    <div style={{ background, padding: background ? "0 32px" : 0 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, margin, maxWidth }}>
        <div style={{ flex: 1, height: "0.5px", background: "var(--color-border)" }} />
        <span style={{ color: "#A67C52", fontSize: 14 }}>✦</span>
        <div style={{ flex: 1, height: "0.5px", background: "var(--color-border)" }} />
      </div>
    </div>
  );
}
