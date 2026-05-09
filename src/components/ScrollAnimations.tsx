"use client";

import { motion, type Variant } from "framer-motion";
import Image from "next/image";
import { type ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right";

const directionOffset = (d: Direction, distance: number) => {
  switch (d) {
    case "up": return { y: distance };
    case "down": return { y: -distance };
    case "left": return { x: distance };
    case "right": return { x: -distance };
  }
};

interface FadeInProps {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  once?: boolean;
}

export const FadeIn = ({
  children, direction = "up", delay = 0, duration = 0.6, distance = 40, className, once = true,
}: FadeInProps) => (
  <motion.div
    initial={{ opacity: 0, ...directionOffset(direction, distance) }}
    whileInView={{ opacity: 1, x: 0, y: 0 }}
    viewport={{ once, margin: "-80px" }}
    transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

export const StaggerContainer = ({
  children, className, staggerDelay = 0.1, delay = 0,
}: { children: ReactNode; className?: string; staggerDelay?: number; delay?: number }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-80px" }}
    transition={{ staggerChildren: staggerDelay, delayChildren: delay }}
    className={className}
  >
    {children}
  </motion.div>
);

export const StaggerItem = ({
  children, className, direction = "up", distance = 30,
}: { children: ReactNode; className?: string; direction?: Direction; distance?: number }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, ...directionOffset(direction, distance) } as Variant,
      visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } as Variant,
    }}
    className={className}
  >
    {children}
  </motion.div>
);

export const ScaleIn = ({
  children, delay = 0, className,
}: { children: ReactNode; delay?: number; className?: string }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

export const RevealLine = ({ className, delay = 0 }: { className?: string; delay?: number }) => (
  <motion.div
    initial={{ scaleX: 0 }}
    whileInView={{ scaleX: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    style={{ transformOrigin: "left" }}
    className={className}
  />
);

export const CountUp = ({ value, suffix = "", className }: { value: string; suffix?: string; className?: string }) => (
  <motion.span
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {value}{suffix}
  </motion.span>
);

export const ParallaxImage = ({
  src,
  alt,
  className,
  sizes = "(min-width: 768px) 50vw, 100vw",
  quality = 75,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  quality?: number;
}) => (
  <motion.div
    className="overflow-hidden w-full h-full relative"
    initial={{ scale: 1.1 }}
    whileInView={{ scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
  >
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      quality={quality}
      className={className}
    />
  </motion.div>
);
