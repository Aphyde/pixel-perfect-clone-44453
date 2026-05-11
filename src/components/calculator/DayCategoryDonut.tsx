"use client";

import { useState } from "react";
import { CATEGORY_META, type DayCategories } from "@/lib/calculator/day-categories";

type CategoryKey = keyof Omit<DayCategories, "total">;

interface DayCategoryDonutProps {
  categories: DayCategories;
  /** Mittlere Zahl, z. B. Tage mit Dach. */
  centerValue: number;
  /** Untertitel unter der Hauptzahl. */
  centerLabel: string;
  /** Prozent-Wert, der als kleine Note unter dem Label erscheint. */
  centerSubLabel?: string;
}

interface SegmentPath {
  key: CategoryKey;
  color: string;
  startAngle: number;
  endAngle: number;
  pathD: string;
  days: number;
  percent: number;
}

const SIZE = 320;
const STROKE = 56;
const HOVER_STROKE = 68;
const RADIUS = SIZE / 2 - HOVER_STROKE / 2 - 2;
const CX = SIZE / 2;
const CY = SIZE / 2;

const CATEGORY_ORDER: CategoryKey[] = [
  "sommer",
  "potenzial",
  "kalt",
  "eis",
  "heiss",
];

function polarToCartesian(angleDeg: number, radius = RADIUS) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: CX + radius * Math.cos(rad), y: CY + radius * Math.sin(rad) };
}

function describeArc(start: number, end: number): string {
  const startPoint = polarToCartesian(end);
  const endPoint = polarToCartesian(start);
  const largeArc = end - start > 180 ? 1 : 0;
  return [
    `M ${startPoint.x} ${startPoint.y}`,
    `A ${RADIUS} ${RADIUS} 0 ${largeArc} 0 ${endPoint.x} ${endPoint.y}`,
  ].join(" ");
}

function buildSegments(categories: DayCategories): SegmentPath[] {
  const total = categories.total || 365;
  let cursor = 0;
  return CATEGORY_ORDER.map((key) => {
    const days = categories[key];
    const sweep = (days / total) * 360;
    const startAngle = cursor;
    const endAngle = cursor + sweep;
    cursor = endAngle;
    return {
      key,
      color: CATEGORY_META[key].color,
      days,
      percent: Math.round((days / total) * 100),
      startAngle,
      endAngle,
      pathD: describeArc(startAngle, endAngle),
    };
  }).filter((s) => s.days > 0);
}

const DayCategoryDonut = ({
  categories,
  centerValue,
  centerLabel,
  centerSubLabel,
}: DayCategoryDonutProps) => {
  const segments = buildSegments(categories);
  const [active, setActive] = useState<CategoryKey | null>(null);

  const activeSegment = active
    ? segments.find((s) => s.key === active)
    : undefined;
  const activeMeta = active ? CATEGORY_META[active] : null;

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: SIZE, maxWidth: "100%" }}>
        <svg
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          width="100%"
          height="auto"
          role="img"
          aria-label={`Aufteilung der ${categories.total} Tage in 5 Kategorien`}
          className="block"
          onMouseLeave={() => setActive(null)}
        >
          <circle
            cx={CX}
            cy={CY}
            r={RADIUS}
            fill="none"
            stroke="#EBE6DD"
            strokeWidth={STROKE}
          />
          {segments.map((seg) => {
            const isActive = active === seg.key;
            const isOther = active !== null && !isActive;
            return (
              <path
                key={seg.key}
                d={seg.pathD}
                fill="none"
                stroke={seg.color}
                strokeWidth={isActive ? HOVER_STROKE : STROKE}
                strokeLinecap="butt"
                style={{
                  opacity: isOther ? 0.35 : 1,
                  cursor: "pointer",
                  transition: "stroke-width 180ms ease, opacity 180ms ease",
                }}
                onMouseEnter={() => setActive(seg.key)}
                onFocus={() => setActive(seg.key)}
                onBlur={() => setActive(null)}
                tabIndex={0}
                role="button"
                aria-label={`${CATEGORY_META[seg.key].label}: ${seg.days} Tage, ${seg.percent} Prozent`}
              >
                <title>
                  {CATEGORY_META[seg.key].label}: {seg.days} Tage ({seg.percent}%)
                </title>
              </path>
            );
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none px-6">
          {activeSegment && activeMeta ? (
            <>
              <div
                className="text-5xl md:text-6xl font-bold tracking-tighter leading-none transition-colors"
                style={{ color: activeMeta.color }}
              >
                {activeSegment.days}
              </div>
              <div className="text-xs md:text-sm font-bold uppercase tracking-widest text-foreground mt-2">
                {activeMeta.label}
              </div>
              <div className="text-xs text-secondary mt-1">
                {activeMeta.range} · {activeSegment.percent}%
              </div>
            </>
          ) : (
            <>
              <div className="text-5xl md:text-6xl font-bold tracking-tighter text-foreground leading-none">
                {centerValue}
              </div>
              <div className="text-xs md:text-sm font-bold uppercase tracking-widest text-primary mt-2">
                {centerLabel}
              </div>
              {centerSubLabel ? (
                <div className="text-xs text-secondary mt-1">{centerSubLabel}</div>
              ) : null}
            </>
          )}
        </div>
      </div>

      <ul
        className="mt-6 md:mt-8 w-full max-w-md space-y-1"
        onMouseLeave={() => setActive(null)}
      >
        {CATEGORY_ORDER.map((key) => {
          const meta = CATEGORY_META[key];
          const days = categories[key];
          if (days <= 0) return null;
          const percent = Math.round((days / (categories.total || 365)) * 100);
          const isActive = active === key;
          const isOther = active !== null && !isActive;
          return (
            <li key={key}>
              <button
                type="button"
                onMouseEnter={() => setActive(key)}
                onFocus={() => setActive(key)}
                onBlur={() => setActive(null)}
                className={`group w-full flex items-center gap-3 py-2 px-1.5 -mx-1.5 text-left transition-all border-b border-outline-variant/20 ${
                  isActive ? "bg-primary/5" : ""
                } ${isOther ? "opacity-50" : "opacity-100"}`}
                aria-label={`${meta.label} ${meta.range}: ${days} Tage`}
              >
                <span
                  aria-hidden
                  className={`w-3.5 h-3.5 shrink-0 rounded-full transition-transform ${isActive ? "scale-125" : "scale-100"}`}
                  style={{ backgroundColor: meta.color }}
                />
                <span className="flex-1 min-w-0 flex items-baseline gap-2 flex-wrap">
                  <span className="font-semibold text-foreground text-sm md:text-base">
                    {meta.label}
                  </span>
                  <span className="text-secondary text-xs whitespace-nowrap">
                    {meta.range}
                  </span>
                </span>
                <span className="font-bold tabular-nums text-sm md:text-base whitespace-nowrap">
                  {days}{" "}
                  <span className="font-normal text-secondary text-xs">
                    ({percent}%)
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default DayCategoryDonut;
