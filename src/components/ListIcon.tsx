"use client";

import { Check, Minus, Icon } from "@phosphor-icons/react";

// Small Phosphor icon used in place of a list bullet. `included` is a clay
// check, `excluded` a muted dash; pass `icon` for anything else.
export default function ListIcon({
  kind = "included",
  icon,
  size = 16,
}: {
  kind?: "included" | "excluded";
  icon?: Icon;
  size?: number;
}) {
  const Glyph = icon ?? (kind === "included" ? Check : Minus);
  return (
    <Glyph
      aria-hidden="true"
      size={size}
      weight={kind === "included" ? "regular" : "light"}
      color={kind === "included" ? "var(--color-accent)" : "#9C8E7E"}
      style={{ flexShrink: 0, marginTop: "0.3em" }}
    />
  );
}
