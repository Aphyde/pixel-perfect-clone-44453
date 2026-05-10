import Link from "next/link";
import { ChevronRight } from "lucide-react";
import JsonLd from "./JsonLd";
import { buildBreadcrumbSchema, type BreadcrumbItem } from "@/lib/seo/schema";

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  /** Optionaler Tailwind-Class-Override für den Wrapper. */
  className?: string;
  /** Wenn true, wird kein JSON-LD gerendert (z.B. wenn extern bereits eingebunden). */
  withoutSchema?: boolean;
}

/**
 * Sichtbarer Breadcrumb-Trail mit zugehörigem BreadcrumbList-Schema.
 *
 * Erwartet vollständige Trail-Items inkl. Home und aktueller Seite.
 */
export function Breadcrumbs({ items, className, withoutSchema }: BreadcrumbsProps) {
  if (!items || items.length === 0) return null;

  return (
    <>
      <nav
        aria-label="Breadcrumb"
        className={
          className ??
          "container mx-auto px-6 lg:px-12 pt-24 md:pt-28 pb-2 text-xs text-muted-foreground"
        }
      >
        <ol className="flex flex-wrap items-center gap-1.5">
          {items.map((item, i) => {
            const isLast = i === items.length - 1;
            return (
              <li key={`${item.url}-${i}`} className="flex items-center gap-1.5">
                {i > 0 && (
                  <ChevronRight className="h-3 w-3 text-muted-foreground/60" aria-hidden />
                )}
                {isLast ? (
                  <span aria-current="page" className="text-foreground/80">
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={item.url}
                    className="hover:text-foreground underline-offset-2 hover:underline"
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      {!withoutSchema && <JsonLd data={buildBreadcrumbSchema(items)} />}
    </>
  );
}

export default Breadcrumbs;
