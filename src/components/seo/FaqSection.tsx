"use client";

import * as React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { FaqEntry } from "@/data/faq";

interface FaqSectionProps {
  faqs: FaqEntry[];
  /** Optionaler Titel-Override. */
  title?: string;
  /** Optionales Sub-Label über dem Titel. */
  label?: string;
  /** Optionaler Wrapper-Hintergrund-Class. */
  bgClassName?: string;
}

export function FaqSection({
  faqs,
  title = "Häufige Fragen",
  label = "FAQ",
  bgClassName = "bg-surface-container-low",
}: FaqSectionProps) {
  if (!faqs || faqs.length === 0) return null;

  return (
    <section className={`py-16 md:py-24 ${bgClassName}`} aria-labelledby="faq-heading">
      <div className="container mx-auto px-5 md:px-8 max-w-3xl">
        <div className="mb-8 md:mb-12">
          <span className="text-primary text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase mb-3 block">
            {label}
          </span>
          <h2
            id="faq-heading"
            className="text-3xl md:text-5xl font-bold tracking-tighter speakable-faq"
          >
            {title}
          </h2>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((f, i) => (
            <AccordionItem key={`${i}-${f.question}`} value={`item-${i}`}>
              <AccordionTrigger className="text-left text-base md:text-lg font-semibold hover:no-underline">
                {f.question}
              </AccordionTrigger>
              <AccordionContent className="text-secondary leading-relaxed text-sm md:text-base speakable-answer">
                {f.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

export default FaqSection;
