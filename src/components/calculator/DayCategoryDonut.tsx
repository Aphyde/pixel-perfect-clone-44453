"use client";

import { CATEGORY_META, type DayCategories } from "@/lib/calculator/day-categories";

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
  key: keyof Omit<DayCategories, "total">;
  color: string;
  startAngle: number;
  endAngle: number;
  pathD: string;
  midAngle: number;
  days: number;
  percent: number;
}

const SIZE = 320;
const STROKE = 56;
const RADIUS = SIZE / 2 - STROKE / 2 - 2;
const CX = SIZE / 2;
const CY = SIZE / 2;

const CATEGORY_ORDER: (keyof Omit<DayCategories, "total">)[] = [
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
      midAngle: startAngle + sweep / 2,
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
        >
          <circle
            cx={CX}
            cy={CY}
            r={RADIUS}
            fill="none"
            stroke="#EBE6DD"
            strokeWidth={STROKE}
          />
          {segments.map((seg) => (
            <path
              key={seg.key}
              d={seg.pathD}
              fill="none"
              stroke={seg.color}
              strokeWidth={STROKE}
              strokeLinecap="butt"
            >
              <title>
                {CATEGORY_META[seg.key].label}: {seg.days} Tage ({seg.percent}%)
              </title>
            </path>
          ))}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none px-6">
          <div className="text-5xl md:text-6xl font-bold tracking-tighter text-foreground leading-none">
            {centerValue}
          </div>
          <div className="text-xs md:text-sm font-bold uppercase tracking-widest text-primary mt-2">
            {centerLabel}
          </div>
          {centerSubLabel ? (
            <div className="text-xs text-secondary mt-1">{centerSubLabel}</div>
          ) : null}
        </div>
      </div>

      <ul className="mt-6 md:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm w-full max-w-md">
        {CATEGORY_ORDER.map((key) => {
          const meta = CATEGORY_META[key];
          const days = categories[key];
          if (days <= 0) return null;
          return (
            <li
              key={key}
              className="flex items-center justify-between gap-3 border-b border-outline-variant/20 py-1.5"
            >
              <span className="flex items-center gap-2 min-w-0">
                <span
                  aria-hidden
                  className="w-3 h-3 shrink-0 rounded-full"
                  style={{ backgroundColor: meta.color }}
                />
                <span className="font-medium truncate">{meta.label}</span>
                <span className="text-secondary text-xs whitespace-nowrap">
                  {meta.range}
                </span>
              </span>
              <span className="font-bold tabular-nums">{days} T.</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default DayCategoryDonut;
