import * as React from "react";
import Link from "next/link";
import { glossaryTerms } from "@/data/glossary";

/**
 * Sucht in einem Text-Children Glossar-Begriffe und ersetzt das
 * erste Vorkommen jedes Begriffs durch einen Link auf
 * /glossar#<slug>. Behält Groß-/Kleinschreibung.
 *
 * Bewusst rein server-seitig (kein useEffect), damit das HTML
 * für Crawler die Links direkt enthält.
 */
interface Props {
  /** Plain-text Inhalt. Akzeptiert Strings oder String-Arrays. */
  children: string | string[];
  /** Welche Term-Slugs explizit nicht verlinkt werden sollen (z.B. weil bereits Headline). */
  exclude?: string[];
  /** Maximal so viele Begriffe pro Block. Default: 6. */
  maxLinks?: number;
  className?: string;
}

const escapeRegex = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export function AutoLink({ children, exclude = [], maxLinks = 6, className }: Props) {
  const text = Array.isArray(children) ? children.join(" ") : children;

  const candidates = glossaryTerms.filter((t) => !exclude.includes(t.slug));
  const matched: { term: (typeof glossaryTerms)[number]; index: number; matched: string }[] = [];

  for (const term of candidates) {
    if (matched.length >= maxLinks) break;
    const variants = [term.name, ...(term.synonyms ?? [])];
    let bestMatch: { i: number; s: string } | null = null;
    for (const v of variants) {
      const re = new RegExp(`\\b${escapeRegex(v)}\\b`, "i");
      const match = re.exec(text);
      if (match && match.index >= 0) {
        if (!bestMatch || match.index < bestMatch.i) {
          bestMatch = { i: match.index, s: match[0] };
        }
      }
    }
    if (bestMatch) {
      const overlap = matched.some(
        (m) => bestMatch!.i < m.index + m.matched.length && bestMatch!.i + bestMatch!.s.length > m.index,
      );
      if (!overlap) {
        matched.push({ term, index: bestMatch.i, matched: bestMatch.s });
      }
    }
  }

  matched.sort((a, b) => a.index - b.index);

  if (matched.length === 0) {
    return <span className={className}>{text}</span>;
  }

  const parts: React.ReactNode[] = [];
  let cursor = 0;
  for (const m of matched) {
    if (m.index > cursor) {
      parts.push(<React.Fragment key={`txt-${cursor}`}>{text.slice(cursor, m.index)}</React.Fragment>);
    }
    parts.push(
      <Link
        key={`lnk-${m.term.slug}-${m.index}`}
        href={`/glossar#${m.term.slug}`}
        className="text-primary underline-offset-2 hover:underline"
      >
        {m.matched}
      </Link>,
    );
    cursor = m.index + m.matched.length;
  }
  if (cursor < text.length) {
    parts.push(<React.Fragment key={`txt-end`}>{text.slice(cursor)}</React.Fragment>);
  }

  return <span className={className}>{parts}</span>;
}

export default AutoLink;
