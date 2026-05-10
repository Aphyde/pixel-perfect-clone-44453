/**
 * Helper für konsistente Alt-Texte mit Lokalbezug.
 *
 * Beispiel:
 *   localizedAlt("Glashaus", "Pro-Line Pro-Line-System")
 *   → "Glashaus — Pro-Line Pro-Line-System | Brait Überdachungen Ulm"
 */
import { BRAND, SERVICE_AREA } from "./site";

export const localizedAlt = (
  subject: string,
  variant?: string,
  cityOverride?: string,
): string => {
  const city = cityOverride ?? SERVICE_AREA.centerCity;
  const parts = [subject];
  if (variant) parts.push(variant);
  parts.push(`${BRAND} ${city}`);
  return parts.join(" — ");
};

export const productAlt = (productName: string, categoryName: string): string =>
  localizedAlt(productName, categoryName);

export const categoryAlt = (categoryName: string): string =>
  localizedAlt(categoryName, "Aluminium-Konstruktion");
