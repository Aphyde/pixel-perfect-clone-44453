import * as React from "react";
import type { CategoryLongFormContent } from "@/data/category-content";

interface Props {
  content: CategoryLongFormContent;
  categoryLabel: string;
}

/**
 * Long-form Wissensblock auf Category-Pages: TL;DR, Schlüsselfakten,
 * Use-Cases, Vergleichstabelle, Material- und Lokalkontext.
 *
 * Bewusst als Server-Component ohne Animationen — Inhalt soll für
 * AI-Crawler im SSR-HTML direkt sichtbar sein.
 */
export function CategoryLongForm({ content, categoryLabel }: Props) {
  return (
    <section
      className="py-16 md:py-24 bg-surface"
      aria-labelledby="longform-heading"
    >
      <div className="container mx-auto px-5 md:px-8 max-w-5xl">
        <div className="mb-10 md:mb-14">
          <span className="text-primary text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase mb-3 block">
            Wissen &amp; Auswahl
          </span>
          <h2
            id="longform-heading"
            className="text-3xl md:text-5xl font-bold tracking-tighter mb-6 speakable-tldr-heading"
          >
            {categoryLabel} — was Sie vor dem Kauf wissen sollten
          </h2>

          {/* TL;DR */}
          <div
            className="border-l-4 border-primary bg-card p-5 md:p-6 mb-8 speakable-tldr"
            role="note"
            aria-label="Kurzfassung"
          >
            <span className="text-primary text-[10px] font-bold tracking-[0.3em] uppercase block mb-2">
              In 30 Sekunden
            </span>
            <p className="text-sm md:text-base leading-relaxed text-foreground">
              {content.tldr}
            </p>
          </div>

          {/* Key facts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
            {content.keyFacts.map((fact, i) => (
              <div
                key={i}
                className="flex items-start gap-3 bg-surface-container-low p-4"
              >
                <span
                  className="block w-1.5 h-1.5 bg-primary mt-2 shrink-0"
                  aria-hidden
                />
                <span className="text-sm leading-relaxed">{fact}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Use cases */}
        <div className="mb-12 md:mb-16">
          <h3 className="text-xl md:text-2xl font-bold tracking-tight mb-6">
            Welche Variante passt zu welchem Einsatz?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {content.useCases.map((u) => (
              <article
                key={u.title}
                className="bg-card p-6 md:p-7 border-l-2 border-primary/40"
              >
                <h4 className="text-lg font-bold mb-2">{u.title}</h4>
                <p className="text-secondary text-sm leading-relaxed mb-3">
                  {u.description}
                </p>
                <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                  Empfehlung: {u.recommended}
                </p>
              </article>
            ))}
          </div>
        </div>

        {/* Comparison table */}
        {content.comparison && (
          <div className="mb-12 md:mb-16">
            <h3 className="text-xl md:text-2xl font-bold tracking-tight mb-6">
              {content.comparison.title}
            </h3>
            <div className="overflow-x-auto -mx-5 md:mx-0">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-primary/30">
                    {content.comparison.columns.map((c) => (
                      <th
                        key={c.key}
                        className="text-left p-3 md:p-4 font-bold uppercase tracking-wider text-xs"
                      >
                        {c.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {content.comparison.rows.map((row, i) => (
                    <tr
                      key={i}
                      className="border-b border-outline-variant/30"
                    >
                      {content.comparison!.columns.map((c) => (
                        <td
                          key={c.key}
                          className={`p-3 md:p-4 align-top ${
                            c.key === "feature"
                              ? "font-semibold text-foreground"
                              : "text-secondary"
                          }`}
                        >
                          {c.key === "feature"
                            ? row.feature
                            : (row.values[c.key] ?? "—")}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Materials */}
        {content.materials && (
          <div className="mb-10">
            <h3 className="text-xl md:text-2xl font-bold tracking-tight mb-3">
              Materialien &amp; Verarbeitung
            </h3>
            <p className="text-secondary leading-relaxed text-sm md:text-base">
              {content.materials}
            </p>
          </div>
        )}

        {/* Local context */}
        <div className="mb-6">
          <h3 className="text-xl md:text-2xl font-bold tracking-tight mb-3">
            Regionale Besonderheiten Ulm &amp; Umgebung
          </h3>
          <p className="text-secondary leading-relaxed text-sm md:text-base">
            {content.localContext}
          </p>
        </div>

        {content.serviceNote && (
          <p className="text-sm italic text-foreground/70 border-t border-outline-variant/30 pt-5">
            {content.serviceNote}
          </p>
        )}
      </div>
    </section>
  );
}

export default CategoryLongForm;
