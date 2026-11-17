import { isValidElement, ReactNode } from "react";

/** Flattens an FAQ answer (JSX) to plain text. Block elements and list items
 *  become line breaks so paragraphs don't run together. Components with no
 *  text children (icons) contribute nothing. */
function toText(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(toText).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) {
    const inner = toText(node.props.children);
    const block = typeof node.type === "string" && ["p", "li", "div", "ul", "ol", "br"].includes(node.type);
    return block ? `${inner}\n` : inner;
  }
  return "";
}

function clean(s: string) {
  return s
    .split("\n")
    .map((line) => line.replace(/\s+/g, " ").trim())
    .filter(Boolean)
    .join("\n");
}

/** schema.org FAQPage for a page's `faqs` array, so the questions and answers
 *  shown in the accordion are machine-readable word for word. */
export default function FaqJsonLd({ faqs }: { faqs: { question: string; answer: ReactNode }[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: clean(toText(f.answer)) },
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
